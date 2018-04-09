process.env.muteLog = true;
const request = require(`supertest`),
    app = require(`../../app`),
    api = request(app),
    assert = require(`assert`);

/***
	 * FUNCTIONAL TESTS   customer
	 *
	 * 	BD & Token are mocked
	 *  * @returns  success
	 */


describe(`get /customerSuccess`, function() {
    this.timeout(20000);
    it(`respond with json`, function() {
        return	api
            .get(`/customerSuccess`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });
});

/***
 * FUNCTIONAL TESTS   customer
 *
 * 	BD & Token are mocked
 *  * @returns  success
 */

describe(`get /customerFail`, function() {
this.timeout(20000);
it(`respond with json`, function() {
    return	api
        .get(`/customerFail`)
        .set(`Accept`, `application/json`)
        .expect(200).then(res => {
            assert.deepEqual(res.body.status , `fail`);
        });
});
});



/***
 * FUNCTIONAL TESTS   types
 *
 * 	BD & Token are mocked
 *  * @returns  success
 */

describe(`get /typesSuccess`, function() {
this.timeout(20000);
it(`respond with json`, function() {
    return	api
        .get(`/typesSuccess`)
        .set(`Accept`, `application/json`)
        .expect(200).then(res => {
            assert.deepEqual(res.body.status , `success`);
        });
});
});
/***
* FUNCTIONAL TESTS   types
*
* 	BD & Token are mocked
*  * @returns  fail
*/

describe(`get /typesFail`, function() {
this.timeout(20000);
it(`respond with json`, function() {
   return	api
       .get(`/typesFail`)
       .set(`Accept`, `application/json`)
       .expect(200).then(res => {
           assert.deepEqual(res.body.status , `fail`);
       });
});
});




/***
* FUNCTIONAL TESTS   /create/customerSuccess
*
* 	BD & Token are mocked
*  * @returns  success
*/

describe(`post /create/customerSuccess`, function() {
this.timeout(20000);
it(`respond with json`, function() {
   return	api
       .post(`/create/customerSuccess`)
       .set(`Accept`, `application/json`)
       .expect(200).then(res => {
           assert.deepEqual(res.body.status , `success`);
       });
});
});



/***
* FUNCTIONAL TESTS   /create/customerSuccess
*
* 	BD & Token are mocked
*  * @returns  fail
*/

describe(`post /create/customerFail`, function() {
this.timeout(20000);
it(`respond with json`, function() {
   return	api
       .post(`/create/customerFail`)
       .set(`Accept`, `application/json`)
       .expect(200).then(res => {
           assert.deepEqual(res.body.status , `fail`);
       });
});
});

/***
* FUNCTIONAL TESTS   /create/customerSuccess
*
* 	BD & Token are mocked
*  * @returns  success
*/

describe(`post /update/customerSuccess`, function() {
this.timeout(20000);
it(`respond with json`, function() {
   return	api
       .post(`/update/customerSuccess`)
       .set(`Accept`, `application/json`)
       .expect(200).then(res => {
           assert.deepEqual(res.body.status , `success`);
       });
});
});

/***
* FUNCTIONAL TESTS   /create/customerSuccess
*
* 	BD & Token are mocked
*  * @returns  fail
*/

describe(`post /update/customerFail`, function() {
this.timeout(20000);
it(`respond with json`, function() {
   return	api
       .post(`/update/customerFail`)
       .set(`Accept`, `application/json`)
       .expect(200).then(res => {
           assert.deepEqual(res.body.status , `fail`);
       });
});
});




////////////
/***
* FUNCTIONAL TESTS   /create/customerSuccess
*
* 	BD & Token are mocked
*  * @returns  success
*/

describe(`post /update/customer/displaySuccess`, function() {
this.timeout(20000);
it(`respond with json`, function() {
   return	api
       .post(`/update/customer/displaySuccess`)
       .set(`Accept`, `application/json`)
       .expect(200).then(res => {
           assert.deepEqual(res.body.status , `success`);
       });
});
});

/***
* FUNCTIONAL TESTS   /create/customerSuccess
*
* 	BD & Token are mocked
*  * @returns  fail
*/

describe(`post /update/customer/displayFail`, function() {
this.timeout(20000);
it(`respond with json`, function() {
   return	api
       .post(`/update/customer/displayFail`)
       .set(`Accept`, `application/json`)
       .expect(200).then(res => {
           assert.deepEqual(res.body.status , `fail`);
       });
});
});

/***
* FUNCTIONAL TESTS   delete /customerSuccess/:id
*
* 	BD & Token are mocked
*  * @returns  fail
*/

describe(`post /customerSuccess/:id`, function() {
this.timeout(20000);
it(`respond with json`, function() {
   return	api
       .delete(`/customerSuccess/:id`)
       .set(`Accept`, `application/json`)
       .expect(200).then(res => {
           assert.deepEqual(res.body.status , `success`);
       });
});
});


/***
* FUNCTIONAL TESTS   delete /customerFail/:id
*
* 	BD & Token are mocked
*  * @returns  fail
*/

describe(`post /customerFail/:id`, function() {
this.timeout(20000);
it(`respond with json`, function() {
   return	api
       .delete(`/customerFail/:id`)
       .set(`Accept`, `application/json`)
       .expect(200).then(res => {
           assert.deepEqual(res.body.status , `fail`);
       });
});
});



















