process.env.muteLog = true;
const request = require(`supertest`),
    app = require(`../../app`),
    api = request(app),
    assurancesCollectivesTest = require(`../../routes/assurancesCollectivesTest`),
    assert = require(`assert`);



/***
	 * FUNCTIONAL TESTS
	 *
	 * 	selectFournisseur & tokenValid are mocked
	 *  * @returns  success
	 */

describe(`POST /fournisseursTest`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return	api
            .post(`/fournisseursTest`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });
});

/***
 * FUNCTIONAL TESTS
 *
 * 	!selectFournisseur & tokenValid are mocked
 *  * @returns  success
 */

describe(`POST /fournisseursTestFail`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return	api
            .post(`/fournisseursTestFail`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });
});

/***
 * FUNCTIONAL TESTS
 *
 * 	!selectFournisseur & !tokenValid are mocked
 *  * @returns  success
 */

describe(`POST /fournisseursTestFail2`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return	api
            .post(`/fournisseursTestFail2`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });
});

