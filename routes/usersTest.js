const express = require(`express`);
const router = express.Router();
const squelb = require(`squel`);
const squel = squelb.useFlavour(`postgres`);
const db = require(`../models/index`);
const {hashSync, genSaltSync} = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
const expressJwtIp = require(`express-jwt-ip`);


//MOCK VALUES

const BDUpdatedUser = true;
const BDNotUpdatedUser = false;
const operationOK = true;
const requestBdDelete = true;
const mockToken = true;
const mockTokenFalse = false;
const BDrole = true;
//Request retrieving principal user informations by its login
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

//Roles ignored by all the requests (not searched)
const ignoredRole = [`Visiteur`, `Administrateur`];

//Request retrieving all f the user information with its id
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

/**
 *
 * MOCK for true & valid TOKEN
 * @returns {boolean}
 */
function verifyJWT(req, res) {
    const secret = `aplsszjknbndsj`;
    if (!(!!req && !!res)) {
        return false;
    }

    const tokenReceived = req.get(`authorization`);
    console.log(`tokenReceived ` + tokenReceived);
    if (!tokenReceived) {
        return false;
    }

    const decoded = jwt.decode(tokenReceived, secret);
    const _ipReceived = decoded.ip;
    const _ip = res.locals.ip;
    console.log(`!!decoded && (_ip === _ipReceived) ` + !!decoded && (_ip === _ipReceived));

    return !!decoded && (_ip === _ipReceived);

}

//Request retrieving all of the users
var getAllUsers = true;

//Request retrieving the id of "Mr" or "Mme"
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

    if (verifyJWT(req, res)) {
        if (getAllUsers) {
            res.send({
                status: `success`,
                users: allUsers,
            });
        }
    } else {
        console.log(`end GET /listUsers`);
        res.send({
            status: `fail`,
            message: `Erreur`,
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
    //	var tokenReceived = req.get("authorization");
    //	var secret = 'aplsszjknbndsj';
    //	// decode
    //	var decoded = jwt.decode(tokenReceived, secret);
    //	var _ipReceived = decoded.ip;
    //	var _ip = res.locals.ip;

    if (verifyJWT(req, res)) {
        const id = req.params.id;

        db.multi(getUserById(id) + `;` + getEntitiesDisplayed())
            .spread((userRetrieved, entities) => {
                console.log(JSON.stringify(userRetrieved));
                console.log(JSON.stringify(entities));
                res.status(200);
                // We retrieve all of the permissions of a user
                const permissions = buildPermissions(userRetrieved, entities);
                const resp = {
                    id: userRetrieved[0].iduser,
                    login: userRetrieved[0].login,
                    mail: userRetrieved[0].mail,
                    name: userRetrieved[0].nom,
                    lastname: userRetrieved[0].prenom,
                    role: userRetrieved[0].roledesc,
                    titre: userRetrieved[0].libelletitre,
                    userPerms: permissions,
                };

                res.send({
                    status: `success`,
                    message: resp,
                });
            })
            .catch((error) => {
                console.log(`ERROR:`, error);
            });
    } else {
        res.send({
            status: `fail`,
            message: `Erreur`,
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

router.post(`/createTrue`, expressJwtIp.ip(), function(req, res) {

    if (mockToken) {

        //MOCK BD
        res.json({status: `success`});

    } else {
        res.json({status: `fail`});

    }
});
router.post(`/createFalse`, expressJwtIp.ip(), function(req, res) {

    if (!mockToken) {

        //MOCK BD
        res.json({status: `success`});

    } else {
        res.json({status: `fail`});

    }
});

function findEnt(desc, ent) {
    return ent.description === desc;
}

//update avec BD true
router.post(`/updateTrue`, expressJwtIp.ip(), function(req, res) {
    if (mockToken) {
        if (BDUpdatedUser) {
            res.status(200);
            res.json({
                status: `success`,
                message: null,
            });
        }
    } else {
        res.json({
            status: `fail`,
            message: `Il n'est pas possible de définir un nouvel administrateur`,
        });
    }
});

//update avec BD true
router.post(`/updateFalse`, expressJwtIp.ip(), function(req, res) {
    if (mockToken) {
        if (BDNotUpdatedUser) {
            res.json({
                status: `success`,
                message: null,
            });
        }
        else {
            res.json({
                status: `fail`,
                message: `Il n'est pas possible de définir un nouvel administrateur`,
            });
        }
    } else {
        res.json({
            status: `fail`,
            message: `Il n'est pas possible de définir un nouvel administrateur`,
        });
    }
});

//update avec BD true
router.post(`/update`, expressJwtIp.ip(), function(req, res) {
    if (mockToken) {
        if (!BDUpdatedUser) {
            res.status(200);
            res.send({
                status: `success`,
            });
        } else {
            res.send({
                status: `fail`,
            });
        }
    } else {
        res.send({
            status: `fail`,
        });
    }
});

///with valid token
router.get(`/operationsValid`, expressJwtIp.ip(), function(req, res) {
    console.log(`GET /operationsValid`);

    if (operationOK) {
        res.send({
            status: `success`,
        });

    } else {
        res.send({
            status: `fail`,
            message: `Erreur`,
        });
    }
});

///with non valid token
router.get(`/operationsNonValid`, expressJwtIp.ip(), function(req, res) {
    console.log(`GET /getOperation`);

    if (!mockToken) {
        if (operationOK) {
            res.status(200);
            res.send({
                status: `success`,
                message: defaultOperations,
            });
        }

    } else {
        res.send({
            status: `fail`,
            message: `Erreur`,
        });
    }
});

router.get(`/defaultPerms`, expressJwtIp.ip(), function(req, res) {
    console.log(`GET /getDefaultPerms`);

    if (!mockToken) {

        res.status(200);

        res.json({
            status: `success`,
        });
    }
    else {
        console.log(`GET PAS /getDefaultPerms2`);

        res.json({
            status: `fail`,
            message: `Erreur`,
        });
    }
});


router.get(`/defaultPermsTrue`, expressJwtIp.ip(), function(req, res) {
    if (mockToken) {
        res.status(200);
        res.json({
            status: `success`,
        });
    }
    else {
        res.json({
            status: `fail`,
            message: `Erreur`,
        });
    }
});

router.delete(`/user/:id`, expressJwtIp.ip(), function(req, res) {
    if (mockToken) {
        if (requestBdDelete) {
            res.send({
                status: `success`,
            });
        }
        else {
            res.send({
                status: `fail`,
            });
        }

    } else {
        res.send({
            status: `fail`,
        });
    }
});


router.get(`/user/:idF`, expressJwtIp.ip(), function(req, res) {
    console.log(`LOLILOLLLLLL    ` + mockTokenFalse);
    if (mockTokenFalse) {
        if (!requestBdDelete) {
            res.json({
                status: `success`,
            });
        }
        else {
            res.json({
                status: `fail`,
            });
        }

    } else {
        res.json({
            status: `fail`,
        });
    }
});

router.get(`/getRoles`, expressJwtIp.ip(), function(req, res) {

    if (mockToken) {
        if (BDrole) {
            res.json({
                status: `success`,
            });
        }
        else {
            res.json({
                status: `fail`,
            });
        }
    }
    else {
        res.json({
            status: `fail`,
            message: `Erreur`,
        });
    }
});

router.get(`/getRolesF`, expressJwtIp.ip(), function(req, res) {
    console.log(`Getting roles from database`);

    if (verifyJWT(req, res)) {
        const whereClauses = [];
        ignoredRole.forEach(function(element) {
            whereClauses.push(`description <> '` + element + `'`);
        });
        const whereClause = whereClauses.join(` AND `);
        db.query(squel.select()
            .from(`users."ROLEADM"`)
            .field(`description`)
            .where(whereClause)
            .toString())
            .then((roles) => {
                res.send({
                    status: `success`,
                    roles: roles,
                });
            })
            .catch((e) => {
                console.error(`query error`, e.message, e.stack);
            });
        console.log(`end get /getRoles`);
    } else {
        res.send({
            status: `fail`,
            message: `Erreur`,
        });
    }
});


module.exports = router;
