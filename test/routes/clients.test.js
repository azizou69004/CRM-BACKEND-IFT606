process.env.muteLog = true;
const request = require(`supertest`),
    app = require(`../../app`),
    api = request(app),
    usersTest = require(`../../routes/usersTest`),
    assert = require(`assert`);









/***
		* 	unit test with invalid variables
		* @returns  true
		*/

describe(`GET /clientsTest/contactsok/:idOk`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/contactsok/:id`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });
});
describe(`GET /clientsTest/contacts/:idnOk`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/contactsNotok/:id`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});
describe(`GET /clientsTest/contacts/:idnnOk`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/contactsNotNotok/:id`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});

/**
 * /contact/create
 *
 *
 */

describe(`post /clientsTest//contact/createok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .post(`/clientsTest//contact/createok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });

});


describe(`post /clientsTest//contact/createnotok1`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .post(`/clientsTest/contact/createnotok1`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});


describe(`post /clientsTest//contact/createnotok2`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .post(`/clientsTest/contact/createnotok2`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});


describe(`post /clientsTest/contact/updateok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .post(`/clientsTest/contact/updateok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });

});




describe(`post /clientsTest/contact/updateNotok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .post(`/clientsTest/contact/updateNotok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});



describe(`post /clientsTest/contact/updateNotok2`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .post(`/clientsTest/contact/updateNotok2`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});


describe(`delete /clientsTest/contactok/:idclient/:idpersonne`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .delete(`/clientsTest/contactok/:idclient/:idpersonne`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });

});


describe(`delete /clientsTest/contactnotok/:idclient/:idpersonne`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .delete(`/clientsTest/contactnotok/:idclient/:idpersonne`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});



describe(`GET /clientsTest/statementSendingModes`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/statementSendingModesok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });

});
describe(`GET /clientsTest/statementSendingModes2`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/statementSendingModesnotok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});

describe(`GET /clientsTest/aganotok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/aganotok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});

describe(`GET /clientsTest/agaok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/agaok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });

});
describe(`GET /clientsTest/activitiesok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/activitiesok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });

});


describe(`GET /clientsTest/statesnotok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/statesnotok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});

describe(`GET /clientsTest/statesok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/statesok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });

});
describe(`GET /clientsTest/activitiesnotok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/activitiesnotok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});

describe(`GET /clientsTest/jobsok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/jobsok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });

});

describe(`GET /clientsTest/jobsnotok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/jobsnotok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});


describe(`GET /clientsTest/provenancesok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/provenancesok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });

});

describe(`GET /clientsTest/provenancesnotok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/provenancesnotok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});


describe(`GET /clientsTest/:idClientok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/provenancesok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });

});

describe(`GET /clientsTest/:idClientnotok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/provenancesnotok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});

describe(`GET /clientsTest/create`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/create`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });

});

describe(`GET /clientsTest/createnotok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .get(`/clientsTest/provenancesnotok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});


describe(`post /clientsTest/update`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .post(`/clientsTest/update`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });

});

describe(`post /clientsTest/updatenotok`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .post(`/clientsTest/updatenotok`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});


describe(`delete /clientsTest/:idClient`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .delete(`/clientsTest/:idClient`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `success`);
            });
    });

});

describe(`delete /clientsTest/mock/:idClientnotok2`, function() {
    this.timeout(15000);
    it(`respond with json`, function() {
        return	api
            .delete(`/clientsTest/mock/:idClientnotok2`)
            .set(`Accept`, `application/json`)
            .expect(200).then(res => {
                assert.deepEqual(res.body.status , `fail`);
            });
    });

});
