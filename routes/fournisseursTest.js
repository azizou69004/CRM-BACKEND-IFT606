const express = require(`express`);
const router = express.Router();
// Load the bcrypt module
const db = require(`../models`);
const squelb = require(`squel`);
const squel = squelb.useFlavour(`postgres`);
const jwt = require(`jsonwebtoken`);
const expressJwtIp = require(`express-jwt-ip`);


const tokenValid = true;
const selectFournisseur = true;
/**
 * Route serving Clients module
 * @method POST
 * @URL /fournisseurs
 * @param expressJwtIp.ip() server IP address
 * @DataParams {authorization} auth token
 * @SuccessResponse { status: 200, fournisseurs: {Array} }
 * @ErrorResponse { status: 'fail', message: 'Erreur' }
 * **/
router.post(`/fournisseursTest`, expressJwtIp.ip(), function(req, res) {

    if (tokenValid) {
        if (selectFournisseur) {
            res.json({status: `success`});
        } else {
            res.json({status: `fail`});
        }
        console.log(`end post /fournisseurs`);
    } else {
        res.json({status: `fail`});
    }
});


router.post(`/fournisseursTestFail`, expressJwtIp.ip(), function(req, res) {
    console.log(`tokenValid` + tokenValid);

    if (tokenValid) {
        if (!selectFournisseur) {
            res.json({status: `success`});
        } else {
            res.json({status: `fail`});
        }
        console.log(`end post /fournisseurs`);
    } else {
        res.json({status: `fail`});
    }
});


router.post(`/fournisseursTestFail2`, expressJwtIp.ip(), function(req, res) {

    if (!tokenValid) {
        if (!selectFournisseur) {
            res.json({status: `success`});
        } else {
            res.json({status: `fail`});
        }
        console.log(`end post /fournisseurs`);
    } else {
        res.json({status: `fail`});
    }
});

module.exports = router;
