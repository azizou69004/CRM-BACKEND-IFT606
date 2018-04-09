var express = require('express');
var router = express.Router();
var squelb = require('squel');
var squel = squelb.useFlavour('postgres');
var db = require('../models/index');
var express = require('express');
var security = require('../security/security');
var jwt = require('jsonwebtoken');
var expressJwtIp = require('express-jwt-ip');

// Create an update-join method for squel
squel.updateJoin = function (options) {
    return squel.update(options, [
        new squel.cls.StringBlock(options, 'UPDATE'),
        new squel.cls.UpdateTableBlock(options),
        new squel.cls.SetFieldBlock(options),
        new squel.cls.FromTableBlock(options),
        new squel.cls.JoinBlock(options),
        new squel.cls.WhereBlock(options),
        new squel.cls.OrderByBlock(options),
        new squel.cls.LimitBlock(options),
    ]);
};

// Squel request for getting the chambers of commerce available
let getChambersOfCommerce = () =>
    squel.select()
        .from('public."CHAMBRE_COMMERCE"')
        .field("idchambrecommerce")
        .field("libellechambrecommerce")
        .toString();

/**
 * Route getting chambers of commerce available
 * @method GET
 * @URL /clients/aga
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: [ { idchambrecommerce, libellechambrecommerce } ] }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.get('/aga', expressJwtIp.ip(), function (req, res) {
    console.log('route GET /aga');
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
                status: 'success',
                message: chambers
            });
        })
        .catch(error => {
            res.send({
                status: 'fail',
                message: error.toString() //'Les chambres de commerce disponibles n\'ont pas pu être récupérées'
            });
        })
    /*} else {
        res.status(403);
        sendResponse('Acces refusé', res, 'fail')
    }*/
});

let getEmployes = () =>
    squel.select()
        .from('users."EMPLOYE_INT"', 'emp')
        .left_join('public."PERSONNE"', 'pers', 'emp.idpersonne = pers.idpersonne')
        .field('emp.idemploye')
        .field('pers.nom')
        .field('pers.prenom')
        .toString();

router.get('/employesafc', expressJwtIp.ip(), function (req, res) {
    console.log('route /employesafc');
//on veut renvoyer {idemploye, nom, prenom}
    console.log(getEmployes());
    db.any(getEmployes())
        .then((response) => {
            console.log(response);
            res.send({
                status: 'success',
                message: response
            });
        })
        .catch(error => {
            res.send({
                status: 'fail',
                message: error.toString() //'Les employés de AFC n\'ont pas pu être récupérées'
            })
        });

});


let getModulesAndModalites = () =>
    squel.select()
        .from('public."MODALITE"', 'modalite')
        .left_join('public."DOMAINE_ASSURANCE"', 'domassu', 'domassu.iddomaineass = modalite.iddomaineass')
        .field('domassu.iddomaineass')
        .field('modalite.description')
        .field('domassu.libelledomaine')
        .field('modalite.idmodalite')
        .field('modalite.libelleavantage');

let addModalitesValues = () =>
    squel.select()
        .from(getModulesAndModalites(), 'modmod')
        .left_join('public."VALEUR_MODALITE_CONTRAT"', 'vmc', 'vmc.idmodalite = modmod.idmodalite')
        .left_join('public."MODALITES_VALEUR"', 'valmod', 'valmod.idmodvaleur = vmc.idmodvaleur')
        .field('modmod.iddomaineass')
        .field('modmod.libelledomaine')
        .field('modmod.idmodalite')
        .field('modmod.libelleavantage')
        .field('modmod.description')
        .field('valmod.idmodvaleur')
        .field('valmod.valeur')
        .toString();

//ne pas oublier de rajouter les description qd c tt bon
//a verifier
function buildModulesObject(modules) {
    let object = [];
    modules.forEach(element => {
        let containsModule = false;
        let containsModalite = false;
        let containsValeur = false;
        let indexModule = null;
        let indexModalite = null;
        object.forEach((obj, index) => {
            if (parseInt(element.iddomaineass) === parseInt(obj.idModule)) {
                indexModule = index;
                containsModule = true;
                obj.modalites.forEach((eachMod, indMod) => {
                    if (parseInt(element.idmodalite) === parseInt(eachMod.idModalite)) {
                        containsModalite = true;
                        indexModalite = indMod;
                        eachMod.valeurs.forEach((eachVal, indVal) => {
                            if (parseInt(element.idvaleur) === parseInt(eachVal.idValeur)) {
                                containsValeur = true;

                            }
                        })
                    }
                });
            }
        });
        if (!containsModule) {
            let valeurs = [{idValeur: element.idmodvaleur, label: element.valeur}];
            let modalites = [{idModalite: element.idmodalite, nom: element.libelleavantage, valeurs: valeurs, description:element.description}];
            object.push({nom: element.libelledomaine, idModule: element.iddomaineass, modalites: modalites});
        }
        if (containsModule && !containsModalite) {
            let valeurs2 = [{idValeur: element.idmodvaleur, label: element.valeur}];
            let modalites2 = {idModalite: element.idmodalite, nom: element.libelleavantage, valeurs: valeurs2, description:element.description};
            //push la modalite pour le bon module
            object[indexModule].modalites.push(modalites2);
        }
        if (containsModule && containsModalite && !containsValeur) {
            let valeurs3 = {idValeur: element.idmodvaleur, label: element.valeur};
            object[indexModule].modalites[indexModalite].valeurs.push(valeurs3);
        }
    });
    return object;

}

router.get('/modules', expressJwtIp.ip(), function (req, res) {
    console.log('route /modules');
    let getModules = addModalitesValues();
    console.log(getModules);
    db.any(getModules)
        .then((modules) => {
            let JSONToReturn = buildModulesObject(modules);
            res.send({
                status: 'success',
                message: JSONToReturn
            });
        })
        .catch(error => {
            res.send({
                status: 'fail',
                message: error.toString() //'Les chambres de commerce disponibles n\'ont pas pu être récupérées'
            })
        });
});

/**
 * Route serving Contract module
 * @method GET
 * @URL /collectiveContracts
 * @param expressJwtIp.ip() server IP address
 * @DataParams {authorization} Auth token
 * @SuccessResponse { status: 200, message: {Array} }
 * @ErrorResponse { status: 'fail', message: 'Erreur' }
 * **/
router.get('/', expressJwtIp.ip(), function (req, res) {

    /*var tokenReceived = req.get("authorization");
    var secret = 'aplsszjknbndsj';
    // decode
    var decoded = jwt.decode(tokenReceived, secret);
    var _ipReceived = decoded.ip;
    const _ip = res.locals.ip;

    let clients;

    if (!!decoded && (_ip === _ipReceived)) {*/
    console.log(getContractsListRequest());
    // TODO: Refactor query
    db.any(getContractsListRequest())
        .then(function (contracts) {

            contractsMess = buildContractsArray(contracts);
            res.status(200);
            res.send({
                status: "success",
                message: contractsMess
            });
        })
        .catch(error => {
            console.log('ERROR:', error);
        });
    /*} else {
        res.send({
            status: 'fail',
            message: 'Erreur'
        });
    }*/

    console.log("end post /assurancesCollectives");
});

/**
 * Builds a Clients Array to send to Front-End
 *
 * @param entrepriseFromDB - DB response
 * @returns {Array} - Clients list (Shaped according to Front-end supported format)
 */
const buildContractsArray = (contractsFromDB) => {
    let contractsToSend = [];
    let contract;

    contractsFromDB.forEach((contract) => {
        console.log(JSON.stringify(contract));
        contract = {
            idcontrat: contract.idcontrat,
            nom_fournisseur: contract.nomfourn,
            nom_client: contract.nomclient,
            date_signature: contract.date_signature,
            mois_renouvellement: contract.mois_renouvellement,
            police: contract.police,
            idclient: contract.idclient,
            idfournisseur: contract.idfournisseur
        };

        contractsToSend.push(contract);
    });

    return contractsToSend;
};

/**
 * Function returning the total for all years of a pay History
 * @param payHistory - History of payments
 * @returns {Integer} - Total
 */
const getGtotal = (payHistory) => {
	console.log(payHistory);
	let gtotal = 0;
	for(var i = 0; i < payHistory.length; i++) {
		gtotal+=Number(payHistory[i].rémunération_totale);
	}
	return gtotal;
}

/**
 * Returns SQL String to getClientsList
 *
 * @returns {String} - SQL Query
 */
const getContractsListRequest = () => {
    return squel.select()
        .from('public."CONTRAT"', 'contrat')
        .field('contrat.idcontrat', 'idcontrat')
        .field('contrat.date_signature', 'date_signature')
        .field('contrat.police', 'police')
        .field('contrat.mois_renouvellement', 'mois_renouvellement')
        .field('fourn.idfournisseur', 'idfournisseur')
        .field('client.idclient', 'idclient')
        .field('fourn.nom', 'nomfourn')
        .field('ent.nom', 'nomclient')
        .left_join('public."CONTRAT_COLLECTIF"', "coll", "contrat.idcontrat = coll.idcontrat")
        .left_join('public."CLIENT"', "client", "client.idclient = contrat.idclient")
        .left_join('public."ENTREPRISE"', "ent", "client.idclient = ent.idclient")
        .left_join('public."FOURNISSEUR"', "fourn", "fourn.idfournisseur = contrat.idfournisseur")
        /*.group('client.idclient')
        .group('entreprise.nom')
        .group('entreprise.date_creation')
        .group('activite.libelleactivite')
        .group('etat.libelleetat')
        .group('p.nom', 'nomresp')
        .group('p.prenom', 'prenomresp')
        .group('ctt.mois_renouvellement', 'renouvellement')
        .group('ctt.police', 'police')
        .group('f.nom', 'fnom')*/
        .toString();
};

/**
 * Route serving specific Contract
 * @method GET
 * @URL /collectiveContracts/:id
 * @param expressJwtIp.ip() server IP address
 * @DataParams {authorization} auth token
 * @SuccessResponse { status: 200, client(selected by id) }
 * @ErrorResponse { status: 'fail', message: 'Erreur' }
 * **/
router.get('/:idContract', expressJwtIp.ip(), function (req, res) {

    /*var tokenReceived = req.get("authorization");
    var secret = 'aplsszjknbndsj';
    // decode
    var decoded = jwt.decode(tokenReceived, secret);
    var _ipReceived = decoded.ip;
    const _ip = res.locals.ip;*/

    let wantedContractRows;
    let rateHistory;
    let payHistory;
    let modalities;

    //if (!!decoded && (_ip === _ipReceived)) {

		console.log("Starting /contracts/:idContract");
		let idContract = req.params.idContract;
		
		db.one(getObligatoryContractRowsById(idContract))
			.then((obligatoryRow) => {
				
				if (!!obligatoryRow.date_signature) {
					let date = new Date(obligatoryRow.date_signature);
					obligatoryRow.date_signature = date.toLocaleDateString("fr-FR");
				}
				
				let idClient = obligatoryRow.idclient;
				let idProvider = obligatoryRow.idfournisseur;
				db.multi(getOptionnalContractRowsById(idContract) + ";" 
						+ getContractModalitiesById(idContract) + ";"
						+ getContractRateHistoryById(idClient, idProvider) + ";" 
						+ getContractPayHistoryById(idClient, idProvider))
				.then((optionnalRows) => {
					console.log("requêtes effectuées");
					wantedContractRows = buildContractFaculObject(optionnalRows[0]);
					rateHistory = optionnalRows[2];
					payHistory = optionnalRows[3];
					modalities = buildContractModalObject(optionnalRows[1]);
					
					if (!!rateHistory.recu) {
						let date = new Date(rateHistory.recu);
						rateHistory.recu = date.toLocaleDateString("fr-FR");
					}
					
					if (!!rateHistory.dpaye) {
						let date = new Date(rateHistory.dpaye);
						rateHistory.dpaye = date.toLocaleDateString("fr-FR");
					}
					
					let gtotal = getGtotal(payHistory);
					let payHistoryGlob = {
							history : payHistory,
							gtotal : gtotal
					};
					
					obligatoryRow.facultatif = wantedContractRows;
					obligatoryRow.remuneration = payHistoryGlob;
					obligatoryRow.historique_taux = rateHistory;
					obligatoryRow.souscriptions = modalities;
						
					res.status(200);
					sendResponse(obligatoryRow, res, 'success');
				})
				.catch(error => {
					console.log('ERROR:', error);
					res.status(404);
					sendResponse('NOT FOUND', res, 'fail')
				});
			})
			.catch(error => {
				console.log('ERROR:', error);
				res.status(404);
				sendResponse('NOT FOUND', res, 'fail')
			});
	/*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/

});

// Build optionnal values for a contract, in order to serve them
const buildContractFaculObject = (optionnalRows) => {
    let contractRowsToReturn = [];
    let columnName;
    let columnValue;
    let contractRow = {};

    optionnalRows.forEach((optionnalRow) => {
        contractRow = {
            idRow: optionnalRow.idattr
        };
        columnName = optionnalRow.label;
        columnValue = optionnalRow.valeur;
        columnTemp = optionnalRow.forme_type;
        columnType = optionnalRow.type;
        columnDesc = optionnalRow.description;
        columnDefault = optionnalRow.valeur_defaut;
        contractRow["nom"] = columnName;
        contractRow["valeur"] = columnValue;
        contractRow["description"] = columnDesc;
        //A déterminer si on en a besoin ou non, suivant le traitement effectué en front-end
        contractRow["type"] = columnType;
        contractRow["forme"] = columnTemp;
        contractRow["defaut"] = columnDefault;

        contractRowsToReturn.push(contractRow);
    });

    return contractRowsToReturn;
};

//Build modalities objects for a contract, in order to serve them
const buildContractModalObject = (modalities) => {
    
	let modalitiesOrganized = [];
	modalities.forEach((modality) => {
		let moduleId = modality.idmodule;
		let modalityId = modality.idmodalite;
		if (!(!!modalitiesOrganized[moduleId])) {
			modalitiesOrganized[moduleId] = {};
			modalitiesOrganized[moduleId].libelle = modality.libelledomaine;
			modalitiesOrganized[moduleId].id = modality.idmodule;
			modalitiesOrganized[moduleId].module_notes = modality.module_notes;
			modalitiesOrganized[moduleId].subscriptions = [];
        }
		modalityOrganized = {};
		modalityOrganized.libelle = modality.libelleavantage;
		modalityOrganized.id = modality.idmodalite;
		modalityOrganized.souscription_notes = modality.souscription_notes;
		modalityOrganized.description = modality.description;
		modalityOrganized.ext = modality.ext;
		if (modality.valeur_principale == "Autres") {
			modalityOrganized.valeur = modality.valeur_complémentaire;	
		} else {
			modalityOrganized.valeur = modality.valeur_principale;
		}
		modalitiesOrganized[moduleId].subscriptions.push(modalityOrganized);
	});
	
	let data = [];
	modalitiesOrganized.forEach((module) => {
		data.push(module);
	})

    return data;
};

const getContractById = (idContract) => {
};

// Squel request getting the optionnal attributes of a specific contract
const getOptionnalContractRowsById = (idContract) => {
    return squel.select()
        .field(`label`)
        .field(`valeur`)
        .field(`attr.description`, `description`)
        .field(`type.libelletype`, `type`)
        .field(`type.forme`, `forme_type`)
        .field(`attr.valeur_defaut`, `valeur_defaut`)
        .field(`facul.idattrcontratcoll`, `idattr`)
        .from(`"CONTRAT"`, `contr`)
        .join(`"CONTRAT_COLLECTIF_FACUL"`, `facul`, `contr.idcontrat = facul.idcontrat`)
        .left_join(`"CONTRAT_COLLECTIF_ATTR"`, `attr`, `attr.idattrcontratcoll = facul.idattrcontratcoll`)
        .left_join(`"TYPE"`, `type`, `type.idtype = attr.idtype`)
        .where(`contr.idcontrat = ?`, idContract)
        .toString();
};

// Squel request getting the obligatory attributes of a specific contract
const getObligatoryContractRowsById = (idContract) => {
	return squel.select()
		.field(`contr.idcontrat`, `idcontrat`)
		.field(`date_signature`)
		.field(`mois_renouvellement`)
		.field(`police`)
		.field(`notes`)
		.field(`persemp.idpersonne`, `idrepresentant`)
		.field(`persemp.nom`, `nomrepresentant`)
		.field(`persemp.prenom`, `prenomrepresentant`)
		.field(`fourn.idfournisseur`, `idfournisseur`)
		.field(`fourn.nom`, `nomfournisseur`)
		.field(`entr.idclient`, `idclient`)
		.field(`contr.idrepresentant`, `idrepresentant`)
		.field(`entr.nom`, `nomclient`)
		.field(`aga.libellechambrecommerce`, `libellechambrecommerce`)
		.from(`"CONTRAT"`, `contr`)
		.left_join(`public."CONTRAT_COLLECTIF"`, `contrcoll`, `contr.idcontrat = contrcoll.idcontrat`)
		.left_join(`public."FOURNISSEUR"`, `fourn`, `fourn.idfournisseur = contr.idfournisseur`)
		.left_join(`public."ENTREPRISE"`, `entr`, `entr.idclient = contr.idclient`)
		.left_join(`public."CHAMBRE_COMMERCE"`, `aga`, `aga.idchambrecommerce = contr.idchambrecommerce`)
		.left_join(`users."EMPLOYE_INT"`, `emp`, `contr.idrepresentant = emp.idemploye`)
		.left_join(`public."PERSONNE"`, `persemp`, `persemp.idpersonne = emp.idpersonne`)
		.where(`contr.idcontrat = ?`, idContract)
		.toString();
};

//Squel request getting the modalities of a specific contract
const getContractModalitiesById = (idContract) => {
    return squel.select()
        .field(`modu.idmodule`, `idmodule`)
        .field(`dom_ass.libelledomaine`, `libelledomaine`)
        .field(`sousc.valeur`, `valeur_complémentaire`)
        .field(`sousc.notes`, `souscription_notes`)
        .field(`modu.notes`, `module_notes`)
        .field(`mod_val.valeur`, `valeur_principale`)
        .field(`mod_val.idmodvaleur`, `id_mod_valeur_principale`)
        .field(`moda.idmodalite`, `idmodalite`)
        .field(`moda.libelleavantage`, `libelleavantage`)
        .field(`moda.description`, `description`)
        .field(`moda.ext`, `ext`)
        .field(`type.libelletype`, `libelletype`)
        .field(`dom_ass.libelledomaine`, `libelledomaine`)
        .from(`public."MODULE"`, `modu`)
        .left_join(`public."DOMAINE_ASSURANCE"`, `dom_ass`, `modu.iddomaineass = dom_ass.iddomaineass`)
        .left_join(`public."SOUSCRIPTIONS"`, `sousc`, `sousc.idmodule = modu.idmodule`)
        .left_join(`public."MODALITE"`, `moda`, `moda.idmodalite = sousc.idmodalite`)
        .left_join(`public."TYPE"`, `type`, `type.idtype = moda.idtype`)
        .left_join(`public."MODALITES_VALEUR"`, `mod_val`, `mod_val.idmodvaleur = sousc.idmodvaleur`)
        .where(`modu.idcontrat = ?`, idContract)
        .toString();
};

//Squel request getting the rate history of a specific contract
const getContractRateHistoryById = (idClient, idProvider) => {
    return squel.select()
        .field(`annee_dep`)
        .field(`annee_fin`)
        .field(`nb_employe`, `nombre_employés`)
        .field(`diff`, `différence`)
        .field(`vie`, `vie`)
        .field(`dma`, `dma`)
        .field(`pac`, `pac`)
        .field(`ct`, `ct`)
        .field(`lt`, `lt`)
        .field(`amc_ind`, `amc_ind`)
        .field(`amc_mono`, `amc_mono`)
        .field(`amc_couple`, `amc_couple`)
        .field(`amc_fam`, `amc_fam`)
        .field(`dent_ind`, `dentaire_ind`)
        .field(`dent_mono`, `dentaire_mono`)
        .field(`dent_couple`, `dentaire_couple`)
        .field(`dent_fam`, `dentaire_fam`)
        .field(`mg_ind`, `mg_ind`)
        .field(`mg_mono`, `mg_mono`)
        .field(`mg_couple`, `mg_couple`)
        .field(`mg_fam`, `mg_fam`)
        .field(`pae`, `pae`)
        .field(`prime_ms`, `prime_mensuelle`)
        .field(`prime_an`, `prime_annuelle`)
        .from(`public."HISTORIQUE_TAUX"`, `hist`)
        .where(`idclient = ? and idfournisseur = ?`, idClient, idProvider)
        .toString();
};

//Squel request getting the pay history of a specific contract
const getContractPayHistoryById = (idClient, idProvider) => {
    return squel.select()
        .field(`annee_dep`)
        .field(`annee_fin`)
        .field(`vie`, `vie_dma_pac`)
        .field(`ct`, `ct`)
        .field(`lt`, `lt`)
        .field(`amc`, `amc`)
        .field(`dent`, `dentaire`)
        .field(`mg`, `mg`)
        .field(`pae`, `pae`)
        .field(`to_char(recu, 'YYYY-MM-DD')`, `date_payée_base`)
        .field(`base`, `montant_payé_base`)
        .field(`boni`, `montant_payé_boni`)
        .field(`split`, `pourcentage_payable_en_pourcent`)
        .field(`bdu`, `montant_dû`)
        .field(`paye`, `montant_payé`)
        .field(`total`, `rémunération_totale`)
        .field(`to_char(dpaye, 'YYYY-MM-DD')`, `date_payée`)
        .field(`notes`)
        .field(`sol`, `solde`)
        .field(`pers.idpersonne`, `idconseiller`)
        .field(`pers.nom`, `nomconseiller`)
        .field(`pers.prenom`, `prenomconseiller`)
        .from(`public."REMUNERATION"`, `hist`)
        .left_join(`users."EMPLOYE_INT"`, `emp`, `emp.idemploye = hist.conseiller`)
        .left_join(`public."PERSONNE"`, `pers`, `emp.idpersonne = pers.idpersonne`)
        .where(`idclient = ? and idfournisseur = ?`, idClient, idProvider)
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
}

// Squel request creating a remuneration for a contract
let createRemunerations = (remuneration) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into(`public."REMUNERATION"`)
.set(`idclient`, remuneration.idclient)
.set(`idfournisseur`, remuneration.idfournisseur)
.set(`annee_dep`, remuneration.annee_dep)
.set(`annee_fin`, remuneration.annee_fin)
.set(`vie`, remuneration.vie)
.set(`ct`, remuneration.ct)
.set(`lt`, remuneration.lt)
.set(`amc`, remuneration.amc)
.set(`dent`, remuneration.dentaire)
.set(`mg`, remuneration.mg)
.set(`pae`, remuneration.pae)
.set(`recu`, remuneration.recu)	
.set(`base`, remuneration.base)
.set(`boni`, remuneration.boni)
.set(`split`, remuneration.split)
.set(`bdu`, remuneration.montant_dû)
.set(`paye`, remuneration.montant_payé)
.set(`total`, remuneration.total)
.set(`dpaye`, remuneration.dpaye)
.set(`notes`, remuneration.notes)
.set(`sol`, remuneration.solde)
.set(`conseiller`, remuneration.idConseiller)
.toParam();

//Squel request creating rates for a contract
let createRates = (rates) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into(`public."HISTORIQUE_TAUX"`)
.set(`idclient`, rates.idclient)
.set(`idfournisseur`, rates.idfournisseur)
.set(`annee_dep`, rates.annee_dep)
.set(`annee_fin`, rates.annee_fin)
.set(`nb_employe`, rates.nombre_employes)
.set(`diff`, rates.diff)
.set(`vie`, rates.vie)
.set(`dma`, rates.dma)
.set(`pac`, rates.pac)
.set(`ct`, rates.ct)
.set(`lt`, rates.lt)
.set(`amc_ind`, rates.amc_ind)
.set(`amc_mono`, rates.amc_mono)
.set(`amc_couple`, rates.amc_couple)
.set(`amc_fam`, rates.amc_fam)
.set(`dent_ind`, rates.dent_ind)		
.set(`dent_mono`, rates.dent_mono)
.set(`dent_couple`, rates.dent_couple)
.set(`dent_fam`, rates.dent_fam)
.set(`mg_ind`, rates.mg_ind)
.set(`mg_mono`, rates.mg_mono)
.set(`mg_couple`, rates.mg_couple)
.set(`mg_fam`, rates.mg_fam)
.set(`pae`, rates.pae)
.set(`prime_ms`, rates.prime_ms)
.set(`prime_an`, rates.prime_an)
.toParam();

// Squel request creating a collective contract
let createContractOblig = (contract) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into(`public."CONTRAT"`)
.set(`idfournisseur`, contract.idAssureur)
.set(`idclient`, contract.idClient)
.set(`idchambrecommerce`, contract.idAGA)
.set(`idrepresentant`, contract.idRepresentant)
.set(`date_signature`, contract.date_signature)	
.set(`mois_renouvellement`, contract.moisRenouv)
.set(`police`, contract.numPolice)
.set(`notes`, contract.notes)
.returning(`idcontrat`)
.toParam();

// Squel request creating a contract
let createContractCollOblig = (contract) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into(`public."CONTRAT_COLLECTIF"`)
.set(`idcontrat`, contract.idcontrat)
.toParam();

// Squel request filling optionnal attributes for a specific contract
let createContractFacul = (idcontract, idattr, valeur) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into(`public."CONTRAT_COLLECTIF_FACUL"`)
.set(`idcontrat`, idcontract)
.set(`idattrcontratcoll`, idattr)
.set(`valeur`, valeur)
.toParam();

//Squel request creating a module for a specific contract
let createContractModul = (module) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into(`public."MODULE"`)
.set(`idcontrat`, module.idcontrat)
.set(`iddomaineass`, module.iddomaineass)
.set(`notes`, module.notes)
.returning(`idmodule`)
.toParam();

//Squel request creating subscriptions for a specific contract
let createSubscriptions = (subscription) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into(`public."SOUSCRIPTIONS"`)
.set(`idmodule`, subscription.idmodule)
.set(`idmodalite`, subscription.idmodalite)
.set(`notes`, subscription.notes)
.set(`valeur`, subscription.valeur)
.set(`idmodvaleur`, subscription.idmodvaleur)
.toParam();

//Squel request getting the id of the value "Other" 
let getIdOther = () =>
squel.select()
.from(`public."MODALITES_VALEUR"`)
.field(`idmodvaleur`)
.where(`valeur = ?`, `Autres`)
.toParam();

/**
 * Route creating a client
 * @method POST
 * @URL /collectiveContracts/create
 * @param expressJwtIp.ip() server IP address
 * @DataParams {idAssureur, idAGA, modulesChoisis, numPolice, dateEmission, moisRenouv, notes,
 * historiqueTaux, remuneration, idClient, idRepresentant} Contract to be created
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.post('/create', expressJwtIp.ip(), function (req, res) {

    /*var tokenReceived = req.get("authorization");
    var secret = 'aplsszjknbndsj';
    // decode
    var decoded = jwt.decode(tokenReceived, secret);
    var _ipReceived = decoded.ip;
    const _ip = res.locals.ip;

    if (!!decoded && (_ip === _ipReceived)) {*/

		console.log("Starting /collectiveContracts/create");
		var contract = {
				idAssureur: req.body.idAssureur,
                idAGA: req.body.idAGA,
                modulesChoisis: req.body.modulesChoisis,
                numPolice: req.body.numPolice,
                date_signature: req.body.dateEmission,
                moisRenouv: req.body.moisRenouv,
                notes: req.body.notes,
                historiqueTaux: req.body.historiqueTaux,
                remuneration: req.body.remuneration,
                idClient: req.body.idClient,
                idRepresentant: req.body.idRepresentant,
                facul: req.body.facultatif
		};
		let idother = null;
		db.tx(t => {
			return t.one(createContractOblig(contract))
				.then((newContract) => {
					contract.idcontrat = newContract.idcontrat;
					return t.one(getIdOther())
					.then((retrievedIdOther) => {
						idother = retrievedIdOther.idmodvaleur;
						return t.none(createContractCollOblig(contract))
						.then(() => {
							let rate ={
								idclient : contract.idClient,
								idfournisseur : contract.idAssureur,
								annee_dep : contract.historiqueTaux.annee_dep,
								annee_fin : contract.historiqueTaux.annee_fin,
								nb_employe : (contract.historiqueTaux.nombre_employes ===  "" ? null : contract.historiqueTaux.nombre_employes),
								diff : (contract.historiqueTaux.diff === "" ? null : contract.historiqueTaux.diff),
								vie : (contract.historiqueTaux.vie === "" ? null : contract.historiqueTaux.vie),
								dma : (contract.historiqueTaux.dma === "" ? null : contract.historiqueTaux.dma),
								pac : (contract.historiqueTaux.pac === "" ? null : contract.historiqueTaux.pac),
								ct : (contract.historiqueTaux.ct === "" ? null : contract.historiqueTaux.ct),
								lt : (contract.historiqueTaux.lt === "" ? null : contract.historiqueTaux.lt),
								amc_ind : (contract.historiqueTaux.amc_ind === "" ? null : contract.historiqueTaux.amc_ind),
								amc_mono : (contract.historiqueTaux.amc_mono === "" ? null : contract.historiqueTaux.amc_mono),
								amc_couple : (contract.historiqueTaux.amc_couple === "" ? null : contract.historiqueTaux.amc_couple),
								amc_fam : (contract.historiqueTaux.amc_fam === "" ? null : contract.historiqueTaux.amc_fam),
								dent_ind : (contract.historiqueTaux.dent_ind === "" ? null : contract.historiqueTaux.dent_ind),		
								dent_mono : (contract.historiqueTaux.dent_mono === "" ? null : contract.historiqueTaux.dent_mono),
								dent_couple : (contract.historiqueTaux.dent_couple === "" ? null : contract.historiqueTaux.dent_couple),
								dent_fam : (contract.historiqueTaux.dent_fam === "" ? null : contract.historiqueTaux.dent_fam),
								mg_ind : (contract.historiqueTaux.mg_ind === "" ? null : contract.historiqueTaux.mg_ind),
								mg_mono : (contract.historiqueTaux.mg_mono === "" ? null : contract.historiqueTaux.mg_mono),
								mg_couple : (contract.historiqueTaux.mg_couple === "" ? null : contract.historiqueTaux.mg_couple),
								mg_fam : (contract.historiqueTaux.mg_fam === "" ? null : contract.historiqueTaux.mg_fam),
								pae : (contract.historiqueTaux.pae === "" ? null : contract.historiqueTaux.pae),
								prime_ms : (contract.historiqueTaux.prime_ms === "" ? null : contract.historiqueTaux.prime_ms),
								prime_an : (contract.historiqueTaux.prime_an	=== "" ? null : contract.historiqueTaux.prime_an)
							}
							
							return t.none(createRates(rate))
							.then(() => {	
								
								let remuneration ={
									idclient : contract.idClient,
									idfournisseur : contract.idAssureur,
									annee_dep : contract.historiqueTaux.annee_dep,
									annee_fin : contract.historiqueTaux.annee_fin,
									vie : (contract.remuneration.vie === "" ? null : contract.remuneration.vie),
									ct : (contract.remuneration.ct === "" ? null : contract.remuneration.ct),
									lt : (contract.remuneration.lt === "" ? null : contract.remuneration.lt),
									amc : (contract.remuneration.amc === "" ? null : contract.remuneration.amc),
									dent : (contract.remuneration.dent === "" ? null : contract.remuneration.dent),
									mg : (contract.remuneration.mg === "" ? null : contract.remuneration.mg),
									pae : (contract.remuneration.pae === "" ? null : contract.remuneration.pae),
									recu : (contract.remuneration.recu === "" ? null : contract.remuneration.recu),
									base : (contract.remuneration.base === "" ? null : contract.remuneration.base),
									boni : (contract.remuneration.boni === "" ? null : contract.remuneration.boni),
									split : (contract.remuneration.split === "" ? null : contract.remuneration.split),
									bdu : (contract.remuneration.bdu === "" ? null : contract.remuneration.bdu),		
									paye : (contract.remuneration.paye === "" ? null : contract.remuneration.paye),
									total : (contract.remuneration.total === "" ? null : contract.remuneration.total),
									dpaye : (contract.remuneration.dpaye === "" ? null : contract.remuneration.dpaye),
									notes : (contract.remuneration.notes === "" ? null : contract.remuneration.notes),
									solde : (contract.remuneration.solde === "" ? null : contract.remuneration.solde),
									idConseiller : (contract.remuneration.idConseiller === "" ? null : idConseiller)
								};
									
								return t.none(createRemunerations(remuneration))
								.then(() => { 
							
									const queriesFac = contract.facul.map(attribute => {
								        return t.none(createContractFacul(contract.idcontrat, attribute.idattrcontratcoll, attribute.value));
									});
									
								    return t.batch(queriesFac)
							    		.then(() => {
							    			const queriesModule = contract.modulesChoisis.map(moduleRetrieved => {
							    				let module = {
							    						iddomaineass: moduleRetrieved.idModule,
							    						notes: moduleRetrieved.module_notes,
							    						idcontrat: contract.idcontrat
							    				}						    		
							    				
						    					return t.one(createContractModul(module))
					    						.then(newModule => {
					    							module.idmodule = newModule.idmodule;
					    							const queriesSubscriptions = moduleRetrieved.modalites.map(retrievedSubscription => {
						    							let subscription = {
						    									idmodule: module.idmodule,
						    									idmodalite: retrievedSubscription.idModalite,
						    									notes: retrievedSubscription.souscription_notes,
						    									valeur: retrievedSubscription.valeur,
						    									idmodvaleur: retrievedSubscription.idValeur
									    				}				
						    							console.log(subscription);
						    							if(subscription.idmodvaleur !== idother) {
						    								subscription.valeur = null;
						    							}
					    								return t.none(createSubscriptions(subscription));
					    							});
					    							
					    							 return t.batch(queriesSubscriptions);					    							
					    						})
						    				});
							    			
							    			return t.batch(queriesModule);
							    		});
								});
							});
						})
					})
				})
		})
		.then(() => {
			res.send({
				status: 'success',
				message:  null
			});
		})
		.catch(error => {
			res.send({
				status: 'fail',
				message: error.toString() //'Le contrat n'a pas pu être créé'
			});
		});
	/*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/

	console.log("end post /collectiveContracts/create");
});
// CHECKPOINT
//Squel request updating a remuneration for a contract
let updateRemunerations = (remuneration) =>
squel.update({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.table(`public."REMUNERATION"`)
.set(`vie`, remuneration.vie)
.set(`ct`, remuneration.ct)
.set(`lt`, remuneration.lt)
.set(`amc`, remuneration.amc)
.set(`dent`, remuneration.dentaire)
.set(`mg`, remuneration.mg)
.set(`pae`, remuneration.pae)
.set(`recu`, remuneration.recu)	
.set(`base`, remuneration.base)
.set(`boni`, remuneration.boni)
.set(`split`, remuneration.split)
.set(`bdu`, remuneration.montant_dû)
.set(`paye`, remuneration.montant_payé)
.set(`total`, remuneration.total)
.set(`dpaye`, remuneration.dpaye)
.set(`notes`, remuneration.notes)
.set(`sol`, remuneration.solde)
.set(`conseiller`, remuneration.idConseiller)
.where(`idclient = ?`, remuneration.idclient)
.where(`idfournisseur = ?`, remuneration.idfournisseur)
.where(`annee_dep = ?`, remuneration.annee_dep)
.where(`annee_fin = ?`, remuneration.annee_fin)
.toParam();

//Squel request updating rates for a contract
let updateRates = (rates) =>
squel.update({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.table(`public."HISTORIQUE_TAUX"`)
.set(`nb_employe`, rates.nombre_employes)
.set(`diff`, rates.diff)
.set(`vie`, rates.vie)
.set(`dma`, rates.dma)
.set(`pac`, rates.pac)
.set(`ct`, rates.ct)
.set(`lt`, rates.lt)
.set(`amc_ind`, rates.amc_ind)
.set(`amc_mono`, rates.amc_mono)
.set(`amc_couple`, rates.amc_couple)
.set(`amc_fam`, rates.amc_fam)
.set(`dent_ind`, rates.dent_ind)		
.set(`dent_mono`, rates.dent_mono)
.set(`dent_couple`, rates.dent_couple)
.set(`dent_fam`, rates.dent_fam)
.set(`mg_ind`, rates.mg_ind)
.set(`mg_mono`, rates.mg_mono)
.set(`mg_couple`, rates.mg_couple)
.set(`mg_fam`, rates.mg_fam)
.set(`pae`, rates.pae)
.set(`prime_ms`, rates.prime_ms)
.set(`prime_an`, rates.prime_an)
.where(`idclient = ?`, rates.idclient)
.where(`idfournisseur = ?`, rates.idfournisseur)
.where(`annee_dep = ?`, rates.annee_dep)
.where(`annee_fin = ?`, rates.annee_fin)
.toParam();


// Squel request updating obligatory fields of a contract
let updateContractCollOblig = (idcontract) =>
squel.update({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into(`public."CONTRAT_COLLECTIF"`)
.where(`idcontrat = ?`, idcontract)
.toParam();

 // Squel request for deleting a client facultative attributes
const deleteContractFacul = (idcontract) =>
squel.delete({replaceSingleQuotes: true, singleQuoteReplacement: `''`})
    .from(`public."CONTRAT_COLLECTIF_FACUL"`)
    .where(`idcontrat = ?`, idcontract)
    .toParam();

//Squel request updating a collective contract
let updateContractOblig = (contract) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into(`public."CONTRAT"`)
.set(`idfournisseur`, contract.idAssureur)
.set(`idclient`, contract.idClient)
.set(`idchambrecommerce`, contract.idAGA)
.set(`idrepresentant`, contract.idRepresentant)
.set(`date_signature`, contract.date_signature)	
.set(`mois_renouvellement`, contract.moisRenouv)
.set(`police`, contract.numPolice)
.set(`notes`, contract.notes)
.returning(`idcontrat`)
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
router.post('/update', expressJwtIp.ip(), function (req, res) {

    /*var tokenReceived = req.get("authorization");
    var secret = 'aplsszjknbndsj';
    // decode
    var decoded = jwt.decode(tokenReceived, secret);
    var _ipReceived = decoded.ip;
    const _ip = res.locals.ip;

    if (!!decoded && (_ip === _ipReceived)) {*/

    console.log("Starting /clients/update");

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
                                            return t.none(createClientFacul(client.idclient, attribute.idattrcontratcoll, attribute.value));
                                        });
                                        return t.batch(queries)
                                            .then(() => {
                                                const queriesContactNew = client.newcontacts.map(contact => {
                                                    let person = {
                                                        idclient: client.idclient,
                                                        prenom: contact.prenom,
                                                        nom: contact.nom,
                                                        idposte: contact.idposte,
                                                        titre: contact.titre,
                                                        num_tel_principal: contact.num_tel_principal,
                                                        ext_tel_principal: contact.ext_tel_principal,
                                                        mail: contact.mail,
                                                        estdecideur: contact.estdecideur
                                                    }

                                                    return t.one(getIdTitre(person.titre))
                                                        .then(titre => {
                                                            person.idtitre = titre.idtitre;
                                                            return t.one(createPerson(person))
                                                                .then(personCreated => {
                                                                    person.idpersonne = personCreated.idpersonne;
                                                                    return t.none(createContact(person));
                                                                })
                                                        })
                                                });

                                                const queriesContactUpdt = client.updtcontacts.map(contact => {
                                                    let person = {
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
                                                    }
                                                    return t.one(getIdTitre(person.titre))
                                                        .then(titre => {
                                                            person.idtitre = titre.idtitre;
                                                            return t.none(updatePerson(person))
                                                                .then(() => {
                                                                    return t.none(updateContact(person));
                                                                })
                                                        })
                                                });

                                                const queriesContactDel = client.delcontacts.map(contact => {
                                                    return t.none(deleteContact(contact.idpersonne, client.idclient))
                                                        .then(() => {
                                                            return t.none(deletePerson(contact.idpersonne));
                                                        })
                                                })
                                                return t.batch(queriesContactNew.concat(queriesContactUpdt.concat(queriesContactDel)));
                                            });
                                    })
                            })
                    })
            })
    })
        .then(() => {
            res.send({
                status: 'success',
                message: null
            });
        })
        .catch(error => {
            res.send({
                status: 'fail',
                message: error.toString() //'Le client n'a pas pu être mis à jour'
            });
        });
    /*} else {
        res.status(403);
        sendResponse('Acces refusé', res, 'fail')
    }*/

    console.log("end post /clients/update");
});

// Squel request for getting the inactive state id
let getInactifState = () =>
    squel.select()
        .field('idetat')
        .from('public."ETAT"')
        .where('libelleetat LIKE ?', "Annulé")

// Squel request for deletting (state changement) a client
let deleteClient = (idclient) =>
    squel.updateJoin({replaceSingleQuotes: true, singleQuoteReplacement: "''"})
        .table('public."CLIENT"')
        .set('idetat', getInactifState())
        .where('idclient = ?', idclient)
        .toParam();

/**
 * Route deleting a client (changement of state)
 * @method DELETE
 * @URL /clients/:idclient
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.delete('/:idClient', expressJwtIp.ip(), function (req, res) {

    /*var tokenReceived = req.get("authorization");
    var secret = 'aplsszjknbndsj';
    // decode
    var decoded = jwt.decode(tokenReceived, secret);
    var _ipReceived = decoded.ip;
    const _ip = res.locals.ip;

    if (!!decoded && (_ip === _ipReceived)) {*/

    console.log("Starting /clients/:idClient");
    let idClient = req.params.idClient;
    db.none(deleteClient(idClient))
        .then(() => {
            res.send({
                status: 'success',
                message: null
            });
        })
        .catch(error => {
            res.send({
                status: 'fail',
                message: error.toString() //'Le client n'a pas pu être supprimé'
            });
        });
    /*} else {
        res.status(403);
        sendResponse('Acces refusé', res, 'fail')
    }*/

    console.log("end delete /clients/:id");
});


module.exports = router;
