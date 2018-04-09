const express = require(`express`);
const router = express.Router();
const expressJwtIp = require(`express-jwt-ip`);

//Create an update-join method for squel
const updateJoin = true;
const getContacts = true;
const getIdTitre = true;
const createPerson = true;
const createContact = true;
const updatePerson = true;
const updateContact = true;
const deletePerson = true;
const deleteContact = true;
const getStatementSendingModes = true;
const getChambersOfCommerce = true;
const getActivities = true;
const getJobs = true;
const getProvenances = true;
const getStates = true;
const tokenValid = true;
const tokenInvalid = true;
const requestDBSuccess = true;

router.get(`/contactsok/:id`, expressJwtIp.ip(), function(req, res) {
    if (tokenValid) {
        if (getContacts) {
            res.json({
                status: `success`,
            });
        } else {
            res.json({
                status: `fail`,
            });
        }
    } else {
        res.json({
            status: `fail`,
        });
    }
});


router.get(`/contactsNotok/:id`, expressJwtIp.ip(), function(req, res) {

    if (!tokenValid === true) {

        if (getContacts) {
            console.log(`LOLOLOIILLOIUH`);

            res.json({
                status: `success`,
            });
        } else {
            res.json({
                status: `fail`,
            });
        }
    } else {

        res.json({
            status: `fail`,
        });
    }
});

router.get(`/contactsNotNotok/:id`, expressJwtIp.ip(), function(req, res) {
    console.log(`LOLOLOIILLOIUH2`);

    if (tokenValid) {

        if (!getContacts) {
            res.json({
                status: `success`,
            });
        } else {
            res.json({
                status: `fail`,
            });
        }
    } else {
        res.json({
            status: `fail`,
        });
    }
});


router.post(`/contact/createok`, expressJwtIp.ip(), function(req, res) {
    if (tokenValid) {
        if (requestDBSuccess) {
            res.json({
                status: `success`,
            });
        } else {
            res.json({
                status: `fail`,
            });
        }
    } else {
        res.json({
            status: `fail`,
        });
    }
});

router.post(`/contact/createnotok1`, expressJwtIp.ip(), function(req, res) {
    if (!tokenValid) {
        if (requestDBSuccess) {
            res.json({
                status: `success`,
            });
        } else {
            res.json({
                status: `fail`,
            });
        }
    } else {
        res.json({
            status: `fail`,
        });
    }
});

router.post(`/contact/createnotok2`, expressJwtIp.ip(), function(req, res) {
    if (tokenValid) {
        if (!requestDBSuccess) {
            res.json({
                status: `success`,
            });
        } else {
            res.json({
                status: `fail`,
            });
        }
    } else {
        res.json({
            status: `fail`,
        });
    }
});


router.post(`/contact/updateok`, expressJwtIp.ip(), function(req, res) {
    if (tokenValid) {
        if (requestDBSuccess) {
            res.json({
                status: `success`,
            });
        }
        else {
            res.json({
                status: `fail`,
            });

        }
    }
    else {
        res.json({
            status: `fail`,
        });
    }
});


router.post(`/contact/updateNotok`, expressJwtIp.ip(), function(req, res) {
    if (tokenValid) {
        if (!requestDBSuccess) {
            res.json({
                status: `success`,
            });
        }
        else {
            res.json({
                status: `fail`,
            });

        }
    }
    else {
        res.json({
            status: `fail`,
        });
    }
});


router.post(`/contact/updateNotok2`, expressJwtIp.ip(), function(req, res) {
    if (!tokenValid) {
        if (requestDBSuccess) {
            res.json({
                status: `success`,
            });
        }
        else {
            res.json({
                status: `fail`,
            });

        }
    }
    else {
        res.json({
            status: `fail`,
        });
    }
});

router.delete(`/contactok/:idclient/:idpersonne`, expressJwtIp.ip(), function(req, res) {
    if (tokenValid && requestDBSuccess) {
        console.log(`ASGHLYF`);
        res.json({
            status: `success`,
        });
    }
    else {
        res.json({
            status: `fail`,
        });
    }
});

router.delete(`/contactnotok/:idclient/:idpersonne`, expressJwtIp.ip(), function(req, res) {
    if (!tokenValid && !requestDBSuccess) {
        res.json({
            status: `success`,
        });
    }
    else {
        res.json({
            status: `fail`,
        });
    }
});

router.get(`/statementSendingModesok`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /statementSendingModesok`);

    if (tokenValid && requestDBSuccess) {

        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `fail`,
        });
    }
});
router.get(`/statementSendingModesnotok`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /statementSendingModesnotok`);

    if (!tokenValid && !requestDBSuccess) {

        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `fail`,
        });
    }
});


router.get(`/agaok`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /aga`);

    if (tokenValid && requestDBSuccess) {
        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `success`,
        });
    }
});


router.get(`/aganotok`, expressJwtIp.ip(), function(req, res) {

    if (!tokenValid && !requestDBSuccess) {
        res.json({
            status: `success`,
        });
    } else {
        res.json({
            status: `fail`,
        });
    }
});

router.get(`/activitiesok`, expressJwtIp.ip(), function(req, res) {
    if (tokenValid && requestDBSuccess) {
        res.json({
            status: `success`,
        });

    } else {
        res.send({
            status: `fail`,
        });
    }
});
router.get(`/activitiesnotok`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /activities`);

    if (!tokenValid && !requestDBSuccess) {
        res.send({
            status: `success`,
        });

    } else {
        res.send({
            status: `fail`,
        });
    }
});


router.get(`/statesnotok`, expressJwtIp.ip(), function(req, res) {
    if (!tokenValid && !requestDBSuccess) {
        res.send({
            status: `success`,
        });
    }
    else {
        res.send({
            status: `fail`,
        });
    }
});
router.get(`/statesok`, expressJwtIp.ip(), function(req, res) {
    if (tokenValid && requestDBSuccess) {
        res.send({
            status: `success`,
        });
    }
    else {
        res.send({
            status: `fail`,
        });
    }
});

router.get(`/jobsok`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /jobs`);

    if (tokenValid && requestDBSuccess) {
        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `fail`,
        });
    }
});

router.get(`/jobsnotok`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /jobs`);

    if (!tokenValid && !requestDBSuccess) {
        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `fail`,
        });
    }
});

router.get(`/provenancesnotok`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /provenances`);

    if (!tokenValid && !requestDBSuccess) {
        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `fail`,
        });
    }
});

router.get(`/provenancesok`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /provenances`);

    if (tokenValid && requestDBSuccess) {
        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `fail`,
        });
    }
});

/**
 * Route serving specific Client
 * @method GET
 * @URL /clients/:id
 * @param expressJwtIp.ip() server IP address
 * @DataParams {authorization} auth token
 * @SuccessResponse { status: 200, client(selected by id) }
 * @ErrorResponse { status: 'fail', message: 'Erreur' }
 * **/
router.get(`/:idClientok`, expressJwtIp.ip(), function(req, res) {

    if (tokenValid && requestDBSuccess) {
        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `fail`,
        });
    }
});
router.get(`/:idClientnotok`, expressJwtIp.ip(), function(req, res) {

    if (!tokenValid && !requestDBSuccess) {

        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `fail`,
        });
    }
});

router.post(`/create`, expressJwtIp.ip(), function(req, res) {
    if (tokenValid && requestDBSuccess) {
        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `fail`,
        });
    }
});

router.post(`/createnotok`, expressJwtIp.ip(), function(req, res) {
    if (!tokenValid && !requestDBSuccess) {
        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `fail`,
        });
    }
});


router.post(`/update`, expressJwtIp.ip(), function(req, res) {
    if (tokenValid && requestDBSuccess) {
        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `fail`,
        });
    }
});


router.post(`/updatenotok`, expressJwtIp.ip(), function(req, res) {
    if (!tokenValid && !requestDBSuccess) {

        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `fail`,
        });
    }
});


router.delete(`/:idClient`, expressJwtIp.ip(), function(req, res) {
    console.log(`11111111111111`);

    if (tokenValid && requestDBSuccess) {
        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `fail`,
        });
    }
});

router.delete(`/mock/:idClientnotok2`, expressJwtIp.ip(), function(req, res) {

    if (!tokenValid && !requestDBSuccess) {

        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `fail`,
        });
    }
});

module.exports = router;
