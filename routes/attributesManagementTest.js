const express = require(`express`);
const router = express.Router();
const expressJwtIp = require(`express-jwt-ip`);

const getCustomerAttributesDBmock = true;
const getTypes = true;
const tokenValid = true;
const attributesExists = true;
const hideCustomerAttribute = false;
/***
 *
 * @param mock DB get customer : true
 * @returns  res true
 */
router.get(`/customerSuccess`, expressJwtIp.ip(), function(req, res) {
    console.log(`blablballbalballba`);
    if (getCustomerAttributesDBmock && tokenValid) {
        res.json({
            status: `success`
        });
    }
    else {
        res.json({
            status: `fail`
        });
    }
});

/***
 *
 * @param mock DB get customer : true
 * @returns  res true
 */
router.get(`/customerFail`, expressJwtIp.ip(), function(req, res) {

    if (!getCustomerAttributesDBmock) {
        res.json({
            status: `success`
        });
    }
    else {
        res.json({
            status: `fail`
        });
    }
});


/***
 *
 *
 * @param getTypes   tokenValid
 * @returns success
 */

router.get(`/typesSuccess`, expressJwtIp.ip(), function(req, res) {

    if (getTypes && tokenValid) {
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

/***
 *
 *
 * @param getTypes   tokenValid
 * @returns fail
 */
router.get(`/typesFail`, expressJwtIp.ip(), function(req, res) {

    if (!getTypes && !tokenValid) {
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


/***
 *
 *
 * @param post   createCustomer
 * @returns success
 */
router.post(`/create/customerSuccess`, expressJwtIp.ip(), function(req, res) {

    if (getCustomerAttributesDBmock && tokenValid) {
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

/***
 *
 *
 * @param post   createCustomer
 * @returns fail
 */
router.post(`/create/customerFail`, expressJwtIp.ip(), function(req, res) {

    if (!getCustomerAttributesDBmock && !tokenValid) {
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


/***
 *
 *
 * @param post   updateCustomer
 * @returns success
 */
router.post(`/update/customerSuccess`, expressJwtIp.ip(), function(req, res) {

    if (getCustomerAttributesDBmock && tokenValid) {
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

/***
 *
 *
 * @param post   updateCustomer
 * @returns fail
 */
router.post(`/update/customerFail`, expressJwtIp.ip(), function(req, res) {

    if (!getCustomerAttributesDBmock && !tokenValid) {
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


/***
 *
 *
 * @param post   updateCustomer
 * @returns success
 */
router.post(`/update/customer/displaySuccess`, expressJwtIp.ip(), function(req, res) {

    if (attributesExists && getCustomerAttributesDBmock && tokenValid) {
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

/***
 *
 *
 * @param post   updateCustomer
 * @returns fail
 */
router.post(`/update/customer/displayFail`, expressJwtIp.ip(), function(req, res) {

    if (!attributesExists && !getCustomerAttributesDBmock && !tokenValid) {
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

/***
 *
 *
 * @param post   customerSuccess     id
 * @returns success
 */

router.delete(`/customerSuccess/:id`, expressJwtIp.ip(), function(req, res) {
    console.log(`route DELETE positions/customer`);

    if (!hideCustomerAttribute && getCustomerAttributesDBmock && tokenValid) {
        res.send({
            status: `success`,
        });
    } else {
        res.send({
            status: `fail`,
        });
    }
});


/***
 *
 *
 * @param post   customerSuccess     id
 * @returns fail
 */

router.delete(`/customerFail/:id`, expressJwtIp.ip(), function(req, res) {
    console.log(`route DELETE positions/customer`);

    if (hideCustomerAttribute && !getCustomerAttributesDBmock && !tokenValid) {
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
