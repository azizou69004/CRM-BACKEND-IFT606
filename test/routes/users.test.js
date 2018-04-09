process.env.muteLog = true;
const request = require(`supertest`),
    app = require(`../../app`),
    api = request(app),
    usersTest = require(`../../routes/usersTest`),
    assert = require(`assert`);

/***
 * 	unit function createEmployee
 * @returns  true
 */

//Ceci est un test de commit pour le CI
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVzZXIiOjEsImlkcm9sZSI6MSwiaXAiOiIxODQuMTYzLjEzMy4yMyIsImlhdCI6MTUxMjEwOTE0MSwiZXhwIjoxNTEyMTM3OTQxfQ.O_9nyl28O8gIqYOmXLjvpVhU8U3EyJNf07KUULbO6iU`;

/***
	 * 	unit test with valid token
	 * @returns  true
	 */

/***
		* 	unit test with invalid token
		* @returns  true
		*/

describe(`GET /usersTest/list`, function() {
    this.timeout(15000);

    it(`respond with json`, function() {
        return	api
            .get(`/usersTest/list`)
            .set(`Accept`, `application/json`)
            .set(`Authorization`, ``)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});

/***
		* test /user/:id
		* 	test with invalid token
		* @returns  false
		*/
describe(`GET /usersTest/user/:id`, function() {
    this.timeout(15000);

    it(`respond with json`, function() {
        return	api
            .get(`/usersTest/user/:id`)
            .set(`Accept`, `application/json`)
            .set(`Authorization`, ``)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });
});


/***
		* test create user
		* 	test with valid token
		* @returns  false
		*/

describe(`POST /usersTest/createTrue`, function() {
    this.timeout(20000);

    it(`respond with json`, function() {
        const variable = Math.random().toString(36).substr(2);
        console.log(variable);
        return	api
            .post(`/usersTest/createTrue`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });
});

/***
		* test create user
		* 	test with valid token
		* @returns  false
		*/
describe(`POST /usersTest/createFalse`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .post(`/usersTest/createFalse`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });
});

/***
		* test update user
		* 	test with valid token
		* @returns  false
		*/
describe(`POST /usersTest/updateTrue`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .post(`/usersTest/updateTrue`)
            .set(`Accept`, `application/json`)
            .set(`Authorization`, token)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });
});

/***
		* test update user
		* 	test with valid token
		* @returns  false
		*/
describe(`POST /usersTest/updateFalse`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .post(`/usersTest/updateFalse`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });
});

/***
		* test update user
		* 	test with invalid token
		* @returns  false
		*/
describe(`POST /usersTest/update`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .post(`/usersTest/update`)
            .set(`Accept`, `application/json`)
            .set(`Authorization`, ``)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });
});

/***
		* test /user/operation
		* 	test with invalid token
		* @returns  true
		*/
describe(`GET /usersTest/operationsNonValid`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/usersTest/operationsNonValid`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });
});



/***
		* test /user/operation
		* 	test with valid token
		* @returns  true
		*/
describe(`GET  VALID /usersTest/operationsValid`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/usersTest/operationsValid`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });
});

/***
		* test defaultPerms user
		* 	test with invalid token
		* @returns  false
		*/
describe(`GET /usersTest/defaultPerms`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/usersTest/defaultPerms`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });
});

/***
		* test defaultPerms user
		* 	test with invalid token
		* @returns  false
		*/
describe(`GET /usersTest/defaultPermsTrue`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/usersTest/defaultPermsTrue`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });
});



/***
		 * test roles user
		 * 	test with invalid token
		 * @returns  false
		 */
describe(`GET /usersTest/getRoles`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/usersTest/getRoles`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });
});

/***
		 * test roles user  false
		 * 	test with invalid token
		 * @returns  false
		 */
describe(`GET /usersTest/getRolesF`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/usersTest/getRolesF`)
            .set(`Accept`, `application/json`)
            .set(`Authorization`, ``)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });
});



/***
		 * test delete user
		 * 	test with invalid token
		 * @returns  false
		 */
describe(`delete /usersTest/user/:idF`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/usersTest/user/:idF`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });
});

/***
 * test delete user
 * 	test with valid token
 * @returns  false
 */
describe(`delete /usersTest/user/:id`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .delete(`/usersTest/user/:id`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });
});
