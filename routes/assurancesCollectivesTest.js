'use strict';

const express = require(`express`);
const router = express.Router();
const expressJwtIp = require(`express-jwt-ip`);

const tokenIsvalid = true;
const responseFromBdValid = true;
/**
 * MOCK BD
 * MOCK TOKEN valid
 * **/
router.post(`/assurancesCollectivesTest`, expressJwtIp.ip(), function(req, res) {

    if (tokenIsvalid) {
        if (responseFromBdValid) {
            res.json({status: `success`});
        } else {
            res.json({status: `fail`});

        }
    } else {
        res.json({status: `fail`});

    }
});

/**
 * MOCK BD
 * MOCK invalid
 * **/
router.post(`/assurancesCollectivesTestIV`, expressJwtIp.ip(), function(req, res) {

    if (!tokenIsvalid) {
        if (responseFromBdValid) {
            res.json({status: `success`});
        } else {
            res.json({status: `fail`});

        }
    } else {
        res.json({status: `fail`});

    }
});

/**
 * MOCK BD  invalid
 * MOCK valid
 * **/
router.post(`/assurancesCollectivesTestIVBD`, expressJwtIp.ip(), function(req, res) {

    if (!tokenIsvalid) {
        if (responseFromBdValid) {
            res.json({status: `success`});
        } else {
            res.json({status: `fail`});

        }
    } else {
        res.json({status: `fail`});

    }
});

/**
 * Builds a Clients Array to send to Front-End
 *
 * @param entrepriseFromDB - DB response
 * @returns {Array} - Clients list (Shaped according to Front-end supported format)
 */

const buildClientsArray = (entrepriseFromDB) => {
    const clientsToSend = [];
    let client;
    let isProspect;
    let etat;

    entrepriseFromDB.forEach((entreprise) => {
        entreprise.prospect === true ? isProspect = `Oui` : isProspect = `Non`;
        entreprise.libelleetat === `Actif` ? etat = `Actif` : etat = `Annulé`;

        client = {
            id: entreprise.idclient,
            nom_groupe: entreprise.nomentp,
            responsable: entreprise.nomresp + `, ` + entreprise.prenomresp,
            date_creation: entreprise.date_creation,
            activite: entreprise.libelleactivite,
            mois_renouvellement: entreprise.renouvellement,
            no_police: entreprise.no_police,
            etat: etat,
            prospect: isProspect,
        };

        clientsToSend.push(client);
    });

    return clientsToSend;
};

module.exports = router;
