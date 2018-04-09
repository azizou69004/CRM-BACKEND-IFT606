const express = require(`express`);
const router = express.Router();
const squelb = require(`squel`);
const squel = squelb.useFlavour(`postgres`);
const db = require(`../models/index`);
const expressJwtIp = require(`express-jwt-ip`);

// Create an update-join method for squel
squel.updateJoin = function(options) {
    return squel.update(options, [
        new squel.cls.StringBlock(options, `UPDATE`),
        new squel.cls.UpdateTableBlock(options),
        new squel.cls.SetFieldBlock(options),
        new squel.cls.FromTableBlock(options),
        new squel.cls.JoinBlock(options),
        new squel.cls.WhereBlock(options),
        new squel.cls.OrderByBlock(options),
        new squel.cls.LimitBlock(options),
    ]);
};

// Squel request for getting contacts of a client
const getContacts = (idclient) =>
    squel.select()
        .field(`pers.idpersonne`, `idpersonne`)
        .field(`prenom`)
        .field(`nom`)
        .field(`libelleposte`)
        .field(`libelletitre`)
        .field(`num_tel_principal`)
        .field(`ext_tel_principal`)
        .field(`mail`)
        .field(`estdecideur`)
        .from(`public."CONTACT_CLIENT"`, `cont`)
        .left_join(`public."PERSONNE"`, `pers`, `pers.idpersonne = cont.idpersonne`)
        .left_join(`public."POSTE_ENTREPRISE"`, `poste`, `poste.idposte_ent = cont.idposte_ent`)
        .left_join(`public."TITRE"`, `titre`, `pers.idtitre = titre.idtitre`)
        .where(`cont.idclient = ?`, idclient)
        .toString();

// Squel request for getting a title id with its label
const getIdTitre = (titre) =>
    squel.select()
        .from(`public."TITRE"`, `t`)
        .field(`t.idtitre`)
        .where(`t.libelletitre = ?`, titre)
        .toString();

// Squel request for creating a person
const createPerson = (person) =>
    squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .into(`public."PERSONNE"`)
        .set(`nom`, person.nom)
        .set(`prenom`, person.prenom)
        .set(`idtitre`, person.idtitre)
        .set(`num_tel_principal`, person.num_tel_principal)
        .set(`ext_tel_principal`, person.ext_tel_principal)
        .set(`mail`, person.mail)
        .returning(`idpersonne`)
        .toParam();

// Squel request for crating a contact for a client
const createContact = (person) =>
    squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .into(`public."CONTACT_CLIENT"`)
        .set(`idpersonne`, person.idpersonne)
        .set(`estdecideur`, person.estdecideur)
        .set(`idposte_ent`, person.idposte)
        .set(`idclient`, person.idclient)
        .toParam();

// Squel request for updating a person (who is a client contact)
const updatePerson = (person) =>
    squel.update({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .table(`public."PERSONNE"`)
        .set(`nom`, person.nom)
        .set(`prenom`, person.prenom)
        .set(`idtitre`, person.idtitre)
        .set(`num_tel_principal`, person.num_tel_principal)
        .set(`ext_tel_principal`, person.ext_tel_principal)
        .set(`mail`, person.mail)
        .where(`idpersonne = ?`, person.idpersonne)
        .toParam();

// Squel request for updating a client contact
const updateContact = (person) =>
    squel.update({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .table(`public."CONTACT_CLIENT"`)
        .set(`estdecideur`, person.estdecideur)
        .set(`idposte_ent`, person.idposte)
        .where(`idpersonne = ?`, person.idpersonne)
        .where(`idclient = ?`, person.idclient)
        .toParam();

// Squel request for deleting a person (who was a client contact)
const deletePerson = (idpersonne) =>
    squel.delete()
        .from(`public."PERSONNE"`)
        .where(`idpersonne = ?`, idpersonne)
        .toParam();

// Squel request for deleting a client contact
const deleteContact = (idpersonne, idclient) =>
    squel.delete()
        .from(`public."CONTACT_CLIENT"`)
        .where(`idpersonne = ?`, idpersonne)
        .where(`idclient = ?`, idclient)
        .toParam();

// Squel request for getting the sending modes available
const getStatementSendingModes = () =>
    squel.select()
        .from(`public."RELEVE"`)
        .field(`idreleve`)
        .field(`modeenvoiereleve`)
        .toString();

// Squel request for getting the chambers of commerce available
const getChambersOfCommerce = () =>
    squel.select()
        .from(`public."CHAMBRE_COMMERCE"`)
        .field(`idchambrecommerce`)
        .field(`libellechambrecommerce`)
        .toString();

// Squel request for getting the activities available
const getActivities = () =>
    squel.select()
        .from(`public."ACTIVITE"`)
        .field(`idactivite`)
        .field(`libelleactivite`)
        .toString();

// Squel request for getting the jobs available
const getJobs = () =>
    squel.select()
        .from(`public."POSTE_ENTREPRISE"`)
        .field(`idposte_ent`, `idposte`)
        .field(`libelleposte`)
        .toString();

// Squel request for getting the provenances available
const getProvenances = () =>
    squel.select()
        .from(`public."PROVENANCE"`)
        .field(`idprovenance`)
        .field(`libelleprovenance`)
        .toString();

// Squel request for getting the states available
const getStates = () =>
    squel.select()
        .from(`public."ETAT"`)
        .field(`idetat`)
        .field(`libelleetat`)
        .toString();

/**
 * Route retrieving contacts of a client
 * @method GET
 * @URL /clients/contacts/:id
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: success, message: [{ idpersonne, prenom, nom, libelletitre,
 * libelleposte, num_tel_principal, ext_tel_principal, mail, estdecideur }] }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.get(`/contacts/:id`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /contacts/:id`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {
    const id = req.params.id;
    db.any(getContacts(id))
        .then((contacts) => {
            console.log(JSON.stringify(contacts));
            res.send({
                status: `success`,
                message: contacts
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Les contacts n'ont pas pu être récupérés'
            });
        });
    /*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
});

/**
 * Route creating a contact for a client
 * @method POST
 * @URL /clients/contact/create
 * @param expressJwtIp.ip() server IP address
 * @DataParams {idclient, prenom, idposte, titre, num_tel_principal, ext_tel_principal, mail, estdecideur} Contact to be created
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.post(`/contact/create`, expressJwtIp.ip(), function(req, res) {
    console.log(`route POST /create/contact`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {
    const person = {
        idclient: req.body.idclient,
        prenom: req.body.prenom,
        nom: req.body.nom,
        idposte: req.body.idposte,
        titre: req.body.titre,
        num_tel_principal: req.body.num_tel_principal,
        ext_tel_principal: req.body.ext_tel_principal,
        mail: req.body.mail,
        estdecideur: req.body.estdecideur
    };

    db.tx(t => {
        return t.one(getIdTitre(person.titre))
            .then(titre => {
                person.idtitre = titre.idtitre;
                return t.one(createPerson(person))
                    .then(personCreated => {
                        person.idpersonne = personCreated.idpersonne;
                        return t.none(createContact(person))
                            .then(() => {
                                res.send({
                                    status: `success`,
                                    message: null
                                });
                            });
                    });
            });
    })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Le contact client n'a pas pu être créé'
            });
        });

    /*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
});

/**
 * Route updating a contact for a client
 * @method POST
 * @URL /clients/contact/
 * @param expressJwtIp.ip() server IP address
 * @DataParams {idclient, idpersonne, prenom, idposte, titre, num_tel_principal, ext_tel_principal, mail, estdecideur} Contact to be updated
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.post(`/contact/update`, expressJwtIp.ip(), function(req, res) {
    console.log(`route POST /contact/update`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {
    const person = {
        idclient: req.body.idclient,
        idpersonne: req.body.idpersonne,
        prenom: req.body.prenom,
        nom: req.body.nom,
        idposte: req.body.idposte,
        titre: req.body.titre,
        num_tel_principal: req.body.num_tel_principal,
        ext_tel_principal: req.body.ext_tel_principal,
        mail: req.body.mail,
        estdecideur: req.body.estdecideur
    };

    db.tx(t => {
        return t.one(getIdTitre(person.titre))
            .then(titre => {
                person.idtitre = titre.idtitre;
                return t.none(updatePerson(person))
                    .then(() => {
                        return t.none(updateContact(person))
                            .then(() => {
                                res.send({
                                    status: `success`,
                                    message: null
                                });
                            });
                    });
            });
    })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Le contact client n'a pas pu être créé'
            });
        });

    /*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
});

/**
 * Route deleting a contact for a client
 * @method DELETE
 * @URL /clients/contact/:idclient/:idpersonne
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.delete(`/contact/:idclient/:idpersonne`, expressJwtIp.ip(), function(req, res) {
    console.log(`route DELETE /contact/:idclient/:idpersonne`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {
    const idclient = req.params.idclient;
    const idpersonne = req.params.idpersonne;

    db.tx(t => {
        return t.none(deleteContact(idpersonne, idclient))
            .then(() => {
                return t.none(deletePerson(idpersonne))
                    .then(() => {
                        res.send({
                            status: `success`,
                            message: null
                        });
                    });
            });
    })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Le contact client n'a pas pu être créé'
            });
        });

    /*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
});

/**
 * Route getting sending modes available
 * @method GET
 * @URL /clients/statementSendingModes
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: [ { idreleve, modeenvoiereleve } ] }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.get(`/statementSendingModes`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /statementSendingModes`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {

    db.any(getStatementSendingModes())
        .then((methods) => {
            console.log(JSON.stringify(methods));
            res.send({
                status: `success`,
                message: methods
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Les modes d'envoi des relevés n\'ont pas pu être récupérés'
            });
        });
    /*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
});

/**
 * Route getting chambers of commerce available
 * @method GET
 * @URL /clients/aga
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: [ { idchambrecommerce, libellechambrecommerce } ] }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.get(`/aga`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /aga`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {

    db.any(getChambersOfCommerce())
        .then((chambers) => {
            console.log(JSON.stringify(chambers));
            res.send({
                status: `success`,
                message: chambers
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Les chambres de commerce disponibles n\'ont pas pu être récupérées'
            });
        });
    /*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
});

/**
 * Route getting activities available
 * @method GET
 * @URL /clients/activities
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: [ { idactivite, libelleactivite } ] }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.get(`/activities`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /activities`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {

    db.any(getActivities())
        .then((activities) => {
            console.log(JSON.stringify(activities));
            res.send({
                status: `success`,
                message: activities
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Les activités disponibles n\'ont pas pu être récupérées'
            });
        });
    /*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
});

/**
 * Route getting states available
 * @method GET
 * @URL /clients/states
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: [ { idetat, libelleetat } ] }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.get(`/states`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /states`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {

    db.any(getStates())
        .then((states) => {
            console.log(JSON.stringify(states));
            res.send({
                status: `success`,
                message: states
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Les activités disponibles n\'ont pas pu être récupérées'
            });
        });
    /*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
});

/**
 * Route getting jobs available
 * @method GET
 * @URL /clients/jobs
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: [ { idposte, libelleposte } ] }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.get(`/jobs`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /jobs`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {

    db.any(getJobs())
        .then((jobs) => {
            console.log(JSON.stringify(jobs));
            res.send({
                status: `success`,
                message: jobs
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Les postes disponibles n\'ont pas pu être récupérées'
            });
        });
    /*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
});

/**
 * Route getting jobs available
 * @method GET
 * @URL /clients/provenances
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: [ { idprovenance, libelleprovenance } ] }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.get(`/provenances`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /provenances`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {

    db.any(getProvenances())
        .then((provenances) => {
            console.log(JSON.stringify(provenances));
            res.send({
                status: `success`,
                message: provenances
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Les activités disponibles n\'ont pas pu être récupérées'
            });
        });
    /*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
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
router.get(`/:idClient`, expressJwtIp.ip(), function(req, res) {

    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	const _ip = res.locals.ip;*/

    let wantedClientRows;

    //if (!!decoded && (_ip === _ipReceived)) {

    console.log(`Starting /clients/:idClient`);

    db.query(getOptionnalClientRowsById(req.params.idClient))
        .then((optionnalRows) => {

            wantedClientRows = buildClientObject(optionnalRows);

            db.one(getObligatoryClientRowsById(req.params.idClient))
                .then((obligatoryRow) => {
                    obligatoryRow.facultatif = wantedClientRows;
                    const date = new Date(obligatoryRow.date_creation);
                    obligatoryRow.date_creation = date.toLocaleDateString(`fr-FR`);
                    console.log(JSON.stringify(obligatoryRow));

                    res.status(200);
                    sendResponse(obligatoryRow, res, `success`);
                })
                .catch(error => {
                    console.log(`ERROR:`, error);
                    res.status(404);
                    sendResponse(`NOT FOUND`, res, `fail`);
                });
        })
        .catch(error => {
            console.log(`ERROR:`, error);
            res.status(404);
            sendResponse(`NOT FOUND`, res, `fail`);
        });
    /*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/

    console.log(`end get /clients/:id`);
});

// Build optionnal values for a client, in order to serve them
const buildClientObject = (optionnalRows) => {
    const clientRowsToReturn = [];
    let columnName;
    let columnValue;
    let clientRow = {};
    let columnTemp;
    let columnType;
    let columnDesc;

    optionnalRows.forEach((optionnalRow) => {
        clientRow = {
            idRow: optionnalRow.idattr
        };
        columnName = optionnalRow.label;
        columnValue = optionnalRow.valeur;
        columnTemp = optionnalRow.forme_type;
        columnType = optionnalRow.type;
        columnDesc = optionnalRow.description;
        clientRow[`nom`] = columnName;
        clientRow[`valeur`] = columnValue;
        clientRow[`description`] = columnDesc;
        //A déterminer si on en a besoin ou non, suivant le traitement effectué en front-end
        clientRow[`type`] = columnType;
        clientRow[`forme`] = columnTemp;
        clientRowsToReturn.push(clientRow);
    });

    return clientRowsToReturn;
};

// Squel request getting the optionnal attributes of a specific client
const getOptionnalClientRowsById = (idClient) => {
    return squel.select()
        .field(`label`)
        .field(`valeur`)
        .field(`attr.description`, `description`)
        .field(`type.libelletype`, `type`)
        .field(`type.forme`, `forme_type`)
        .field(`facul.idattrentreprise`, `idattr`)
        .from(`"ENTREPRISE"`, `entp`)
        .join(`"ENTREPRISE_FACUL"`, `facul`, `entp.idclient = facul.identreprise`)
        .left_join(`"ENTREPRISE_ATTR"`, `attr`, `attr.idattrentreprise = facul.idattrentreprise`)
        .left_join(`"TYPE"`, `type`, `type.idtype = attr.idtype`)
        .where(`entp.idclient = ?`, idClient)
        .toString();
};

// Squel request getting the obligatory attributes of a specific client
const getObligatoryClientRowsById = (idClient) => {
    return squel.select()
        .field(`cli.idclient`, `idclient`)
        .field(`libelleprovenance`, `provenance`)
        .field(`libelleetat`, `etat`)
        .field(`modeenvoiereleve`, `releve`)
        .field(`libelleactivite`, `forme_type`)
        .field(`nom`)
        .field(`tel_principal`)
        .field(`ext_tel_principal`)
        .field(`date_creation`)
        .field(`prospect`)
        .field(`notes`)
        .field(`rue`)
        .field(`province`)
        .field(`codepostal`)
        .field(`ville`)
        .from(`"CLIENT"`, `cli`)
        .left_join(`"ENTREPRISE"`, `entr`, `cli.idclient = entr.idclient`)
        .left_join(`"RELEVE"`, `rel`, `entr.idreleve = rel.idreleve`)
        .left_join(`"ACTIVITE"`, `act`, `entr.idactivite = act.idactivite`)
        .left_join(`"ADRESSE"`, `adr`, `adr.idadresse = entr.idadresse`)
        .left_join(`"ETAT"`, `etat`, `cli.idetat = etat.idetat`)
        .left_join(`"PROVENANCE"`, `prov`, `cli.idprovenance = prov.idprovenance`)
        .where(`cli.idclient = ?`, idClient)
        .toString();
};

/**
 * Send a response to Front-End
 * @param message
 * @param response
 * @param status
 */
const sendResponse = (message, response, status) => {
    response.send({
        status: status,
        message: message
    });
};

// Squel request creating an address for a client
const createAdresse = (client) =>
    squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .into(`public."ADRESSE"`)
        .set(`rue`, client.rue)
        .set(`ville`, client.ville)
        .set(`province`, client.province)
        .set(`codepostal`, client.codepostal)
        .returning(`idadresse`)
        .toParam();

// Squel request creating a company
const createEntrepriseOblig = (client) =>
    squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .into(`public."ENTREPRISE"`)
        .set(`idclient`, client.idclient)
        .set(`idadresse`, client.idadresse)
        .set(`idreleve`, client.idreleve)
        .set(`nom`, client.nom)
        .set(`tel_principal`, client.tel_princ)
        .set(`ext_tel_principal`, client.ext_tel_princ)
        .set(`idactivite`, client.idactivite)
        .toParam();

// Squel request creating a client
const createClientOblig = (client) =>
    squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .into(`public."CLIENT"`)
        .set(`idetat`, client.idetat)
        .set(`idprovenance`, client.idprovenance)
        .set(`prospect`, client.prospect)
        .set(`notes`, client.notes)
        .returning(`idclient`)
        .toParam();

// Squel request filling optionnal attributes for a specific client
const createClientFacul = (idclient, idattr, valeur) =>
    squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .into(`public."ENTREPRISE_FACUL"`)
        .set(`identreprise`, idclient)
        .set(`idattrentreprise`, idattr)
        .set(`valeur`, valeur)
        .toParam();

/**
 * Route creating a client
 * @method POST
 * @URL /clients/create
 * @param expressJwtIp.ip() server IP address
 * @DataParams {idreleve, nom, tel_princ, ext_tel_princ, idactivite, ville, province,
 * codepostal, idetat, idprovenance, prospect, notes, facul, newcontacts} Client to be created
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.post(`/create`, expressJwtIp.ip(), function(req, res) {

    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	const _ip = res.locals.ip;

	if (!!decoded && (_ip === _ipReceived)) {*/

    console.log(`Starting /clients/create`);

    var client = {
        idreleve: req.body.idreleve,
        nom: req.body.nom,
        tel_princ: req.body.tel_princ,
        ext_tel_princ: req.body.ext_tel_princ,
        idactivite: req.body.idactivite,
        rue: req.body.rue,
        ville: req.body.ville,
        province: req.body.province,
        codepostal: req.body.codepostal,
        idetat: req.body.idetat,
        idprovenance: req.body.idprovenance,
        prospect: req.body.prospect,
        notes: req.body.notes,
        facul: req.body.facultatif,
        newcontacts: req.body.newcontacts
    };

    db.tx(t => {
        return t.one(createAdresse(client))
            .then((newAdress) => {
                client.idadresse = newAdress.idadresse;
                return t.one(createClientOblig(client))
                    .then((newClient) => {
                        client.idclient = newClient.idclient;
                        return t.none(createEntrepriseOblig(client))
                            .then(() => {
                                const queries = client.facul.map(attribute => {
                                    return t.none(createClientFacul(client.idclient, attribute.id, attribute.value));
                                });
                                return t.batch(queries)
                                    .then(() => {
                                        const queriesContactNew = client.newcontacts.map(contact => {
                                            const person = {
                                                idclient: client.idclient,
                                                prenom: contact.prenom,
                                                nom: contact.nom,
                                                idposte: contact.idposte,
                                                titre: contact.titre,
                                                num_tel_principal: contact.num_tel_principal,
                                                ext_tel_principal: contact.ext_tel_principal,
                                                mail: contact.mail,
                                                estdecideur: contact.estdecideur
                                            };

                                            return t.one(getIdTitre(person.titre))
                                                .then(titre => {
                                                    person.idtitre = titre.idtitre;
                                                    return t.one(createPerson(person))
                                                        .then(personCreated => {
                                                            person.idpersonne = personCreated.idpersonne;
                                                            return t.none(createContact(person));
                                                        });
                                                });
                                        });
                                        return t.batch(queriesContactNew);
                                    });
                            });
                    });
            });
    })
        .then(() => {
            res.send({
                status: `success`,
                message: null
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Le client n'a pas pu être créé'
            });
        });
    /*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/

    console.log(`end post /clients/create`);
});

// Squel request for updating a client address
const updateAdresse = (client) =>
    squel.updateJoin({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .table(`public."ADRESSE"`, `adr`)
        .set(`rue`, client.rue)
        .set(`ville`, client.ville)
        .set(`province`, client.province)
        .set(`codepostal`, client.codepostal)
        .from(`public."ENTREPRISE"`, `entr`)
        .where(`adr.idadresse = entr.idadresse`)
        .where(`entr.idclient = ?`, client.idclient)
        .toParam();

// Squel request for updating a company
const updateEntrepriseOblig = (client) =>
    squel.update({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .table(`public."ENTREPRISE"`)
        .set(`idreleve`, client.idreleve)
        .set(`nom`, client.nom)
        .set(`tel_principal`, client.tel_princ)
        .set(`ext_tel_principal`, client.ext_tel_princ)
        .set(`idactivite`, client.idactivite)
        .where(`idclient = ?`, client.idclient)
        .toParam();

// Squel request for updating a client obligatory attributes
const updateClientOblig = (client) =>
    squel.update({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .table(`public."CLIENT"`)
        .set(`idetat`, client.idetat)
        .set(`idprovenance`, client.idprovenance)
        .set(`prospect`, client.prospect)
        .set(`notes`, client.notes)
        .where(`idclient = ?`, client.idclient)
        .toParam();

// Squel request for deleting a client facultative attributes
const deleteClientFacul = (idclient) =>
    squel.delete({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .from(`public."ENTREPRISE_FACUL"`)
        .where(`identreprise = ?`, idclient)
        .toParam();

/**
 * Route updating a client
 * @method POST
 * @URL /clients/update
 * @param expressJwtIp.ip() server IP address
 * @DataParams {idclient, idreleve, nom, tel_princ, ext_tel_princ, idactivite, ville, province,
 * codepostal, idetat, idprovenance, prospect, notes, facul, newcontacts, updtcontacts, delcontacts} Client to be created
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.post(`/update`, expressJwtIp.ip(), function(req, res) {

    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	const _ip = res.locals.ip;

	if (!!decoded && (_ip === _ipReceived)) {*/

    console.log(`Starting /clients/update`);

    var client = {
        idclient: req.body.idclient,
        idreleve: req.body.idreleve,
        nom: req.body.nom,
        tel_princ: req.body.tel_princ,
        ext_tel_princ: req.body.ext_tel_princ,
        idactivite: req.body.idactivite,
        rue: req.body.rue,
        ville: req.body.ville,
        province: req.body.province,
        codepostal: req.body.codepostal,
        idetat: req.body.idetat,
        idprovenance: req.body.idprovenance,
        prospect: req.body.prospect,
        notes: req.body.notes,
        facul: req.body.facultatif,
        updtcontacts: req.body.updtcontacts,
        newcontacts: req.body.newcontacts,
        delcontacts: req.body.delcontacts
    };

    db.tx(t => {
        return t.none(updateAdresse(client))
            .then(() => {
                return t.none(updateClientOblig(client))
                    .then(() => {
                        return t.none(updateEntrepriseOblig(client))
                            .then(() => {
                                return t.none(deleteClientFacul(client.idclient))
                                    .then(() => {
                                        const queries = client.facul.map(attribute => {
                                            return t.none(createClientFacul(client.idclient, attribute.id, attribute.value));
                                        });
                                        return t.batch(queries)
                                            .then(() => {
                                                const queriesContactNew = client.newcontacts.map(contact => {
                                                    const person = {
                                                        idclient: client.idclient,
                                                        prenom: contact.prenom,
                                                        nom: contact.nom,
                                                        idposte: contact.idposte,
                                                        titre: contact.titre,
                                                        num_tel_principal: contact.num_tel_principal,
                                                        ext_tel_principal: contact.ext_tel_principal,
                                                        mail: contact.mail,
                                                        estdecideur: contact.estdecideur
                                                    };

                                                    return t.one(getIdTitre(person.titre))
                                                        .then(titre => {
                                                            person.idtitre = titre.idtitre;
                                                            return t.one(createPerson(person))
                                                                .then(personCreated => {
                                                                    person.idpersonne = personCreated.idpersonne;
                                                                    return t.none(createContact(person));
                                                                });
                                                        });
                                                });

                                                const queriesContactUpdt = client.updtcontacts.map(contact => {
                                                    const person = {
                                                        idclient: client.idclient,
                                                        idpersonne: contact.idpersonne,
                                                        prenom: contact.prenom,
                                                        nom: contact.nom,
                                                        idposte: contact.idposte,
                                                        titre: contact.titre,
                                                        num_tel_principal: contact.num_tel_principal,
                                                        ext_tel_principal: contact.ext_tel_principal,
                                                        mail: contact.mail,
                                                        estdecideur: contact.estdecideur
                                                    };
                                                    return t.one(getIdTitre(person.titre))
                                                        .then(titre => {
                                                            person.idtitre = titre.idtitre;
                                                            return t.none(updatePerson(person))
                                                                .then(() => {
                                                                    return t.none(updateContact(person));
                                                                });
                                                        });
                                                });

                                                const queriesContactDel = client.delcontacts.map(contact => {
                                                    return t.none(deleteContact(contact.idpersonne, client.idclient))
                                                        .then(() => {
                                                            return t.none(deletePerson(contact.idpersonne));
                                                        });
                                                });
                                                return t.batch(queriesContactNew.concat(queriesContactUpdt.concat(queriesContactDel)));
                                            });
                                    });
                            });
                    });
            });
    })
        .then(() => {
            res.send({
                status: `success`,
                message: null
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Le client n'a pas pu être mis à jour'
            });
        });
    /*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/

    console.log(`end post /clients/update`);
});

// Squel request for getting the inactive state id
const getInactifState = () =>
    squel.select()
        .field(`idetat`)
        .from(`public."ETAT"`)
        .where(`libelleetat LIKE ?`, `Annulé`);

// Squel request for deletting (state changement) a client
const deleteClient = (idclient) =>
    squel.updateJoin({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .table(`public."CLIENT"`)
        .set(`idetat`, getInactifState())
        .where(`idclient = ?`, idclient)
        .toParam();

/**
 * Route deleting a client (changement of state)
 * @method DELETE
 * @URL /clients/:idclient
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.delete(`/:idClient`, expressJwtIp.ip(), function(req, res) {

    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	const _ip = res.locals.ip;

	if (!!decoded && (_ip === _ipReceived)) {*/

    console.log(`Starting /clients/:idClient`);
    const idClient = req.params.idClient;
    db.none(deleteClient(idClient))
        .then(() => {
            res.send({
                status: `success`,
                message: null
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Le client n'a pas pu être supprimé'
            });
        });
    /*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/

    console.log(`end delete /clients/:id`);
});


module.exports = router;
