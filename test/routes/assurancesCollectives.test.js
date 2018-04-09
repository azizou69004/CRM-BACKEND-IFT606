process.env.muteLog = true;
const request = require(`supertest`),
    app = require(`../../app`),
    api = request(app),
    assurancesCollectivesTest = require(`../../routes/assurancesCollectivesTest`),
    assert = require(`assert`);



/***
	 * FUNCTIONAL TESTS
	 *
	 * 	BD & Token are mocked
	 *  * @returns  success
	 */

describe(`POST /assurancesCollectivesTest`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return	api
            .post(`/assurancesCollectivesTest`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });
});


/***
 * FUNCTIONAL TESTS
 *
 * 	BD & invalid Token are mocked
 *  * @returns  success
 */

describe(`POST /assurancesCollectivesTestIV`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return	api
            .post(`/assurancesCollectivesTestIV`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });
});


/***
 * FUNCTIONAL TESTS
 *
 * 	BD in valid & valid Token are mocked
 *  * @returns  success
 */

describe(`POST /assurancesCollectivesTestIVBD`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return	api
            .post(`/assurancesCollectivesTestIV`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });
});
