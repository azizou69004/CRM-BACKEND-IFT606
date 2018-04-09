process.env.muteLog = true;
const request = require(`supertest`),
    app = require(`../../app`),
    api = request(app),
    assurancesCollectivesTest = require(`../../routes/assurancesCollectivesTest`),
    assert = require(`assert`);



/***
 * FUNCTIONAL TESTS  CREATE CUSTOMER
 *
 * 	BD & Token are mocked
 *  * @returns  success
 */
describe(`POST /getCustomerGridTest`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return	api
            .post(`/getCustomerGridTest`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });
});

/***
 * FUNCTIONAL TESTS  CREATE CUSTOMER
 *
 * 	BD & Token are mocked
 *  * @returns  success
 */
describe(`POST /getCustomerGridNonvalid`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return	api
            .post(`/getCustomerGridNonvalid`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });
});


/***
 * FUNCTIONAL TESTS  CREATE CUSTOMER
 *
 * 	BD & Token are mocked
 *  * @returns  success
 */
describe(`POST /createCustomerValidSuccess`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return	api
            .post(`/createCustomerValidSuccess`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });
});

/***
 * FUNCTIONAL TESTS  CREATE CUSTOMER
 *
 * 	BD & Token are mocked
 *  * @returns  success
 */
describe(`POST /createCustomerValidFail`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return	api
            .post(`/createCustomerValidFail`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });
});

/***
 * FUNCTIONAL TESTS updateCustomerSuccess
 *
 * 	BD & Token are mocked
 *  * @returns  success
 */
describe(`POST /updateCustomerSuccess`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return	api
            .post(`/updateCustomerSuccess`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });
});


/***
 * FUNCTIONAL TESTS updateCustomerSuccess
 *
 * 	BD & Token are mocked
 *  * @returns  fail
 */
describe(`POST /updateCustomerFail`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return	api
            .post(`/updateCustomerFail`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });
});


