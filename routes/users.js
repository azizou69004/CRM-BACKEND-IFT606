const express = require(`express`);
const router = express.Router();
const squelb = require(`squel`);
const squel = squelb.useFlavour(`postgres`);
const db = require(`../models/index`);
const {hashSync, genSaltSync} = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
const expressJwtIp = require(`express-jwt-ip`);

// Request retrieving principal user informations by its login
const getUserByLogin = (login) => {
    squel.select()
        .from(`users."UTILISATEUR"`)
        .where(`login like ?`, login)
        .toString();
};

//Request all the entities displayable
const getEntitiesDisplayed = () => {
    return squel.select()
        .from(`users."ENTITE"`)
        .where(`affichage = true`)
        .toString();
};

// Roles ignored by all the requests (not searched)
const ignoredRole = [`Visiteur`, `Administrateur`];

// Request retrieving all f the user information with its id
const getUserById = (id) => {
    return squel.select()
        .from(`users."UTILISATEUR"`, `util`)
        .field(`util.iduser`)
        .field(`util.mail`)
        .field(`util.login`)
        .field(`pers.nom`)
        .field(`pers.prenom`)
        .field(`tit.libelletitre`)
        .field(`op.description`, `opdesc`)
        .field(`op.level`, `oplevel`)
        .field(`ent.identite`, `ident`)
        .field(`ent.description`, `entdesc`)
        .field(`role.description`, `roledesc`)
        .left_join(`users."PERMISSIONUTIL_GLOB"`, `perm`, `perm.iduser = util.iduser`)
        .left_join(`users."OPERATION"`, `op`, `op.idoperation = perm.idoperation`)
        .left_join(`users."ROLEADM"`, `role`, `util.idrole = role.idrole`)
        .left_join(`users."ENTITE"`, `ent`, `ent.identite = perm.identite`)
        .left_join(`users."EMPLOYE_INT"`, `emp`, `emp.iduser = util.iduser`)
        .left_join(`public."PERSONNE"`, `pers`, `pers.idpersonne = emp.idpersonne`)
        .left_join(`public."TITRE"`, `tit`, `pers.idtitre = tit.idtitre`)
        .where(`util.iduser = ` + id)
        .toString();
};

const getDefaultPermissions = (whereClause) => {
    return squel.select()
        .from(`users."PERMISSIONROLE_GLOB"`, `perm`)
        .field(`op.description`, `opdesc`)
        .field(`op.level`, `oplevel`)
        .field(`ent.identite`, `ident`)
        .field(`ent.description`, `entdesc`)
        .field(`role.description`, `roledesc`)
        .join(`users."OPERATION"`, `op`, `op.idoperation = perm.idoperation`)
        .join(`users."ROLEADM"`, `role`, `perm.idrole = role.idrole`)
        .join(`users."ENTITE"`, `ent`, `ent.identite = perm.identite`)
        .where(whereClause)
        .toString();
};

// Request retrieving all of the users
const getAllUsers = () =>
    squel.select()
        .from(`users."UTILISATEUR"`, `u`)
        .left_join(`users."ROLEADM"`, `r`, `u.idrole = r.idrole`)
        .where(`r.isadmin = false`)
        .order(`iduser`)
        .toString();

// Request retrieving the id of "Mr" or "Mme"
const getIdTitre = (titre) =>
    squel.select()
        .from(`public."TITRE"`, `t`)
        .field(`t.idtitre`)
        .where(`t.libelletitre = '` + titre + `'`)
        .toString();

/**
 * Route retrieving the users list
 * @method GET
 * @URL /users/list
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: success, users: Array }
 * @ErrorResponse { status: 'fail', message: 'Erreur' }
 * **/
router.get(`/list`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /listUsers`);

    var tokenReceived = req.get(`authorization`);
    var secret = `aplsszjknbndsj`;
    // decode
    var decoded = jwt.decode(tokenReceived, secret);
    var _ipReceived = decoded.ip;
    var _ip = res.locals.ip;
    console.log(`tokenReceived   ` + tokenReceived);
    if (!!decoded && (_ip === _ipReceived)) {
        db.query(getAllUsers())
            .then(allUsers => {

                res.send({
                    status: `success`,
                    users: allUsers
                });
            })
            .catch(error => {
                console.log(`ERROR:`, error);
            });

        console.log(`end GET /listUsers`);
    } else {
        res.send({
            status: `fail`,
            message: `Erreur`
        });
    }
});

/**
 * Route retrieving a user informations with its id
 * @method GET
 * @URL /users/:id
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: success, message: { id, login, mail, name, lastname, role, userPerms } }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.get(`/user/:id`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /userById`);
    var tokenReceived = req.get(`authorization`);
    var secret = `aplsszjknbndsj`;
    // decode
    var decoded = jwt.decode(tokenReceived, secret);
    var _ipReceived = decoded.ip;
    var _ip = res.locals.ip;

    if (!!decoded && (_ip === _ipReceived)) {
        const id = req.params.id;

        db.multi(getUserById(id) + `;` + getEntitiesDisplayed())
            .spread((userRetrieved, entities) => {
                console.log(JSON.stringify(userRetrieved));
                console.log(JSON.stringify(entities));
                res.status(200);
                // We retrieve all of the permissions of a user
                var permissions = buildPermissions(userRetrieved, entities);
                var resp = {
                    id: userRetrieved[0].iduser,
                    login: userRetrieved[0].login,
                    mail: userRetrieved[0].mail,
                    name: userRetrieved[0].nom,
                    lastname: userRetrieved[0].prenom,
                    role: userRetrieved[0].roledesc,
                    titre: userRetrieved[0].libelletitre,
                    userPerms: permissions
                };

                res.send({
                    status: `success`,
                    message: resp
                });
            })
            .catch(error => {
                console.log(`ERROR:`, error);
            });
    } else {
        res.send({
            status: `fail`,
            message: `Erreur`
        });

    }
});

function findIdEntity(name, element) {
    return (element.description === name);
}

/**
 * This function associates the level to the user permissions
 * @param initpermissions
 * @param entities User from which the permissions have to be analyzed
 * @returns {Array} An array containing the level of permissions of a user on every entity
 */
function buildPermissions(initpermissions, entities) {
    const groups = {};
    entities.forEach((entity) => {
        groups[entity.description] = [];
    });

    for (let i = 0; i < initpermissions.length; i++) {
        if (initpermissions[i].entdesc) {
            const groupName = initpermissions[i].entdesc;
            groups[groupName].push(initpermissions[i]);
        }
    }
    const permissions = [];
    let level, ident, rightEntity;

    for (const groupName in groups) {
        level = 0;
        rightEntity = entities.find(findIdEntity.bind(null, groupName));
        ident = rightEntity.identite;
        groups[groupName].forEach(function(op) {
            level += op.oplevel;
        });
        permissions.push({id: ident, group: groupName, level: level});
    }
    console.log(permissions);
    return permissions;
}

router.post(`/create`, expressJwtIp.ip(), function(req, res) {

    const tokenReceived = req.get(`authorization`);
    const secret = `aplsszjknbndsj`;
    // decode
    const decoded = jwt.decode(tokenReceived, secret);
    const _ipReceived = decoded.ip;
    const _ip = res.locals.ip;

    if (!!decoded && (_ip === _ipReceived)) {
        /*security.checkRights(1, "Gestion des utilisateurs", 7)
    .then(() => {*/
        var user = {
            role: req.body.role,
            nom: req.body.nom,
            prenom: req.body.prenom,
            login: req.body.login,
            mdpProv: req.body.mdpProv,
            mail: req.body.mail,
            permissionsUser: req.body.userPerms,
            titre: req.body.titre
        };

        var geExistingUser = squel.select()
            .from(`users."UTILISATEUR"`)
            .where(`login ='` + user.login + `'`);

        var getIdRole = squel.select()
            .from(`users."ROLEADM"`)
            .where(`description ='` + user.role + `'`);

        var getOp = squel.select()
            .from(`users."OPERATION"`)
            .order(`level`);

        var getEntities = squel.select()
            .from(`users."ENTITE"`);

        db.any(geExistingUser.toString())
            .then(existUser => {
                if (existUser.length === 0) {
                    db.multi(getIdRole.toString() + `;` + getOp.toString() + `;` + getEntities.toString())
                        .then(data => {
                            if (data[0][0].isadmin === false) {
                                var idRole = data[0][0].idrole;
                                const rights = data[1];
                                var newRights = [];
                                var newRight;
                                var mdpText = user.mdpProv;

                                const salt = genSaltSync(10);
                                const hash = hashSync(mdpText, salt);

                                var addUser = squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
                                    .into(`users."UTILISATEUR"`)
                                    .set(`login`, user.login)
                                    .set(`password`, hash)
                                    .set(`mail`, user.mail)
                                    .set(`idrole`, idRole)
                                    .returning(`*`);

                                db.tx(function(t) {
                                    return t.one(addUser.toString())
                                        .then(userCreated => {
                                            user.permissionsUser.forEach(function(element) {
                                                var entityObject = data[2].find(findEnt.bind(null, element.group));
                                                rights.forEach(function(right) {
                                                    if (element.level >= right.level) {
                                                        newRight = {
                                                            iduser: userCreated.iduser,
                                                            identite: entityObject.identite,
                                                            idoperation: right.idoperation
                                                        };
                                                        newRights.push(newRight);
                                                    }
                                                });
                                            });

                                            if (newRights.length !== 0) {
                                                var addRights = squel.insert({
                                                    replaceSingleQuotes: true,
                                                    singleQuoteReplacement: `''`
                                                })
                                                    .into(`users."PERMISSIONUTIL_GLOB"`)
                                                    .setFieldsRows(newRights)
                                                    .returning(`*`)
                                                    .toParam();
                                                return t.any(addRights)
                                                    .then(() => {
                                                        return createEmployee(user, userCreated, t, res);
                                                    });
                                            } else {
                                                return createEmployee(user, userCreated, t, res);
                                            }
                                        });
                                })
                                    .then(() => {
                                        res.status(200);
                                        res.send({
                                            status: `success`,
                                            message: null
                                        });
                                    })
                                    .catch(error => {
                                        res.send({
                                            status: `fail`,
                                            message: error.toString()
                                        });
                                    });
                            } else {
                                res.send({
                                    status: `fail`,
                                    message: `Il n'est pas possible de créer un administrateur`
                                });
                            }
                        })
                        .catch(function(err) {
                            console.log(err);
                        });

                } else {
                    res.send({
                        status: `fail`,
                        message: `Ce login n'est pas disponible`
                    });
                }
            })
            .catch(error => {
                console.log(`ERROR:`, error); // print error;
            });

        console.log(`end post /createUser`);
        /* })
    .catch(error => {
	    	res.send({
				status : 'fail',
				message : 'Les droits accordés à l\'utilisateur ne sont pas suffisants'
		});
    });*/
    }
    else {
        res.send({
            status: `fail`,
            message: `Il n'est pas possible de créer cet utilisateur`
        });
    }
});

function findEnt(desc, ent) {
    return ent.description === desc;
}

router.post(`/update`, expressJwtIp.ip(), function(req, res) {


    var tokenReceived = req.get(`authorization`);
    var secret = `aplsszjknbndsj`;
    // decode
    var decoded = jwt.decode(tokenReceived, secret);
    var _ipReceived = decoded.ip;
    var _ip = res.locals.ip;
    console.log(`tokenReceived   ` + tokenReceived);
    if (!!decoded && (_ip === _ipReceived)) {
        /*security.checkRights(1, "Gestion des utilisateurs", 3)
    .then(() => {*/
        var user = {
            id: req.body.id,
            role: req.body.role,
            nom: req.body.nom,
            prenom: req.body.prenom,
            mail: req.body.mail,
            permissionsUser: req.body.userPerms,
            titre: req.body.titre
        };

        console.log(user);

        var getFirstRole = squel.select()
            .from(`users."UTILISATEUR"`, `u`)
            .left_join(`users."ROLEADM"`, `r`, `u.idrole = r.idrole`)
            .where(`u.iduser =` + user.id)
            .toString();

        var getIdRole = squel.select()
            .from(`users."ROLEADM"`)
            .where(`description ='` + user.role + `'`);

        var getOp = squel.select()
            .from(`users."OPERATION"`)
            .order(`level`);

        var getEntities = squel.select()
            .from(`users."ENTITE"`);

        db.multi(getIdRole.toString() + `;` + getOp.toString() + `;` + getEntities.toString() + `;` + getFirstRole.toString())
            .then(data => {
                if ((data[0][0].isadmin === false) && (data[3][0].isadmin === false)) {
                    var idRole = data[0][0].idrole;
                    const rights = data[1];
                    var newRights = [];
                    var newRight;

                    var updateUser = squel.update()
                        .table(`users."UTILISATEUR"`)
                        .set(`mail`, user.mail)
                        .set(`idrole`, idRole)
                        .where(`iduser = ` + user.id)
                        .returning(`*`);

                    db.tx(function(t) {
                        return t.one(updateUser.toString())
                            .then(userUpdated => {
                                user.permissionsUser.forEach(function(element) {
                                    var entityObject = data[2].find(findEnt.bind(null, element.group));
                                    rights.forEach(function(right) {
                                        if (element.level >= right.level) {
                                            newRight = {
                                                iduser: userUpdated.iduser,
                                                identite: entityObject.identite,
                                                idoperation: right.idoperation
                                            };
                                            newRights.push(newRight);
                                        }
                                    });
                                });
                                var deleteRights = squel.delete()
                                    .from(`users."PERMISSIONUTIL_GLOB"`)
                                    .where(`iduser = ` + user.id);

                                var addRights = squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
                                    .into(`users."PERMISSIONUTIL_GLOB"`)
                                    .setFieldsRows(newRights)
                                    .returning(`*`)
                                    .toParam();

                                return t.none(deleteRights.toString())
                                    .then(() => {
                                        if (newRights.length !== 0) {
                                            return t.any(addRights)
                                                .then(() => {
                                                    return updateEmployee(user, t, res);
                                                });
                                        } else {
                                            return updateEmployee(user, t, res);
                                        }
                                    });

                            });
                    })
                        .then(() => {
                            res.status(200);
                            res.send({
                                status: `success`,
                                message: null
                            });
                        })
                        .catch(error => {
                            res.send({
                                status: `fail`,
                                message: error.toString()
                            });
                        });
                } else {
                    res.send({
                        status: `fail`,
                        message: `Il n'est pas possible de définir un nouvel administrateur`
                    });
                }
            })
            .catch(function(err) {
                console.log(err);
            });

        console.log(`end post /createUser`);
        /* })
    .catch(error => {
	    	res.send({
				status : 'fail',
				message : 'Les droits accordés à l\'utilisateur ne sont pas suffisants'
		});
    });*/
    }
    else {
        res.send({
            status: `fail`,
            message: `Il n'est pas possible de modifier cet utilisateur`
        });

    }
});

router.get(`/operations`, expressJwtIp.ip(), function(req, res) {
    console.log(`GET /getOperation`);

    var tokenReceived = req.get(`authorization`);
    console.log(`tokenReceived  ` + tokenReceived);

    var secret = `aplsszjknbndsj`;
    // decode
    var decoded = jwt.decode(tokenReceived, secret);
    var _ipReceived = decoded.ip;
    var _ip = res.locals.ip;

    if (!!decoded && (_ip === _ipReceived)) {
        const operationRequest = squel.select()
            .from(`users."OPERATION"`)
            .order(`level`)
            .toString();

        const defaultOperations = [{id: 0, label: `Aucun droit n'est accordé`, value: 0}];
        let id = 0;
        const label = [];
        let labelString;
        let value = 0;
        db.any(operationRequest)
            .then(operations => {
                operations.forEach(function(element) {
                    id++;
                    value += element.level;
                    label.push(element.description);
                    labelString = label.join(` + `);
                    defaultOperations.push({id: id, label: labelString, value: value});
                });
                res.status(200);
                res.send({
                    status: `success`,
                    message: defaultOperations
                });
            })
            .catch(error => {
                console.log(`ERROR:`, error);
            });
    }
    else {
        res.send({
            status: `fail`,
            message: `Erreur`
        });

    }
});

router.get(`/defaultPerms`, expressJwtIp.ip(), function(req, res) {
    console.log(`GET /getDefaultPerms`);
    const tokenReceived = req.get(`authorization`);
    console.log(`tokenReceived  ` + tokenReceived);

    const secret = `aplsszjknbndsj`;
    // decode
    const decoded = jwt.decode(tokenReceived, secret);
    const _ipReceived = decoded.ip;
    const _ip = res.locals.ip;

    if (!!decoded && (_ip === _ipReceived)) {
        const whereClauses = [];
        ignoredRole.forEach(function(element) {
            whereClauses.push(`role.description <> '${element}'`);
        });

        const whereClause = whereClauses.join(` AND `);
        db.multi(getDefaultPermissions(whereClause) + `;` + getEntitiesDisplayed())
            .spread((roleRetrieved, entities) => {

                const roles = {};
                for (let i = 0; i < roleRetrieved.length; i++) {
                    const roleName = roleRetrieved[i].roledesc;
                    if (!roles[roleName]) {
                        roles[roleName] = [];
                    }
                    roles[roleName].push(roleRetrieved[i]);
                }
                const defaultPermissions = [];
                let permissions = {};
                for (const roleName in roles) {
                    permissions = buildPermissions(roles[roleName], entities);
                    defaultPermissions.push({role: roleName, droits: permissions});
                }

                res.status(200);
                res.send({
                    status: `success`,
                    message: defaultPermissions
                });
            })
            .catch(error => {
                console.log(`ERROR:`, error);
            });
    }
    else {
        res.send({
            status: `fail`,
            message: `Erreur`
        });
    }
});

router.delete(`/user/:id`, expressJwtIp.ip(), function(req, res) {


    const tokenReceived = req.get(`authorization`);

    const secret = `aplsszjknbndsj`;
    // decode
    const decoded = jwt.decode(tokenReceived, secret);
    const _ipReceived = decoded.ip;
    const _ip = res.locals.ip;
    console.log(`tokenReceived   ` + tokenReceived);


    if (!!decoded && (_ip === _ipReceived)) {

        console.log(`DELETE /user/:id`);
        const id = req.params.id;
        console.log(`id: `, id);

        var deleteRights = squel.delete()
            .from(`users."PERMISSIONUTIL_GLOB"`)
            .where(`iduser = ` + id);

        var getUser = squel.select()
            .from(`users."UTILISATEUR"`, `util`)
            .join(`users."ROLEADM"`, `adm`, `util.idrole = adm.idrole`)
            .where(`iduser = ` + id);

        var deleteUser = squel.delete()
            .from(`users."UTILISATEUR"`)
            .where(`iduser = ` + id);

        var updatePersonne = squel.update()
            .table(`users."EMPLOYE_INT"`)
            .set(`iduser`, null)
            .where(`iduser = ` + id);

        db.any(getUser.toString())
            .then(userRetrieved => {
                if (userRetrieved.length === 0) {
                    res.send({
                        status: `fail`,
                        message: `L'utilisateur que vous voulez supprimer n'est pas enregistré`
                    });
                } else if (userRetrieved[0].isadmin === true) {
                    res.send({
                        status: `fail`,
                        message: `Vous ne pouvez pas supprimer un administrateur`
                    });
                } else {
                    db.tx(function(t1) {
                        return this.batch([
                            t1.none(updatePersonne.toString()),
                            t1.none(deleteRights.toString()),
                            t1.tx(t2 => {
                                return t2.none(deleteUser.toString())
                                    .then(() => {
                                    });
                            })
                        ]);
                    })
                        .then(data => {
                            res.status(200);
                            res.send({
                                status: `success`,
                                message: null
                            });
                        })
                        .catch(error => {
                            res.send({
                                status: `fail`,
                                message: error.toString()
                            });
                        });
                }
            });
    } else {
        res.send({
            status: `fail`,
            message: `Il n'est pas possible de supprimer cet utilisateur`
        });
    }
});

router.get(`/getRoles`, expressJwtIp.ip(), function(req, res) {

    console.log(`Getting roles from database`);
    var tokenReceived = req.get(`authorization`);
    var secret = `aplsszjknbndsj`;
    // decode
    var decoded = jwt.decode(tokenReceived, secret);
    var _ipReceived = decoded.ip;
    var _ip = res.locals.ip;
    console.log(`tokenReceived   ` + tokenReceived);
    if (!!decoded && (_ip === _ipReceived)) {
        const whereClauses = [];
        ignoredRole.forEach(function(element) {
            whereClauses.push(`description <> '${element}'`);
        });
        const whereClause = whereClauses.join(` AND `);
        db.query(squel.select()
            .from(`users."ROLEADM"`)
            .field(`description`)
            .where(whereClause)
            .toString())
            .then(roles => {

                res.send({
                    status: `success`,
                    roles: roles
                });
            })
            .catch(e => {
                console.error(`query error`, e.message, e.stack);
            });
        console.log(`end get /getRoles`);
    }
    else {
        res.send({
            status: `fail`,
            message: `Erreur`
        });

    }
});

function createEmployee(userInformations, userCreated, t) {
    return t.one(getIdTitre(userInformations.titre))
        .then(titre => {
            var addPersonne = squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
                .into(`public."PERSONNE"`)
                .set(`nom`, userInformations.nom)
                .set(`prenom`, userInformations.prenom)
                .set(`idtitre`, titre.idtitre)
                .returning(`*`);

            return t.one(addPersonne.toString())
                .then(personCreated => {
                    var addEmployee = squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
                        .into(`users."EMPLOYE_INT"`)
                        .set(`iduser`, userCreated.iduser)
                        .set(`idpersonne`, personCreated.idpersonne)
                        .returning(`*`);

                    return t.one(addEmployee.toString())
                        .then(employeeCreated => {
                        });
                });
        });

}

function updateEmployee(userInformations, t) {

    return t.one(getIdTitre(userInformations.titre))
        .then(titre => {
            var getPersonne = squel.select()
                .from(`public."PERSONNE"`, `pers`)
                .join(`users."EMPLOYE_INT"`, `emp`, `pers.idpersonne = emp.idpersonne`)
                .join(`users."UTILISATEUR"`, `util`, `util.iduser = emp.iduser`)
                .where(`util.iduser = ` + userInformations.id);

            return t.one(getPersonne.toString())
                .then(personExisting => {
                    var updatePersonne = squel.update()
                        .table(`public."PERSONNE"`)
                        .set(`nom`, userInformations.nom)
                        .set(`prenom`, userInformations.prenom)
                        .set(`idtitre`, titre.idtitre)
                        .where(`idpersonne = ` + personExisting.idpersonne)
                        .returning(`*`);
                    return t.one(updatePersonne.toString())
                        .then(personUpdated => {
                        });
                });
        });
}

module.exports = router;
