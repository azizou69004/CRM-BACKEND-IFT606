process.env.muteLog = true;
const request = require(`supertest`),
    app = require(`../../app`),
    api = request(app),
    loginTest = require(`../../routes/loginTest`),
    assert = require(`assert`);

/***
 *    unit function isvalue undefined
 * @returns  true
 */

describe(`Login function isValuesUndefined(req)`, () => {
    it(`respond false with an undefined req`, () => {
        const req = undefined;
        assert(loginTest.isValuesUndefined(req));
    });

    it(`respond false with an undefined req.body`, () => {
        const req = {body: undefined};
        assert(loginTest.isValuesUndefined(req));
    });

    it(`respond false with all three variable undefined`, () => {
        const req = {body: {username: undefined, password: undefined}};
        assert(loginTest.isValuesUndefined(req));
    });

    it(`respond false with first two variable undefined`, () => {
        const req = {body: {username: ``, password: undefined}};
        assert(loginTest.isValuesUndefined(req));
    });

    it(`respond false with first and third variable undefined`, () => {
        const req = {body: {username: undefined, password: ``}};
        assert(loginTest.isValuesUndefined(req));
    });

    it(`respond false with second and third variable undefined`, () => {
        const req = {body: {username: ``, password: ``}};
        assert(loginTest.isValuesUndefined(req));
    });

    it(`respond true with all variables defined`, () => {
        const req = {body: {username: `not_undefined`, password: `not_undefined`}};
        assert(!loginTest.isValuesUndefined(req));
    });
});


/***
 * Functional tests
 * route login
 * Valid username + valid password
 */
describe(`POST /loginTest`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return api
            .post(`/loginTest`)
            .set(`Accept`, `application/json`)
            .send({
                "username": `alain`,
                "password": `password`
            })
            .expect(200).then(res => {
                assert.deepEqual(res.body.status, `success`);
            });
    });
});
/***
 * Functional tests
 * route login
 * Valid username + invalid password
 */
describe(`POST /loginTestFail`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return api
            .post(`/loginTest`)
            .set(`Accept`, `application/json`)
            .send({
                "username": `alain`,
                "password": `blabla`
            })
            .expect(200).then(res => {
                assert.deepEqual(res.body.status, `error`);
            });
    });
});

/***
 * Functional tests
 * route login
 * invalid Valid username + Valid password
 */
describe(`POST /loginTestFalse`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return api
            .post(`/loginTestFalse`)
            .set(`Accept`, `application/json`)
            .send({
                "username": `alain`,
                "password": `blabla`
            })
            .expect(200).then(res => {
                assert.deepEqual(res.body.status, `fail`);
            });
    });
});


/***
 * Functional tests
 * route login add
 * non existing user yet
 * if exists fail
 */
describe(`POST /loginTest/add`, function() {
    this.timeout(20000);
    const randomValue = Math.random().toString(36).substr(2);

    it(`respond with json`, function() {
        return api
            .post(`/loginTest/add`)
            .set(`Accept`, `application/json`)
            .send({
                "username": randomValue,
                "password": `password`
            })
            .expect(200).then(res => {
                assert.deepEqual(res.body.status, `success`);
            });
    });
});
/***
 * Functional tests
 * route login add
 * user already exists
 * if exists fail
 */
describe(`POST /loginTest/addExist`, function() {
    this.timeout(20000);
    const randomValue = Math.random().toString(36).substr(2);

    it(`respond with json`, function() {
        return api
            .post(`/loginTest/addExist`)
            .set(`Accept`, `application/json`)
            .send({
                "username": randomValue,
                "password": `password`
            })
            .expect(200).then(res => {
                assert.deepEqual(res.body.status, `fail`);
            });
    });
});
