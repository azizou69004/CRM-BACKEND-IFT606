`use strict`;

const {hashSync, genSaltSync} = require(`bcryptjs`);
const express = require(`express`);
const router = express.Router();

/**
 * Route serving password reset for testing purpose
 * @method POST
 * @URL /ResetPasswordTest
 * @DataParamsInReqBody { newPassword: [string], confirmPassword: [string], token: [string] }
 * @SuccessResponse { status: 'success', message: [string]}
 * @ErrorResponse { status: 'fail', message: [string] }
 * **/
router.post(`/ResetPasswordTest`, async function(req, res) {

    // Check all the params are NOT undefined
    if (isValuesUndefined(req)) {
        res.send({
            status: `fail`,
            message: `DEBUG|resetPassword|atLeastOneParamIsUndefined`
        });
        return;
    }

    // Check if the token is NOT valid
    if (await isTokenInvalid(req.body.resetToken)) {
        res.send({
            status: `fail`,
            message: `DEBUG|resetPassword|tokenIsInvalid`
        });
        return;
    }

    // Check if the password match
    if (isPasswordNotMatching(req.body.newPassword, req.body.confirmPassword)) {
        res.send({
            status: `fail`,
            message: `DEBUG|resetPassword|passwordDoesn'tMatches`
        });
        return;
    }

    // Hash and salt the new password
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(req.body.newPassword, salt);

    // Save the new password on the database
    if (await saveNewPassword(hashedPassword, req.body.resetToken)) {
        // Success, the password as been updated
        res.send({
            status: `success`,
            message: `DEBUG|resetPassword|passwordSuccessfullyReset`
        });
    } else {
        res.send({
            status: `fail`,
            message: `DEBUG|resetPassword|passwordFailedReset`
        });
    }
});

/**
 * Check if the expected values are undefined
 * @param req
 * @DataParamsInReqBody { body: { newPassword: [string], confirmPassword: [string], token: [string] }}
 * @returns {boolean}
 */
function isValuesUndefined(req) {
    return !(!!req && !!req.body && !!req.body.newPassword && !!req.body.confirmPassword && !!req.body.resetToken);
}

/**
 * Check if the token is invalid
 * @param resetToken
 * @returns {Promise.<boolean>}
 */
async function isTokenInvalid(resetToken) {
    return (new Promise((fulfill) => {
        if (resetToken === `this_is_a_good_token` || resetToken === `this_update_will_fail`) {
            fulfill(false);
        } else {
            fulfill(true);
        }
    })).then((res) => {
        return res;
    });
}

/**
 * Check if the passwords are matching
 * @param newPassword
 * @param confirmPassword
 * @returns {boolean}
 */
function isPasswordNotMatching(newPassword, confirmPassword) {
    return !(newPassword === confirmPassword);
}

/**
 * Save the new password on the Database
 * @param hashedPassword
 * @param resetToken
 * @returns {Promise.<boolean>}
 */
async function saveNewPassword(hashedPassword, resetToken) {
    return (new Promise((fulfill) => {
        if (resetToken !== `this_update_will_fail`) {
            fulfill(true);
        } else {
            fulfill(false);
        }
    })).then((res) => {
        return res;
    });
}

module.exports = router;
module.exports.isValuesUndefined = isValuesUndefined;
module.exports.isTokenInvalid = async (resetToken) => {
    return await isTokenInvalid(resetToken);
};
module.exports.isPasswordNotMatching = isPasswordNotMatching;
module.exports.saveNewPassword = async (hashedPassword, resetToken) => {
    return await saveNewPassword(hashedPassword, resetToken);
};
