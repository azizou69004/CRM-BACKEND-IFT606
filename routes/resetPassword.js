'use strict';

const {hashSync, genSaltSync} = require(`bcryptjs`);
const express = require(`express`);
const router = express.Router();
const db = require(`../models`);
const squelb = require(`squel`);
const squel = squelb.useFlavour(`postgres`);

/**
 * Route serving password reset
 * @method POST
 * @URL /ResetPassword
 * @DataParamsInReqBody { newPassword: [string], confirmPassword: [string], token: [string] }
 * @SuccessResponse { status: 'success', message: [string]}
 * @ErrorResponse { status: 'fail', message: [string] }
 * **/
router.post(`/ResetPassword`, async function(req, res) {

    // Check all the params are NOT undefined
    if (isValuesUndefined(req)) {
        sendResponse(`DEBUG|resetPassword|atLeastOneParamIsUndefined`, res, `fail`);
        return;
    }

    const resetToken = req.body.resetToken;

    // Check if the token is NOT valid
    if (await isTokenInvalid(resetToken)) {
        sendResponse(`Le lien de réinitialisation est expiré
        Merci de retourner a l'accueil`, res, `fail`);
        return;
    }

    // Make the password into a encoded uft8 string
    const pwdText = req.body.newPassword;
    const pwdTextConf = req.body.confirmPassword;

    // Check if the password match
    if (pwdText !== pwdTextConf) {
        sendResponse(`DEBUG|resetPassword|passwordDoesn'tMatches`, res, `fail`);
        return;
    }

    // Hash and salt the new password
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(pwdText, salt);

    // Save the new password on the database
    saveNewPassword(hashedPassword, resetToken);

    // TODO: Should probably check if the db fail

    // Success, the password as been updated
    sendResponse(`DEBUG|resetPassword|passwordSuccessfullyReset`, res, `success`);
});

/**
 * Check if the expected values are undefined
 * @param req
 * @returns {boolean}
 */
function isValuesUndefined(req) {
    return !(!!req.body.newPassword && !!req.body.confirmPassword && !!req.body.resetToken);
}

/**
 * Check if the token is invalid
 * @param resetToken
 * @returns {Promise.<boolean>}
 */
async function isTokenInvalid(resetToken) {
    return db.query(squel.select()
        .from(`users."UTILISATEUR"`)
        .field(`resetpasswordexpires`)
        .where(`resetpasswordtoken = '${resetToken}'`)
        .toString())
        .then((user) => {
            // Check if a user as been found, a token exist and is not expired
            return !(user.length > 0 && !!user[0].resetpasswordexpires && user[0].resetpasswordexpires > (new Date).getTime());
        });
}

/**
 * Save the new password on the Database
 * @param hashedPassword
 * @param resetToken
 */
function saveNewPassword(hashedPassword, resetToken) {
    db.multi(squel.select()
        .from(`users."UTILISATEUR"`)
        .field(`resetpasswordexpires`)
        .where(`resetpasswordtoken = '${resetToken}'`)
        .toString())
        .spread((user) => {
            const _userTime = user[0].resetpasswordexpires;
            const _currentTime = Date.now();
            if (_currentTime < _userTime) {
                db.one(squel.update()
                    .table(`users."UTILISATEUR"`)
                    .set(`password`, hashedPassword)
                    .where(`resetpasswordtoken = '${resetToken}'`)
                    .set(`resetpasswordtoken`, null)
                    .set(`resetpasswordexpires`, null)
                    .returning(`*`)
                    .toString());
            }
        });
}

/**
 * Send a response to the POST
 * @param message
 * @param response
 * @param status
 */
function sendResponse(message, response, status) {
    response.send({
        status: status,
        message: message
    });
}

module.exports = router;
