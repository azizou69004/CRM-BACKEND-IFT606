const express = require(`express`);
const router = express.Router();
const {hashSync, genSaltSync} = require(`bcryptjs`);
const db = require(`../models`);
const squelb = require(`squel`);
const squel = squelb.useFlavour(`postgres`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);
const expressJwtIp = require(`express-jwt-ip`);


/* GET home page. */
router.post(`/login`, expressJwtIp.ip(), function(req, res) {

    const usernameText = req.body.username;
    const mdpText = req.body.password;
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
        .where(`util.login='${usernameText}'`)
        .toString())
        .spread(function(user, userAdm) {
            const isAdmin = userAdm[0].isadmin;

            if (user[0] !== undefined && (user[0].login === usernameText)) {

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
                            ip: _ip
                        }, certKey, {expiresIn: `8h`});

                        res.send({
                            status: `success`,
                            message: {
                                cookie: token,
                                isAdmin: isAdmin
                            }
                        });
                    } else {
                        console.log(`Mot de passe saisi incorrect`);

                        res.send({
                            status: `error`,
                            message: `L'identification n'a pas pu être réalisée`
                        });
                    }
                });
            } else {
                console.log(`Le username ${usernameText} n'existe pas`);
                res.send({
                    status: `fail`,
                    message: `Le login est incorrect`
                });
            }
        });

    console.log(`end post /login`);
});

router.post(`/login/add`, (req, res) => {
    const usernameText = req.body.username;
    const mdpText = req.body.password;

    const salt = genSaltSync(10);
    const hash = hashSync(mdpText, salt);
    console.log(hash);

    db.User.findCreateFind({where: {login: usernameText}, defaults: {password: hash}})
        .spread(function(user, created) {
            console.log(user.get({
                plain: true
            }));
            console.log(created);
            if (!created) {
                res.send({
                    status: `fail`,
                    message: `Ce login n'est pas disponible`
                });
            } else {
                res.send({
                    status: `success`,
                    message: null
                });
                /*security.addDefaultRights(user.login, 2, function() {
							res.send({
							status : 'success',
							message : null
						});
						});	*/
            }
        });
});

module.exports = router;
