const express = require(`express`);
const router = express.Router();
const db = require(`../models`);
const squel = require(`squel`);

/* GET home page. */
router.get(`/test2`, function(req, res) {

    db.query(squel.select()
        .from(`users."UTILISATEUR"`)
        .toString())
        .then(res => {
            console.log(`result`, res[0]);
        })
        .catch(e => {
            console.error(`query error`, e.message, e.stack);
        });

    res.send({
        name: `CRM First Application`,
        title: `welcome to the CRM team`,
        version: `0.0`,
        utilisateur: [{}]
    });

    console.log(`end get /test2`);
});

module.exports = router;
