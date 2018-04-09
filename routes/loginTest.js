`use strict`;

const express = require(`express`);
const router = express.Router();
const db = require(`../models`);
const squelb = require(`squel`);
const squel = squelb.useFlavour(`postgres`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);
const expressJwtIp = require(`express-jwt-ip`);


const BDisFalse = false;
const createdUser = true;
/**
 * Route serving login
 * @method POST
 * @URL /login
 * @DataParamsInReqBody { username: [string], password: [string] }
 * @SuccessResponse { status: `success`, message: {cookie: [string], isAdmin: [boolean]}}
 * @ErrorResponse { status: `fail`, message: [string] }
 */
router.post(`/loginTest`, expressJwtIp.ip(), function(req, res) {
    console.log(`route post /login`);

    if (isValuesUndefined(req)) {
        res.send({
            status: `error`,
            message: `L'identification n'a pas pu être réalisée`,
        });
    }

    const usernameText = req.body.username;
    console.log(usernameText);

    const mdpText = req.body.password;
    console.log(mdpText);

    const certKey = `aplsszjknbndsj`;
    const _ip = res.locals.ip;

    db.multi(squel.select()
        .from(`users."UTILISATEUR"`)
        .field(`login`)
        .field(`password`)
        .field(`idrole`)
        .field(`iduser`)
        .where(`login like ?`, usernameText)
        .toString() + `;` + squel.select()
        .from(`users."ROLEADM"`, `adm`)
        .field(`isAdmin`)
        .field(`description`)
        .join(`users."UTILISATEUR"`, `util`, `adm.idrole = util.idrole`)
        .where(`util.login='` + usernameText + `'`)
        .toString())
        .spread(function(user, userAdm) {
            const isAdmin = userAdm[0].isadmin;

            if (user[0] !== undefined) {
                const iduser = user[0].iduser;
                const mdpRetrieved = user[0].password;
                const idroleRetrieved = user[0].idrole;

                bcrypt.compare(mdpText, mdpRetrieved, function(err, ress) {
                    // ress === true
                    if (ress) {
                        // create a token
                        const token = jwt.sign({
                            iduser: iduser,
                            idrole: idroleRetrieved,
                            ip: _ip,
                        }, certKey, {expiresIn: `8h`});

                        res.send({
                            status: `success`,
                            message: {
                                cookie: token,
                                isAdmin: isAdmin,
                            },
                        });
                    } else {
                        console.log(`Mot de passe saisi incorrect`);

                        res.send({
                            status: `error`,
                            message: `L'identification n'a pas pu être réalisée`,
                        });
                    }
                });
            } else {
                console.log(`Le username ` + usernameText + ` n'existe pas`);
                res.send({
                    status: `fail`,
                    message: `Le login est incorrect`,
                });
            }
        });

    console.log(`end post /login`);
});

/***
 *
 *
 * @param req
 * @param res
 * receive usernameText & mdpText
 * @returns
 */

router.post(`/loginTestFail`, expressJwtIp.ip(), function(req, res) {
    console.log(`route post /login`);

    if (isValuesUndefined(req)) {
        res.send({
            status: `error`,
            message: `L'identification n'a pas pu être réalisée`,
        });
    }

    const usernameText = req.body.username;
    console.log(usernameText);

    const mdpText = req.body.password;
    console.log(mdpText);

    const certKey = `aplsszjknbndsj`;
    const _ip = res.locals.ip;

    db.multi(squel.select()
        .from(`users."UTILISATEUR"`)
        .field(`login`)
        .field(`password`)
        .field(`idrole`)
        .field(`iduser`)
        .where(`login like ?`, usernameText)
        .toString() + `;` + squel.select()
        .from(`users."ROLEADM"`, `adm`)
        .field(`isAdmin`)
        .field(`description`)
        .join(`users."UTILISATEUR"`, `util`, `adm.idrole = util.idrole`)
        .where(`util.login='` + usernameText + `'`)
        .toString())
        .spread(function(user, userAdm) {
            const isAdmin = userAdm[0].isadmin;

            if (user[0] !== undefined) {
                const iduser = user[0].iduser;
                const mdpRetrieved = user[0].password;
                const idroleRetrieved = user[0].idrole;

                bcrypt.compare(mdpText, mdpRetrieved, function(err, ress) {
                    // ress === true
                    if (ress) {
                        // create a token
                        const token = jwt.sign({
                            iduser: iduser,
                            idrole: idroleRetrieved,
                            ip: _ip,
                        }, certKey, {expiresIn: `8h`});

                        res.send({
                            status: `success`,
                            message: {
                                cookie: token,
                                isAdmin: isAdmin,
                            },
                        });
                    } else {
                        console.log(`Mot de passe saisi incorrect`);

                        res.send({
                            status: `error`,
                            message: `L'identification n'a pas pu être réalisée`,
                        });
                    }
                });
            } else {
                console.log(`Le username ` + usernameText + ` n'existe pas`);
                res.send({
                    status: `fail`,
                    message: `Le login est incorrect`,
                });
            }
        });

    console.log(`end post /login`);
});

/**
 *
 *
 * @param req
 * @param res
 * MOCK response from  BD :BDisFalse
 * @returns
 */
router.post(`/loginTestFalse`, expressJwtIp.ip(), function(req, res) {
    console.log(`route post /loginFalse`);
    const usernameText = req.body.username;
    const mdpText = req.body.password;
    const certKey = `aplsszjknbndsj`;
    const _ip = res.locals.ip;
    if (BDisFalse) {
        console.log(`route post /loginFalse`);

        const iduser = user[0].iduser;
        const mdpRetrieved = user[0].password;
        const idroleRetrieved = user[0].idrole;

        bcrypt.compare(mdpText, mdpRetrieved, function(err, ress) {
            // ress === true
            if (ress) {
                // create a token
                const token = jwt.sign({
                    iduser: iduser,
                    idrole: idroleRetrieved,
                    ip: _ip,
                }, certKey, {expiresIn: `8h`});

                res.send({
                    status: `success`,
                    message: {
                        cookie: token,
                        isAdmin: isAdmin,
                    },
                });
            } else {
                console.log(`Mot de passe saisi incorrect`);

                res.send({
                    status: `error`,
                    message: `L'identification n'a pas pu être réalisée`,
                });
            }
        });
    } else {
        console.log(`Le username ` + usernameText + ` n'existe pas`);
        res.send({
            status: `fail`,
            message: `Le login est incorrect`,
        });
    }
});

/**
 * Mock DB + case user not created yet
 */
router.post(`/loginTest/add`, (req, res) => {
    const usernameText = req.body.username;
    const mdpText = req.body.password;
    if (!createdUser) {
        res.send({
            status: `fail`,
            message: `Ce login n'est pas disponible`,
        });
    } else {
        res.send({
            status: `success`,
            message: null,
        });
    }
});

/**
 * Mock DB + case user already created
 */
router.post(`/loginTest/addExist`, (req, res) => {
    console.log(`createdUser` + createdUser);
    console.log(`!createdUser` + !createdUser);

    const usernameText = req.body.username;
    const mdpText = req.body.password;

    if (createdUser) {
        res.send({
            status: `fail`,
            message: `Ce login n'est pas disponible`,
        });
    } else {
        res.send({
            status: `success`,
            message: null,
        });
    }
});

/**
 * Check if the expected values are undefined
 * @param req
 * @returns {boolean}
 */
function isValuesUndefined(req) {
    return !(!!req && !!req.body && !!req.body.username && !!req.body.password);
}

module.exports = router;
module.exports.isValuesUndefined = isValuesUndefined;
