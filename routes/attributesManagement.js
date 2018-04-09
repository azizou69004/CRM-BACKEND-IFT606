const express = require(`express`);
const router = express.Router();
const squelb = require(`squel`);
const squel = squelb.useFlavour(`postgres`);
const db = require(`../models/index`);
const expressJwtIp = require(`express-jwt-ip`);

const getCustomerAttributes = () =>
    squel.select()
        .from(`users."ENTREPRISE_AFFICHAGE"`, `aff`)
        .field(`aff.idattrentreprise`)
        .field(`posx`)
        .field(`posy`)
        .field(`height`)
        .field(`width`)
        .field(`minwidth`)
        .field(`libelletype`)
        //.field("type.forme", "secpattern")
        .field(`label`)
        .field(`description`)
        .field(`valeur_defaut`)
        .field(`ext`)
        .left_join(`public."ENTREPRISE_ATTR"`, `att`, `aff.idattrentreprise = att.idattrentreprise`)
        .left_join(`public."TYPE"`, `type`, `att.idtype = type.idtype`)
        .where(`affichage = true`)
        .toString();


const createCustomerAttribute = (attribute) =>
    squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .into(`public."ENTREPRISE_ATTR"`)
        .set(`idtype`, attribute.idtype)
        .set(`label`, attribute.label)
        .set(`description`, attribute.description)
        .set(`forme`, attribute.forme)
        .set(`valeur_defaut`, attribute.valeur_defaut)
        .set(`ext`, attribute.ext)
        .returning(`*`)
        .toParam();

const createCustomerDis = (attribute) =>
    squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .into(`users."ENTREPRISE_AFFICHAGE"`)
        .set(`idattrentreprise`, attribute.idattrentreprise)
        .set(`posx`, attribute.posx)
        .set(`posy`, attribute.posy)
        .set(`height`, attribute.height)
        .set(`width`, attribute.width)
        .set(`minwidth`, attribute.minwidth)
        .set(`affichage`, true)
        .toParam();

const hideCustomerAttribute = (idattribute) =>
    squel.update()
        .table(`users."ENTREPRISE_AFFICHAGE"`)
        .set(`affichage`, false)
        .where(`idattrentreprise = ` + idattribute)
        .toString();

const updateCustomerAttribute = (attribute) =>
    squel.update({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .table(`public."ENTREPRISE_ATTR"`)
        .set(`label`, attribute.label)
        .set(`description`, attribute.description)
        .set(`forme`, attribute.forme)
        .set(`valeur_defaut`, attribute.valeur_defaut)
        .set(`ext`, attribute.ext)
        .where(`idattrentreprise = ` + attribute.idattrentreprise)
        .toParam();

const updateCustomerAttributeDis = (attribute) =>
    squel.update()
        .table(`users."ENTREPRISE_AFFICHAGE"`)
        .set(`posx`, attribute.posx)
        .set(`posy`, attribute.posy)
        .set(`height`, attribute.height)
        .set(`width`, attribute.width)
        .set(`minwidth`, attribute.minwidth)
        .where(`idattrentreprise = ` + attribute.idattrentreprise)
        .toString();

const getTypes = () =>
    squel.select()
        .from(`public."TYPE"`)
        .field(`idtype`)
        .field(`libelletype`)
        .field(`forme`)
        .toString();

router.get(`/customer`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /positions/customer`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {

    db.any(getCustomerAttributes())
        .then((attributes) => {
            console.log(JSON.stringify(attributes));
            res.send({
                status: `success`,
                message: attributes
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Les attributs de l\'entreprise n\'ont pas pu être récupérés'
            });
        });
    //}
});

router.get(`/types`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /positions/type`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {

    db.any(getTypes())
        .then((types) => {
            console.log(JSON.stringify(types));
            res.send({
                status: `success`,
                message: types
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Les types disponibles n\'ont pas pu être récupérés'
            });
        });
    //}
});

router.post(`/create/customer`, expressJwtIp.ip(), function(req, res) {
    console.log(`route POST positions/create/customer`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {
    var attribute = {
        label: req.body.label,
        idtype: req.body.idtype,
        description: req.body.description,
        forme: req.body.forme,
        valeur_defaut: req.body.valeur_defaut,
        ext: req.body.ext,
        posx: req.body.posx,
        posy: req.body.posy,
        height: req.body.height,
        minwidth: req.body.minwidth,
        width: req.body.width
    };

    db.tx(function(t) {
        return t.one(createCustomerAttribute(attribute))
            .then((newAttribute) => {
                console.log(JSON.stringify(attribute));
                attribute.idattrentreprise = newAttribute.idattrentreprise;
                return t.none(createCustomerDis(attribute))
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
                message: error.toString() //'Le nouvel attribut de l\'entreprise n\'a pas pu être créé'
            });
        });

    //}
});

router.post(`/update/customer`, expressJwtIp.ip(), function(req, res) {
    console.log(`route POST positions/update/customer`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {

    var attribute = {
        idattrentreprise: req.body.id,
        label: req.body.label,
        description: req.body.description,
        forme: req.body.forme,
        valeur_defaut: req.body.valeur_defaut,
        ext: req.body.ext
    };
    console.log(attribute);
    console.log(updateCustomerAttribute(attribute));
    db.none(updateCustomerAttribute(attribute))
        .then(() => {
            res.send({
                status: `success`,
                message: null
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'L'attribut n\'a pas pu être mis à jour'
            });
        });

    //}
});

router.post(`/update/customer/display`, expressJwtIp.ip(), function(req, res) {
    console.log(`route POST positions/update/customer/display`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {
    var attributes = req.body.layout;
    db.tx(t => {
        const queries = attributes.map(attribute => {
            const newAttribute = {
                idattrentreprise: attribute.i,
                posx: attribute.x,
                posy: attribute.y,
                height: attribute.h,
                minwidth: attribute.minW,
                width: attribute.w
            };
            return t.none(updateCustomerAttributeDis(newAttribute));
        });
        return t.batch(queries);
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
                message: error.toString() //'La position des attributs n\'a pas pu être mise à jour'
            });
        });

    //}
});


router.delete(`/customer/:id`, expressJwtIp.ip(), function(req, res) {
    console.log(`route DELETE positions/customer`);
    /*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {
    const id = req.params.id;

    db.none(hideCustomerAttribute(id))
        .then(() => {
            res.send({
                status: `success`,
                message: null
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'L'attribut n\'a pas pu être supprimé'
            });
        });

    //}
});

// Squel request getting the facultative attributes of the provider
const getProviderAttributes = () =>
    squel.select()
        .from(`users."FOURNISSEUR_AFFICHAGE"`, `aff`)
        .field(`aff.idattrfournisseur`)
        .field(`posx`)
        .field(`posy`)
        .field(`height`)
        .field(`width`)
        .field(`minwidth`)
        .field(`libelletype`)
        //.field("type.forme", "secpattern")
        .field(`label`)
        .field(`description`)
        .field(`valeur_defaut`)
        .field(`ext`)
        .left_join(`public."FOURNISSEUR_ATTR"`, `att`, `aff.idattrfournisseur = att.idattrfournisseur`)
        .left_join(`public."TYPE"`, `type`, `att.idtype = type.idtype`)
        .where(`affichage = true`)
        .toString();

// Squel request creating a facultative attribute for the provider
const createProviderAttribute = (attribute) =>
    squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .into(`public."FOURNISSEUR_ATTR"`)
        .set(`idtype`, attribute.idtype)
        .set(`label`, attribute.label)
        .set(`description`, attribute.description)
        .set(`forme`, attribute.forme)
        .set(`valeur_defaut`, attribute.valeur_defaut)
        .set(`ext`, attribute.ext)
        .returning(`*`)
        .toParam();

// Squel request associating a position to a provider facultative attribute
const createProviderDis = (attribute) =>
    squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .into(`users."FOURNISSEUR_AFFICHAGE"`)
        .set(`idattrfournisseur`, attribute.idattrfournisseur)
        .set(`posx`, attribute.posx)
        .set(`posy`, attribute.posy)
        .set(`height`, attribute.height)
        .set(`width`, attribute.width)
        .set(`minwidth`, attribute.minwidth)
        .set(`affichage`, true)
        .toParam();

// Squel request hiding a provider facultative attribute
const hideProviderAttribute = (idattribute) =>
    squel.update()
        .table(`users."FOURNISSEUR_AFFICHAGE"`)
        .set(`affichage`, false)
        .where(`idattrfournisseur = ?`, idattribute)
        .toParam();

// Squel request updating a provider facultative attribute
const updateProviderAttribute = (attribute) =>
    squel.update({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .table(`public."FOURNISSEUR_ATTR"`)
        .set(`label`, attribute.label)
        .set(`description`, attribute.description)
        .set(`forme`, attribute.forme)
        .set(`valeur_defaut`, attribute.valeur_defaut)
        .set(`ext`, attribute.ext)
        .where(`idattrfournisseur = ?`, attribute.idattrfournisseur)
        .toParam();

//Squel request updating the position of a provider facultative attribute
const updateProviderAttributeDis = (attribute) =>
    squel.update()
        .table(`users."FOURNISSEUR_AFFICHAGE"`)
        .set(`posx`, attribute.posx)
        .set(`posy`, attribute.posy)
        .set(`height`, attribute.height)
        .set(`width`, attribute.width)
        .set(`minwidth`, attribute.minwidth)
        .where(`idattrfournisseur = ?`, attribute.idattrfournisseur)
        .toParam();

/**
 * Route getting the facultative attributes of a provider
 * @method GET
 * @URL /attributesManagement/provider
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: [ { idattrfournisseur, posx, posy, height, width, minwidth,
 * libelletype, label, description, valeur_defaut, ext } ] }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.get(`/provider`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /attributesManagement/provider`);
    /*var tokenReceived = req.get("authorization");
var secret = 'aplsszjknbndsj';
// decode
var decoded = jwt.decode(tokenReceived, secret);
var _ipReceived = decoded.ip;
var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {

    db.any(getProviderAttributes())
        .then((attributes) => {
            console.log(JSON.stringify(attributes));
            res.send({
                status: `success`,
                message: attributes
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Les attributs du fournisseur n\'ont pas pu être récupérés'
            });
        });
//}
});

/**
 * Route creating a facultative attribute for a provider
 * @method POST
 * @URL /attributesManagement/create/provider
 * @param expressJwtIp.ip() server IP address
 * @DataParams {label, idtype, description, forme, valeur_defaut, ext, posx, posy, height, minwidth, width} Attribute to be created
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.post(`/create/provider`, expressJwtIp.ip(), function(req, res) {
    console.log(`route POST /attributesManagement/create/provider`);
    /*var tokenReceived = req.get("authorization");
var secret = 'aplsszjknbndsj';
// decode
var decoded = jwt.decode(tokenReceived, secret);
var _ipReceived = decoded.ip;
var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {
    var attribute = {
        label: req.body.label,
        idtype: req.body.idtype,
        description: req.body.description,
        forme: req.body.forme,
        valeur_defaut: req.body.valeur_defaut,
        ext: req.body.ext,
        posx: req.body.posx,
        posy: req.body.posy,
        height: req.body.height,
        minwidth: req.body.minwidth,
        width: req.body.width
    };

    db.tx(function(t) {
        return t.one(createProviderAttribute(attribute))
            .then((newAttribute) => {
                console.log(JSON.stringify(attribute));
                attribute.idattrfournisseur = newAttribute.idattrfournisseur;
                return t.none(createProviderDis(attribute))
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
                message: error.toString() //'Le nouvel attribut de l\'entreprise n\'a pas pu être créé'
            });
        });

//}
});

/**
 * Route updating a facultative attribute for a provider
 * @method POST
 * @URL /attributesManagement/update/provider
 * @param expressJwtIp.ip() server IP address
 * @DataParams {idattrfournisseur, label, idtype, description, forme, valeur_defaut, ext} Attribute to be updated
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.post(`/update/provider`, expressJwtIp.ip(), function(req, res) {
    console.log(`route POST /attributesManagement/update/provider`);
    /*var tokenReceived = req.get("authorization");
var secret = 'aplsszjknbndsj';
// decode
var decoded = jwt.decode(tokenReceived, secret);
var _ipReceived = decoded.ip;
var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {

    var attribute = {
        idattrfournisseur: req.body.id,
        label: req.body.label,
        description: req.body.description,
        forme: req.body.forme,
        valeur_defaut: req.body.valeur_defaut,
        ext: req.body.ext
    };
    console.log(attribute);
    console.log(updateProviderAttribute(attribute));
    db.none(updateProviderAttribute(attribute))
        .then(() => {
            res.send({
                status: `success`,
                message: null
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'L'attribut n\'a pas pu être mis à jour'
            });
        });

//}
});

/**
 * Route updating the position of a facultative attribute for a provider
 * @method POST
 * @URL /attributesManagement/update/provider/display
 * @param expressJwtIp.ip() server IP address
 * @DataParams {idattrfournisseur, posx, posy, height, minwidth, width} Position to be updated
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.post(`/update/provider/display`, expressJwtIp.ip(), function(req, res) {
    console.log(`route POST /attributesManagement/update/provider/display`);
    /*var tokenReceived = req.get("authorization");
var secret = 'aplsszjknbndsj';
// decode
var decoded = jwt.decode(tokenReceived, secret);
var _ipReceived = decoded.ip;
var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {
    var attributes = req.body.layout;
    db.tx(t => {
        const queries = attributes.map(attribute => {
            const newAttribute = {
                idattrfournisseur: attribute.i,
                posx: attribute.x,
                posy: attribute.y,
                height: attribute.h,
                minwidth: attribute.minW,
                width: attribute.w
            };
            return t.none(updateProviderAttributeDis(newAttribute));
        });
        return t.batch(queries);
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
                message: error.toString() //'La position des attributs n\'a pas pu être mise à jour'
            });
        });

//}
});

/**
 * Route hiding a facultative attribute for a provider
 * @method DELETE
 * @URL /attributesManagement/provider/:id
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.delete(`/provider/:id`, expressJwtIp.ip(), function(req, res) {
    console.log(`route DELETE /attributesManagement/provider/:id`);
    /*var tokenReceived = req.get("authorization");
var secret = 'aplsszjknbndsj';
// decode
var decoded = jwt.decode(tokenReceived, secret);
var _ipReceived = decoded.ip;
var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {
    const id = req.params.id;

    db.none(hideProviderAttribute(id))
        .then(() => {
            res.send({
                status: `success`,
                message: null
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'L'attribut n\'a pas pu être supprimé'
            });
        });

//}
});

//Squel request getting the facultative attributes of a contract
const getContractAttributes = () =>
    squel.select()
        .from(`users."CONTRAT_COLLECTIF_AFFICHAGE"`, `aff`)
        .field(`aff.idattrcontratcoll`)
        .field(`posx`)
        .field(`posy`)
        .field(`height`)
        .field(`width`)
        .field(`minwidth`)
        .field(`libelletype`)
        //.field("type.forme", "secpattern")
        .field(`label`)
        .field(`description`)
        .field(`valeur_defaut`)
        .field(`ext`)
        .left_join(`public."CONTRAT_COLLECTIF_ATTR"`, `att`, `aff.idattrcontratcoll = att.idattrcontratcoll`)
        .left_join(`public."TYPE"`, `type`, `att.idtype = type.idtype`)
        .where(`affichage = true`)
        .toString();

//Squel request getting the menu positions for a contract
const getContractMenus = () =>
    squel.select()
        .from(`users."CONTRAT_COLLECTIF_AFFICHAGE_META"`, `aff`)
        .field(`aff.idcontratcollmenu`)
        .field(`posx`)
        .field(`posy`)
        .field(`height`)
        .field(`width`)
        .field(`minwidth`)
        .field(`minheight`)
        .field(`libellemenu`)
        .left_join(`users."CONTRAT_COLLECTIF_MENU"`, `menu`, `aff.idcontratcollmenu = menu.idcontratcollmenu`)
        .toString();

// Squel request creating a facultative attribute for the contract
const createContractAttribute = (attribute) =>
    squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .into(`public."CONTRAT_COLLECTIF_ATTR"`)
        .set(`idtype`, attribute.idtype)
        .set(`label`, attribute.label)
        .set(`description`, attribute.description)
        .set(`forme`, attribute.forme)
        .set(`valeur_defaut`, attribute.valeur_defaut)
        .set(`ext`, attribute.ext)
        .returning(`*`)
        .toParam();

// Squel request associating a position to a contract facultative attribute
const createContractDis = (attribute) =>
    squel.insert({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .into(`users."CONTRAT_COLLECTIF_AFFICHAGE"`)
        .set(`idattrcontratcoll`, attribute.idattrcontratcoll)
        .set(`posx`, attribute.posx)
        .set(`posy`, attribute.posy)
        .set(`height`, attribute.height)
        .set(`width`, attribute.width)
        .set(`minwidth`, attribute.minwidth)
        .set(`affichage`, true)
        .toParam();

// Squel request hiding a contract facultative attribute
const hideContractAttribute = (idattribute) =>
    squel.update()
        .table(`users."CONTRAT_COLLECTIF_AFFICHAGE"`)
        .set(`affichage`, false)
        .where(`idattrcontratcoll = ?`, idattribute)
        .toParam();

// Squel request updating a contract facultative attribute
const updateContractAttribute = (attribute) =>
    squel.update({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
        .table(`public."CONTRAT_COLLECTIF_ATTR"`)
        .set(`label`, attribute.label)
        .set(`description`, attribute.description)
        .set(`forme`, attribute.forme)
        .set(`valeur_defaut`, attribute.valeur_defaut)
        .set(`ext`, attribute.ext)
        .where(`idattrcontratcoll = ?`, attribute.idattrcontratcoll)
        .toParam();

//Squel request updating the position of a contract facultative attribute
const updateContractAttributeDis = (attribute) =>
    squel.update()
        .table(`users."CONTRAT_COLLECTIF_AFFICHAGE"`)
        .set(`posx`, attribute.posx)
        .set(`posy`, attribute.posy)
        .set(`height`, attribute.height)
        .set(`width`, attribute.width)
        .set(`minwidth`, attribute.minwidth)
        .where(`idattrcontratcoll = ?`, attribute.idattrcontratcoll)
        .toParam();

//Squel request updating the position of a contract facultative menu
const updateContractMenuDis = (attribute) =>
    squel.update()
        .table(`users."CONTRAT_COLLECTIF_AFFICHAGE_META"`)
        .set(`posx`, attribute.posx)
        .set(`posy`, attribute.posy)
        .set(`height`, attribute.height)
        .set(`width`, attribute.width)
        .set(`minwidth`, attribute.minwidth)
        .set(`minheight`, attribute.minheight)
        .where(`idcontratcollmenu = ?`, attribute.idcontratcollmenu)
        .toParam();

/**
 * Route getting the facultative attributes of a contract
 * @method GET
 * @URL /attributesManagement/contract
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: [ { idattrfournisseur, posx, posy, height, width, minwidth,
 * libelletype, label, description, valeur_defaut, ext }, { idcontratcollmenu, posx, posy, height, width, minwidth,
 * libellemenu } ] }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.get(`/contract`, expressJwtIp.ip(), function(req, res) {
    console.log(`route GET /attributesManagement/contract`);
    /*var tokenReceived = req.get("authorization");
var secret = 'aplsszjknbndsj';
// decode
var decoded = jwt.decode(tokenReceived, secret);
var _ipReceived = decoded.ip;
var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {

    db.any(getContractAttributes())
        .then((attributes) => {
            db.any(getContractMenus())
                .then((menus) => {
                    console.log(JSON.stringify(attributes));
                    console.log(JSON.stringify(menus));

                    res.send({
                        status: `success`,
                        message: {
                            "menus": menus,
                            "attributes": attributes
                        }
                    });
                })
                .catch(error => {
                    res.send({
                        status: `fail`,
                        message: error.toString() //'Les attributs du contrat n\'ont pas pu être récupérés'
                    });
                });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'Les attributs du contrat n\'ont pas pu être récupérés'
            });
        });
//}
});

/**
 * Route creating a facultative attribute for a contract
 * @method POST
 * @URL /attributesManagement/create/contract
 * @param expressJwtIp.ip() server IP address
 * @DataParams {label, idtype, description, forme, valeur_defaut, ext, posx, posy, height, minwidth, width} Attribute to be created
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.post(`/create/contract`, expressJwtIp.ip(), function(req, res) {
    console.log(`route POST /attributesManagement/create/contract`);
    /*var tokenReceived = req.get("authorization");
var secret = 'aplsszjknbndsj';
// decode
var decoded = jwt.decode(tokenReceived, secret);
var _ipReceived = decoded.ip;
var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {
    var attribute = {
        label: req.body.label,
        idtype: req.body.idtype,
        description: req.body.description,
        forme: req.body.forme,
        valeur_defaut: req.body.valeur_defaut,
        ext: req.body.ext,
        posx: req.body.posx,
        posy: req.body.posy,
        height: req.body.height,
        minwidth: req.body.minwidth,
        width: req.body.width
    };

    db.tx(function(t) {
        return t.one(createContractAttribute(attribute))
            .then((newAttribute) => {
                console.log(JSON.stringify(attribute));
                attribute.idattrcontratcoll = newAttribute.idattrcontratcoll;
                return t.none(createContractDis(attribute))
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
                message: error.toString() //'Le nouvel attribut de l\'entreprise n\'a pas pu être créé'
            });
        });

//}
});

/**
 * Route updating a facultative attribute for a contract
 * @method POST
 * @URL /attributesManagement/update/contract
 * @param expressJwtIp.ip() server IP address
 * @DataParams {idattrcontratcoll, label, idtype, description, forme, valeur_defaut, ext} Attribute to be updated
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.post(`/update/contract`, expressJwtIp.ip(), function(req, res) {
    console.log(`route POST /attributesManagement/update/contract`);
    /*var tokenReceived = req.get("authorization");
var secret = 'aplsszjknbndsj';
// decode
var decoded = jwt.decode(tokenReceived, secret);
var _ipReceived = decoded.ip;
var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {

    var attribute = {
        idattrcontratcoll: req.body.id,
        label: req.body.label,
        description: req.body.description,
        forme: req.body.forme,
        valeur_defaut: req.body.valeur_defaut,
        ext: req.body.ext
    };
    console.log(attribute);
    db.none(updateContractAttribute(attribute))
        .then(() => {
            res.send({
                status: `success`,
                message: null
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'L'attribut n\'a pas pu être mis à jour'
            });
        });

//}
});

/**
 * Route updating the position of a facultative attribute for a contract
 * @method POST
 * @URL /attributesManagement/update/contract/display
 * @param expressJwtIp.ip() server IP address
 * @DataParams {idattrcontratcoll, posx, posy, height, minwidth, width} Position to be updated
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.post(`/update/contract/display`, expressJwtIp.ip(), function(req, res) {
    console.log(`route POST /attributesManagement/update/contract/display`);
    /*var tokenReceived = req.get("authorization");
var secret = 'aplsszjknbndsj';
// decode
var decoded = jwt.decode(tokenReceived, secret);
var _ipReceived = decoded.ip;
var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {
    var attributes = req.body.layout;
    var menus = req.body.menus;
    db.tx(t => {
        const queries = attributes.map(attribute => {
            const newAttribute = {
                idattrcontratcoll: attribute.i,
                posx: attribute.x,
                posy: attribute.y,
                height: attribute.h,
                minwidth: attribute.minW,
                width: attribute.w
            };
            return t.none(updateContractAttributeDis(newAttribute));
        });

        const menuQueries = menus.map(attribute => {
            const newAttribute = {
                idcontratcollmenu: attribute.i,
                posx: attribute.x,
                posy: attribute.y,
                height: attribute.h,
                minwidth: attribute.minW,
                width: attribute.w,
                minheight: attribute.minH
            };
            return t.none(updateContractMenuDis(newAttribute));
        });
        return t.batch(queries.concat(menuQueries));
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
                message: error.toString() //'La position des attributs n\'a pas pu être mise à jour'
            });
        });

//}
});

/**
 * Route hiding a facultative attribute for a contract
 * @method DELETE
 * @URL /attributesManagement/contract/:id
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.delete(`/contract/:id`, expressJwtIp.ip(), function(req, res) {
    console.log(`route DELETE /attributesManagement/contract/:id`);
    /*var tokenReceived = req.get("authorization");
var secret = 'aplsszjknbndsj';
// decode
var decoded = jwt.decode(tokenReceived, secret);
var _ipReceived = decoded.ip;
var _ip = res.locals.ip;*/

    //if (!!decoded && (_ip === _ipReceived)) {
    const id = req.params.id;

    db.none(hideContractAttribute(id))
        .then(() => {
            res.send({
                status: `success`,
                message: null
            });
        })
        .catch(error => {
            res.send({
                status: `fail`,
                message: error.toString() //'L'attribut n\'a pas pu être supprimé'
            });
        });

//}
});

/*db.multi(getUserById(id) + ";" + getEntitiesDisplayed())
	.spread((attributes) => {
		console.log(JSON.stringify(userRetrieved));
		console.log(JSON.stringify(entities));
		res.status(200);
		// We retrieve all of the permissions of a user
		var permissions = buildPermissions(userRetrieved, entities);
		var resp = {
			id: userRetrieved[0].iduser,
			login: userRetrieved[0].login,
			mail: userRetrieved[0].mail,
			name: userRetrieved[0].nom,
			lastname: userRetrieved[0].prenom,
			role: userRetrieved[0].roledesc,
			titre : userRetrieved[0].libelletitre,
			userPerms: permissions
		};

		res.send({
			status: 'success',
			message: resp
		});
	})
	.catch(error => {
		console.log('ERROR:', error);
	})
}
else {
res.send({
	status: 'fail',
	message: 'Erreur'
});

}*/

module.exports = router;
