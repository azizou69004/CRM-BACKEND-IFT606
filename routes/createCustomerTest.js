const express = require(`express`);
const router = express.Router();
const expressJwtIp = require(`express-jwt-ip`);

const tokenValid = true;
const userCreated = true;
const userUpdated = true;
/* GET home page. */

/***
 *
 * @param req
 * @param res
 * mock token valid + BD requests
 * @returns
 */
router.post(`/getCustomerGridTest`, expressJwtIp.ip(), function(req, res) {

    if (tokenValid) {
        res.json({status: `success`});
    } else {
        res.json({status: `fail`});
    }
});
/***
 *
 * @param req
 * @param res
 * mock token valid + BD requests
 * @returns
 */
router.post(`/getCustomerGridNonvalid`, expressJwtIp.ip(), function(req, res) {

    if (!tokenValid) {
        res.json({status: `success`});
    } else {
        res.json({status: `fail`});
    }
});


/***
 *
 * @param req
 * @param res
 * mock token valid + BD requests userCreated
 * @returns
 */

router.post(`/createCustomerValidSuccess`, expressJwtIp.ip(), function(req, res) {
    if (tokenValid && userCreated) {
        res.status(200);
        res.json({status: `success`});
    } else {
        res.json({status: `fail`});
    }
});


/***
 *
 * @param req
 * @param res
 * mock token invalid + BD requests userCreated false
 * @returns
 */

router.post(`/createCustomerValidFail`, expressJwtIp.ip(), function(req, res) {
    if (!tokenValid && !userCreated) {
        res.status(200);
        res.json({status: `success`});
    } else {
        res.json({status: `fail`});
    }
});

/***
 *
 * @param req
 * @param res
 * mock token valid  + BD requests userupdated true
 * @returns
 */

router.post(`/updateCustomerSuccess`, expressJwtIp.ip(), function(req, res) {
    if (tokenValid && userUpdated) {

        res.status(200);
        res.json({status: `success`});
    } else {
        res.json({status: `fail`});
    }
});


/***
 *
 * @param req
 * @param res
 * mock token valid  + BD requests userupdated false
 * @returns
 */

router.post(`/updateCustomerFail`, expressJwtIp.ip(), function(req, res) {
    if (tokenValid && !userUpdated) {

        res.status(200);
        res.json({status: `success`});
    } else {
        res.json({status: `fail`});
    }
});

module.exports = router;
