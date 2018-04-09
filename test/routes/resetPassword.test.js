process.env.muteLog = true;
const resetPassword = require(`../../routes/resetPasswordTest`),
    request = require(`supertest`),
    app = require(`../../app`),
    api = request(app),
    assert = require(`assert`);
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVzZXIiOjEsImlkcm9sZSI6MSwiaXAiOiIxODQuMTYzLjEzMy4yMyIsImlhdCI6MTUxMjA5NTAwMywiZXhwIjoxNTEyMTIzODAzfQ.FRtSKq92iMqgo9CIQ-trBJCtx4o1C11iI37fksb13mc`;

/**
 * Unit test
 */
describe(`ResetPassword function isValuesUndefined(req)`, () => {

    it(`respond false with an undefined req`, () => {
        const req = undefined;
        assert(resetPassword.isValuesUndefined(req));
    });

    it(`respond false with an undefined req.body`, () => {
        const req = {body: undefined};
        assert(resetPassword.isValuesUndefined(req));
    });

    it(`respond false with all three variable undefined`, () => {
        const req = {body: {newPassword: undefined, confirmPassword: undefined, resetToken: undefined}};
        assert(resetPassword.isValuesUndefined(req));
    });

    it(`respond false with first two variable undefined`, () => {
        const req = {body: {newPassword: undefined, confirmPassword: undefined, resetToken: ``}};
        assert(resetPassword.isValuesUndefined(req));
    });

    it(`respond false with first and third variable undefined`, () => {
        const req = {body: {newPassword: undefined, confirmPassword: ``, resetToken: undefined}};
        assert(resetPassword.isValuesUndefined(req));
    });

    it(`respond false with second and third variable undefined`, () => {
        const req = {body: {newPassword: ``, confirmPassword: undefined, resetToken: undefined}};
        assert(resetPassword.isValuesUndefined(req));
    });

    it(`respond false with first variable undefined`, () => {
        const req = {body: {newPassword: undefined, confirmPassword: ``, resetToken: ``}};
        assert(resetPassword.isValuesUndefined(req));
    });

    it(`respond false with third variable undefined`, () => {
        const req = {body: {newPassword: ``, confirmPassword: ``, resetToken: undefined}};
        assert(resetPassword.isValuesUndefined(req));
    });

    it(`respond false with second variable undefined`, () => {
        const req = {body: {newPassword: ``, confirmPassword: undefined, resetToken: ``}};
        assert(resetPassword.isValuesUndefined(req));
    });

    it(`respond true with all variables defined`, () => {
        const req = {
            body: {
                newPassword: `not_undefined`,
                confirmPassword: `not_undefined`,
                resetToken: `not_undefined`
            }
        };
        assert(!resetPassword.isValuesUndefined(req));
    });
});

describe(`ResetPassword function isTokenInvalid(resetToken)`, () => {

    // Did not test undefined resetToken since isValuesUndefined already capture that

    it(`respond false with a wrong resetToken`, () => {
        const resetToken = `this_is_a_wrong_token`;
        return resetPassword.isTokenInvalid(resetToken).then((res) => {
            assert(res);
        });
    });

    it(`respond true with a good resetToken`, () => {
        const resetToken = `this_is_a_good_token`;
        return resetPassword.isTokenInvalid(resetToken).then((res) => {
            assert(!res);
        });
    });
});

describe(`ResetPassword function isPasswordMatching(newPassword, confirmPassword)`, () => {

    // Did not test undefined newPassword & confirmPassword since isValuesUndefined already capture that

    it(`respond false with wrong passwords`, () => {
        const newPassword = `this_is_a_wrong_password`;
        const confirmPassword = `this_is_a_good_password`;
        assert(resetPassword.isPasswordNotMatching(newPassword, confirmPassword));
    });

    it(`respond true with good passwords`, () => {
        const newPassword = `this_is_a_good_password`;
        const confirmPassword = `this_is_a_good_password`;
        assert(!resetPassword.isPasswordNotMatching(newPassword, confirmPassword));
    });
});

describe(`ResetPassword function saveNewPassword(hashedPassword, resetToken)`, () => {

    // Did not test undefined hashedPassword & resetToken since isValuesUndefined already capture that

    it(`respond false if update fail`, () => {
        const hashedPassword = `this_is_a_good_password`;
        const resetToken = `this_update_will_fail`;
        return resetPassword.saveNewPassword(hashedPassword, resetToken).then((res) => {
            assert(!res);
        });
    });

    it(`respond true if update happen`, () => {
        const hashedPassword = `this_is_a_good_password`;
        const resetToken = `this_is_a_good_token`;
        return resetPassword.saveNewPassword(hashedPassword, resetToken).then((res) => {
            assert(res);
        });
    });
});


/**
 * Functional test
 */
describe(`POST /ResetPasswordTest`, () => {

    // Not gonna test all the possible value, since the unit should test them
    // These test will only test all branch once

    it(`respond 'fail' with one variable undefined`, function() {
        return api
            .post(`/ResetPasswordTest`)
            .set(`Accept`, `application/json`)
            .send({
                newPassword: undefined,
                confirmPassword: `this_is_a_good_password`,
                resetToken: `this_is_a_good_token`
            })
            .expect(200).then(res => {
                assert.deepEqual(res.body.status, `fail`);
            });
    });

    it(`respond 'fail' with a wrong resetToken`, function() {
        return api
            .post(`/ResetPasswordTest`)
            .set(`Accept`, `application/json`)
            .send({
                newPassword: `this_is_a_good_password`,
                confirmPassword: `this_is_a_good_password`,
                resetToken: `this_is_a_wrong_token`
            })
            .expect(200).then(res => {
                assert.deepEqual(res.body.status, `fail`);
            });
    });

    it(`respond 'fail' with wrong passwords`, function() {
        return api
            .post(`/ResetPasswordTest`)
            .set(`Accept`, `application/json`)
            .send({
                newPassword: `this_is_a_wrong_password`,
                confirmPassword: `this_is_a_good_password`,
                resetToken: `this_is_a_good_token`
            })
            .expect(200).then(res => {
                assert.deepEqual(res.body.status, `fail`);
            });
    });

    it(`respond 'fail' with an update error`, function() {
        return api
            .post(`/ResetPasswordTest`)
            .set(`Accept`, `application/json`)
            .send({
                newPassword: `this_is_a_good_password`,
                confirmPassword: `this_is_a_good_password`,
                resetToken: `this_update_will_fail`
            })
            .expect(200).then(res => {
                assert.deepEqual(res.body.status, `fail`);
            });
    });

    it(`respond 'success' with all good value`, function() {
        return api
            .post(`/ResetPasswordTest`)
            .set(`Accept`, `application/json`)
            .send({
                newPassword: `this_is_a_good_password`,
                confirmPassword: `this_is_a_good_password`,
                resetToken: `this_is_a_good_token`
            })
            .expect(200).then(res => {
                assert.deepEqual(res.body.status, `success`);
            });
    });
});
