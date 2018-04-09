const express = require(`express`);
const router = express.Router();
const nodemailer = require(`nodemailer`);
const db = require(`../models`);
const squel = require(`squel`);

/* GET Email reset logic && send email. */
router.post(`/reset`, function(req, res) {

    const emailReceived = req.body.email;

    const _token = Math.random().toString(36).slice(2);
    const chrono = Date.now() + 3600000;
    const transporter = nodemailer.createTransport({
        host: `smtp-relay.sendinblue.com`,
        port: `587`,
        secureConnection: `false`,
        auth: {
            user: `crm.udes@gmail.com`,
            pass: `VtDgs3x9qFb28Swk`
        },
        tls: {
            rejectUnauthorized: false,
            ciphers: `SSLv3`
        }
    });

    const mailOptions = {
        from: `crm.udes@gmail.com`,
        to: emailReceived,
        subject: `Récuperation de mot de passe oublié`,
        text: `Voici votre mot de passe oublié:
        https://salty-scrubland-22457.herokuapp.com/ResetPassword/${_token}
        Équipe CRM`,
    };
    db.query(
        squel.select()
            .from(`users."UTILISATEUR" AS u`)
            .where(`u.mail like ?`, emailReceived)
            .toString())
        .then(function(user) {

            if (user[0]) {

                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(`erreur du courriel   ` + error);
                    } else {
                        console.log(`Email sent: ` + info.response);
                        _updateFunction(_token, chrono);
                        res.send({
                            resetPasswordToken: _token,
                            resetPasswordExpires: Date.now() + 3600000,
                            status: `success`
                        });
                    }
                });
            }
            else {
                res.send({
                    status: `fail`,
                    message: `Le courriel est incorrect`
                });
            }
        });

    function _updateFunction(_token, chrono) {

        db.query(
            squel.update()
                .table(`users."UTILISATEUR"`)
                .set(`resetpasswordtoken`, _token)
                .set(`resetpasswordexpires`, chrono)
                .where(`mail like ?`, emailReceived)
                .toString())
            .then()
            .catch(e => {
                console.error(`query error`, e.message, e.stack);
            });
    }
});

module.exports = router;
