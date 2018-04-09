--## SCRIPT D'INSERTION TEST 					    ###
--## PLATEFORME: PostgreSQL							###
--## AUTEURS: Equipe CRM - UdeS A17                 ###
--## DECEMBRE 2017                                  ###
--## COPYRIGHT (c)                                  ###
--#####################################################


-----public schema-----
SELECT setval('public."PROVENANCE_idprovenance_seq"', 1, FALSE);
SELECT setval('public."CLIENT_idclient_seq"', 1, FALSE);
SELECT setval('public."CONTRAT_idcontrat_seq"', 1, FALSE);
SELECT setval('public."ADRESSE_idadresse_seq"', 1, FALSE);
SELECT setval('public."ETAT_idetat_seq"', 1, FALSE);
SELECT setval('public."RELEVE_idreleve_seq"', 1, FALSE);
SELECT setval('public."TYPE_idtype_seq"', 1, FALSE);
SELECT setval('public."FOURNISSEUR_idfournisseur_seq"', 1, FALSE);
SELECT setval('public."CATEGORIE_idcategorie_seq"', 1, FALSE);
SELECT setval('public."POSTE_ENTREPRISE_idposte_ent_seq"', 1, FALSE);
SELECT setval('public."POSTE_FOURNISSEUR_idposte_fou_seq"', 1, FALSE);
SELECT setval('public."ROLE_idrole_seq"', 1, FALSE);
SELECT setval('public."DOMAINE_ASSURANCE_iddomaineass_seq"', 1, FALSE);
SELECT setval('public."MODALITE_idmodalite_seq"', 1, FALSE);
SELECT setval('public."MODALITES_VALEUR_idmodvaleur_seq"', 1, FALSE);
SELECT setval('public."CADEAU_idcadeau_seq"', 1, FALSE);
SELECT setval('public."MODULE_idmodule_seq"', 1, FALSE);
SELECT setval('public."ACTIVITE_idactivite_seq"', 1, FALSE);
SELECT setval('public."CHAMBRE_COMMERCE_idchambrecommerce_seq"', 1, FALSE);
SELECT setval('public."FOURNISSEUR_ATTR_idattrfournisseur_seq"', 1, FALSE);
SELECT setval('public."ENTREPRISE_ATTR_idattrentreprise_seq"', 1, FALSE);
SELECT setval('public."CONTRAT_COLLECTIF_ATTR_idattrcontratcoll_seq"', 1, FALSE);
SELECT setval('public."PERSONNE_idpersonne_seq"', 1, FALSE);
SELECT setval('public."TITRE_idtitre_seq"', 1, FALSE);
SELECT setval('users."ROLEADM_idrole_seq"', 1, FALSE);
SELECT setval('users."UTILISATEUR_iduser_seq"', 1, FALSE);
SELECT setval('users."EMPLOYE_INT_idemploye_seq"', 1, FALSE);


--TYPE--
INSERT INTO public."TYPE"(libelletype, forme) VALUES ('Nombre', '[-+]?[0-9]*\.?[0-9]+');
INSERT INTO public."TYPE"(libelletype, forme) VALUES ('String', '(.*?)');
INSERT INTO public."TYPE"(libelletype, forme) VALUES ('Date', '!^(0?\d|[12]\d|3[01])-(0?\d|1[012])-((?:19|20)\d{2})$!');
INSERT INTO public."TYPE"(libelletype, forme) VALUES ('Booléen', '[Oui|Non]');

--TITRE--
INSERT INTO public."TITRE"(libelletitre) VALUES ('Mr');
INSERT INTO public."TITRE"(libelletitre) VALUES ('Mme');

--POSTE_ENTREPRISE--
INSERT INTO public."POSTE_ENTREPRISE"(libelleposte) VALUES ('Président/Vice-Président');
INSERT INTO public."POSTE_ENTREPRISE"(libelleposte) VALUES ('Adjoint Administratif');
INSERT INTO public."POSTE_ENTREPRISE"(libelleposte) VALUES ('Ressources humaines');
INSERT INTO public."POSTE_ENTREPRISE"(libelleposte) VALUES ('Controleur');
INSERT INTO public."POSTE_ENTREPRISE"(libelleposte) VALUES ('Comptable');
INSERT INTO public."POSTE_ENTREPRISE"(libelleposte) VALUES ('Secrétaire');
INSERT INTO public."POSTE_ENTREPRISE"(libelleposte) VALUES ('Autre');

--POSTE_ENTREPRISE--

INSERT INTO public."POSTE_FOURNISSEUR"(libelleposte) VALUES ('Représentant');
INSERT INTO public."POSTE_FOURNISSEUR"(libelleposte) VALUES ('Soumissions');
INSERT INTO public."POSTE_FOURNISSEUR"(libelleposte) VALUES ('Administration');
INSERT INTO public."POSTE_FOURNISSEUR"(libelleposte) VALUES ('Adjoint interne');
INSERT INTO public."POSTE_FOURNISSEUR"(libelleposte) VALUES ('Service de réclamations');
INSERT INTO public."POSTE_FOURNISSEUR"(libelleposte) VALUES ('Service aux conseillers');
INSERT INTO public."POSTE_FOURNISSEUR"(libelleposte) VALUES ('Services à la clientèle');
INSERT INTO public."POSTE_FOURNISSEUR"(libelleposte) VALUES ('Participants du régime');
INSERT INTO public."POSTE_FOURNISSEUR"(libelleposte) VALUES ('Autre');

--PROVENANCE--
INSERT INTO public."PROVENANCE"(libelleprovenance) VALUES ('Publicité Internet');
INSERT INTO public."PROVENANCE"(libelleprovenance) VALUES ('Démarchage');
INSERT INTO public."PROVENANCE"(libelleprovenance) VALUES ('Bouche à oreilles');

--ETAT--
INSERT INTO public."ETAT"(libelleetat) VALUES ('Actif');
INSERT INTO public."ETAT"(libelleetat) VALUES ('Annulé');


--CHAMBRE COMMERCE--
INSERT INTO public."CHAMBRE_COMMERCE"(libellechambrecommerce) VALUES ('AFC');
INSERT INTO public."CHAMBRE_COMMERCE"(libellechambrecommerce) VALUES ('Bois Francs - Érable');
INSERT INTO public."CHAMBRE_COMMERCE"(libellechambrecommerce) VALUES ('Disraeli');
INSERT INTO public."CHAMBRE_COMMERCE"(libellechambrecommerce) VALUES ('Drummondville');
INSERT INTO public."CHAMBRE_COMMERCE"(libellechambrecommerce) VALUES ('Magog-Orford');
INSERT INTO public."CHAMBRE_COMMERCE"(libellechambrecommerce) VALUES ('Richmond');
INSERT INTO public."CHAMBRE_COMMERCE"(libellechambrecommerce) VALUES ('Sherbrooke');
INSERT INTO public."CHAMBRE_COMMERCE"(libellechambrecommerce) VALUES ('Sources');

--ACTIVITE--
INSERT INTO public."ACTIVITE"(libelleactivite) VALUES ('Construction');
INSERT INTO public."ACTIVITE"(libelleactivite) VALUES ('Commerce au détail ou grossiste');
INSERT INTO public."ACTIVITE"(libelleactivite) VALUES ('Entreprise de service');
INSERT INTO public."ACTIVITE"(libelleactivite) VALUES ('Ferme/Forest');
INSERT INTO public."ACTIVITE"(libelleactivite) VALUES ('Manufacture');
INSERT INTO public."ACTIVITE"(libelleactivite) VALUES ('Organisme à but non-lucratif');

--ADRESSE--
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('Boul. université', 'Sherbrooke', 'Quebec', 'J1K2N4');
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('Rue du sugarbaby', 'Sherbrooke', 'Quebec', 'J1K2R1');
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('Rue du sugardaddy', 'Sherbrooke', 'Quebec', 'J1K2R1');

--CADEAU--
INSERT INTO public."CADEAU"(libellecadeau) VALUES ('Bulletin');
INSERT INTO public."CADEAU"(libellecadeau) VALUES ('Calendrier');
INSERT INTO public."CADEAU"(libellecadeau) VALUES ('Carte de fête');
INSERT INTO public."CADEAU"(libellecadeau) VALUES ('Carte de noel');
INSERT INTO public."CADEAU"(libellecadeau) VALUES ('Autres');

--RELEVE--
INSERT INTO public."RELEVE"(modeenvoiereleve) VALUES ('Courriel');
INSERT INTO public."RELEVE"(modeenvoiereleve) VALUES ('Poste');
INSERT INTO public."RELEVE"(modeenvoiereleve) VALUES ('Telecopieur');
INSERT INTO public."RELEVE"(modeenvoiereleve) VALUES ('Non');
INSERT INTO public."RELEVE"(modeenvoiereleve) VALUES ('Autres');

--CLIENT--
INSERT INTO public."CLIENT"(idetat, idprovenance, prospect, notes) VALUES (1, 1, false, 'Ce client veut des pigeons voyageurs à chaque 2eme mercredi du mois');
INSERT INTO public."CLIENT"(idetat, idprovenance, prospect, notes) VALUES (2, 3, true, 'Ce client a toujours chaud');

--ENTREPRISE--
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idreleve, idactivite, nom) VALUES (1, 2, 1, 3, 'Groupe CGI');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idreleve, idactivite, nom) VALUES (2, 3, 2, 1, 'Sherweb Inc');



--FOURNISSEUR--
INSERT INTO public."FOURNISSEUR"(idadresse, nom, petit_grp, grand_grp, nb_min_petit_grp, nb_min_grand_grp) VALUES (3, 'Assomption', true, true, 10, 10000);
INSERT INTO public."FOURNISSEUR"(idadresse, nom, petit_grp, grand_grp, nb_min_petit_grp, nb_min_grand_grp) VALUES (3, 'Avantage Maximum', false, true, 0, 2090);
INSERT INTO public."FOURNISSEUR"(idadresse, nom, petit_grp, grand_grp, nb_min_petit_grp, nb_min_grand_grp) VALUES (3, 'Capitale', true, true, 10, 10000);
INSERT INTO public."FOURNISSEUR"(idadresse, nom, petit_grp, grand_grp, nb_min_petit_grp, nb_min_grand_grp) VALUES (3, 'Croix Bleue', false, true, 0, 2090);
INSERT INTO public."FOURNISSEUR"(idadresse, nom) VALUES (3, 'Desjardins Sécurité Financière');
INSERT INTO public."FOURNISSEUR"(idadresse, nom) VALUES (3, 'Empire vie');
INSERT INTO public."FOURNISSEUR"(idadresse, nom) VALUES (3, 'Financière Sun Life');
INSERT INTO public."FOURNISSEUR"(idadresse, nom) VALUES (3, 'Great-West');
INSERT INTO public."FOURNISSEUR"(idadresse, nom, petit_grp, grand_grp, nb_min_petit_grp, nb_min_grand_grp) VALUES (3, 'Humania', true, true, 10, 10000);
INSERT INTO public."FOURNISSEUR"(idadresse, nom) VALUES (3, 'Industrielle-Alliance');
INSERT INTO public."FOURNISSEUR"(idadresse, nom, petit_grp, grand_grp, nb_min_petit_grp, nb_min_grand_grp) VALUES (3, 'Manuvie', false, true, 0, 2090);
INSERT INTO public."FOURNISSEUR"(idadresse, nom, petit_grp, grand_grp, nb_min_petit_grp, nb_min_grand_grp) VALUES (3, 'PME+', true, false, 10, 10000);
INSERT INTO public."FOURNISSEUR"(idadresse, nom, petit_grp, grand_grp, nb_min_petit_grp, nb_min_grand_grp) VALUES (3, 'RACCC', true, true, 10,8500);
INSERT INTO public."FOURNISSEUR"(idadresse, nom) VALUES (3, 'RBC Assurances');
INSERT INTO public."FOURNISSEUR"(idadresse, nom) VALUES (3, 'SSQ GROUPE FINANCIER');
INSERT INTO public."FOURNISSEUR"(idadresse, nom) VALUES (3, 'UV Mutuelle');
INSERT INTO public."FOURNISSEUR"(idadresse, nom) VALUES (3, 'Autres');

--PERSONNE--
INSERT INTO public."PERSONNE"(nom, prenom, idtitre) VALUES ('Oukil', 'Aziz', 1);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre) VALUES ('Ana', 'Pasfaitlescourses', 2);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre) VALUES ('Adam', 'Troisjour', 1);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre) VALUES ('Atito', 'Maxime', 1);

--BEGINDATATEST
---ROLEADM---
INSERT INTO users."ROLEADM"(description,isAdmin) VALUES ('Administrateur', TRUE);
INSERT INTO users."ROLEADM"(description,isAdmin) VALUES ('Associé', FALSE);
INSERT INTO users."ROLEADM"(description,isAdmin) VALUES ('Consultant', FALSE);
INSERT INTO users."ROLEADM"(description,isAdmin) VALUES ('Employé', FALSE);
INSERT INTO users."ROLEADM"(description,isAdmin) VALUES ('Visiteur', FALSE);

INSERT INTO users."UTILISATEUR"(login, password, mail, idrole) VALUES ('alain', '$2a$10$rJCeox4/QAS7licPO4CR2eBzMqmLlZGow5l.jfxfg2VRWxOGfXOoy', 'ceciestuntest@test.com', 1);
INSERT INTO users."UTILISATEUR"(login, password, mail, idrole) VALUES ('azizou', '$2a$10$rJCeox4/QAS7licPO4CR2eBzMqmLlZGow5l.jfxfg2VRWxOGfXOoy', 'azizou@gmail.com', 2);
INSERT INTO users."UTILISATEUR"(login, password, mail, idrole) VALUES ('maxime', '$2a$10$rJCeox4/QAS7licPO4CR2eBzMqmLlZGow5l.jfxfg2VRWxOGfXOoy', 'ceciestuntest@test.com', 3);
INSERT INTO users."UTILISATEUR"(login, password, mail, idrole) VALUES ('jeanneymar', '$2a$10$rJCeox4/QAS7licPO4CR2eBzMqmLlZGow5l.jfxfg2VRWxOGfXOoy', 'ceciestuntest@test.com', 4);

INSERT INTO users."EMPLOYE_INT"(iduser, idpersonne) VALUES (1, 1);
INSERT INTO users."EMPLOYE_INT"(iduser, idpersonne) VALUES (2, 2);
INSERT INTO users."EMPLOYE_INT"(iduser, idpersonne) VALUES (3, 3);
INSERT INTO users."EMPLOYE_INT"(iduser, idpersonne) VALUES (4, 4);

--CONTRAT--
INSERT INTO public."CONTRAT"(idfournisseur, idclient, idrepresentant, mois_renouvellement, police, notes, date_signature, idchambrecommerce) VALUES (10, 2, 4, 10, 9632584 , 'Contrat de test', to_date('2012-09-01', 'YYYY-MM-DD'), 1);
INSERT INTO public."CONTRAT"(idfournisseur, idclient, idrepresentant, mois_renouvellement, police, notes) VALUES (10, 2, 2, 6, 5222 , 'Contrat de test2');

--CONTRAT_COLLECTIF--

INSERT INTO public."CONTRAT_COLLECTIF"(idcontrat, misapied, idautrevendeur) VALUES (1, 23, 1);
INSERT INTO public."CONTRAT_COLLECTIF"(idcontrat, misapied, idautrevendeur) VALUES (2, 28, 2);

--DOMAINE_ASS-- L'ordre est important !
INSERT INTO public."DOMAINE_ASSURANCE"(libelledomaine) VALUES('Assurance Vie - Adhérent et personnes à charge');
INSERT INTO public."DOMAINE_ASSURANCE"(libelledomaine) VALUES('Assurance soins dentaires'); --id:2
INSERT INTO public."DOMAINE_ASSURANCE"(libelledomaine) VALUES('Assurance soins medicaux');
INSERT INTO public."DOMAINE_ASSURANCE"(libelledomaine) VALUES('Assurance Invalidité courte durée'); --id:4
INSERT INTO public."DOMAINE_ASSURANCE"(libelledomaine) VALUES('Assurance Invalidité longue durée');
INSERT INTO public."DOMAINE_ASSURANCE"(libelledomaine) VALUES('Assurance Maladies Graves'); --id:6
INSERT INTO public."DOMAINE_ASSURANCE"(libelledomaine) VALUES('Assurance Maladie Complémentaire');

--CATEGORIE--
INSERT INTO public."CATEGORIE" (libellecategorie) VALUES ('Cadres');
INSERT INTO public."CATEGORIE" (libellecategorie) VALUES ('Employés');
INSERT INTO public."CATEGORIE" (libellecategorie) VALUES ('Administrateur');

--MODALITES--
--Assurance vie id:1
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Classe', 1, 2, 'Classe');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Formule', 1, 2, 'Formule');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Maximum SP', 1, 1, 'Maximum sans preuve');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Maximum AP', 1, 1, 'Maximum avec preuve');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Conjoint', 1, 1, 'Conjoint');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Enfants', 1, 1, 'Enfants');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Classe2', 1, 1, 'Classe2');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Terminaison', 1, 2, 'Terminaison');

--Assurance invalidite courte duree id:4
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Classe', 4, 2, 'Classe');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Hospitalisation', 4, 2, 'Délai de carence');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Accident', 4, 2, 'Délai de carence');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Maladie', 4, 2, 'Délai de carence');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Durée', 4, 2, 'Nombre de semaines payables');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Pourcentage', 4, 1, 'Pourcentage payable du revenu brut hebdomadaire');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Maximum SP', 4, 1, 'Maximum assurable sans preuve médicale');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Maximum AP', 4, 1, 'Maximum assurable avec preuve médicale');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Imposables ?', 4, 4, 'Imposables');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Assurances Emploi', 4, 2, 'Prestations intégrés à l''assurance emploi ?');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Reduction du taux A.E', 4, 2, 'Réduction du taux de cotisation d''assurance emploi ?');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Terminaison', 4, 2, 'Terminaison');

--Assurance invalidite longue duree id:5
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Classe', 5, 2, 'Classe');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Délai de carrence', 5, 2, 'Délai de carence');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Durée', 5, 2, 'Durée des prestations');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Pourcentage', 5, 1, 'Durée des prestations');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Maximum SP', 5, 1, 'Maximum assurable sans preuve médicale');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Maximum AP', 5, 1, 'Maximum assurable avec preuve médicale');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Imposables ?', 5, 4, 'Imposables ?');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Indexation', 5, 2, 'Indexation des prestations');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Protection occupation', 5, 2, 'Protection occupation');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Revenus admissibles', 5, 2, 'Revenus admissibles');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Ind_Max', 5, 2, 'Indexation Maximale');

--Assurance maladie complementaire id:7
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Franchise médicaments', 7, 2, 'Annuelle ou par ordonnance');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Coassurance médicaments', 7, 1, 'Coassurance médicaments');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Mécanisme de substitution', 7, 1, 'Mécanisme de substitution');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Franchise pour autres frais médicaux', 7, 2, 'Individuelle/Familiale');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Coassurance médicaments', 7, 1, 'Coassurance médicaments');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Coassurance autres frais', 7, 1, 'Coassurance autres frais');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Paramédicaux', 7, 1, 'Maximum annuel ou par visite');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Examen de la vue', 7, 2, 'Examen de la vue');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Verres correcteurs', 7, 2, 'Verres correcteurs');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Assurance voyage', 7, 1, 'Maximum payable');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Annulation voyage', 7, 2, 'Annulation et interruption voyage');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Assurance bagages', 7, 2, 'Assurance bagages');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Terminaison', 7, 2, 'Terminaison');

--Soins dentaires id:2
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Franchise', 2, 2, 'Franchise');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Coassurance base', 2, 1, 'Base et préventif');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Coassurance Perio/Endo', 2, 1, 'Périodontie et endodontie');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Coassurance Majeurs', 2, 1, 'Couronne et prothèse');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Coassurance Orthodontie', 2, 1, 'Coassurance Orthodontie');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Examen de rappel', 2, 2, 'Examen de rappel');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Maximum annuel', 2, 1, 'Maximum annuel');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Terminaison', 2, 2, 'Terminaison');

--Assurance maladies graves id:6
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Employé', 6, 1, 'Montant payable');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Conjoint', 6, 1, 'Montant payable');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Enfants', 6, 1, 'Montant payable');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Nombre de maladies', 6, 1, 'Nombre de maladies');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Maladies préexistantes', 6, 2, 'Maladies préexistantes');
INSERT INTO public."MODALITE"(libelleavantage, iddomaineass, idtype, description) VALUES('Terminaison', 6, 2, 'Terminaison');


--MODALITE_VALEUR--
--Classe
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Autres', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Propriétaires', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Cadres', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Employés', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Tous', 2);
--Formule
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('1x salaire', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('2x salaire', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('3x salaire', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Montant fixe', 2);
--Conjoint & Enfants
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('2500', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('5000', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('7500', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('10000', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('15000', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('20000', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('30000', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('50000', 1);
--Terminaison
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('65 ans', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('70 ans', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('75 ans', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('80 ans', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('85 ans', 2);
--Hospitalisation, Accident, Maladie
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('0 jours', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('7 jours', 2);
--Durée
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('15 semaines', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('16 semaines', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('17 semaines', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('26 semaines', 2);
--Pourcentage
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('50', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('60', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('66.67', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('67', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('75', 1);
--Imposable
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Oui', 4);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Non', 4);
--Assurance emploi
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Oui, standard', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Oui, supplémentaire à A.E', 2);
--Reducion taux A.E
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Effective', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('A venir', 2);
--Indexation
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Non', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Selon IPC maximum 3%', 2);
--Protection de l'occupation
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('24 mois', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('60 mois', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Jusqu à 65 ans', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Jusqu à 70 ans', 2);
--Revenus admissibles
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Salaires de base', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Salaires et dividendes', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Salaires, dividendes et commissions', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Salaires, dividendes, commissions et bonis', 2);
--AMC_MEDF
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('aucune', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Combinées avec les médicaments', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('25$ ind. / 50$ Fam', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('50$ ind. / 100$ Fam', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('100$ ind. / 200$ Fam', 2);
--COASSM
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('70', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('80', 1);
--PARA_MAX
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('300', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('400', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('500', 1);
--EX_VUE
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('50$/24mois', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('75$/24mois', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('1 examen/24mois', 2);
--Verres cprrecteurs
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('200$/24mois', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('300$/24mois', 2);
--Maximum payable
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('1000000', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('2000000', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('3000000', 1);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('5000000', 1);
--Annulation voyage
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Annulation et interruption voyage', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Aucune', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Annulation 5000$', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Annulation et interruption 5000$', 2);
--Assurance bagages
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Aucune', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('500$', 2);
--Terminaison
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Retraite', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Retraite ou 70ans', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Retraite ou 75ans', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Retraite ou 80ans', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Retraite ou 85ans', 2);
--Examen de rappel
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('5 mois', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('6 mois', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('9 mois', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('12 mois', 2);
--Nombre de maladies
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('25 maladies', 2);
--Maladies préexistantes
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('24 mois avant/24 mois après', 2);
--Mecanismes de substitution
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Substitution générique', 2);
INSERT INTO public."MODALITES_VALEUR"(valeur, idtype) VALUES ('Substitution générique obligatoire', 2);


--VALEUR_MODALITE_CONTRAT--

--Assurances vie id:1
--Classe
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE libelleavantage like ('Classe') AND (valeur like ('Propriétaires')
                OR valeur like ('Cadres')
                OR valeur like ('Employés')
				OR valeur like ('Tous')
                OR valeur like ('Autres'));
--Formule
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE libelleavantage like ('Formule') AND (valeur like ('1x salaire')
                OR valeur like ('2x salaire')
                OR valeur like ('3x salaire')
                OR valeur like ('Montant fixe'));
--Max SP
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE libelleavantage like ('Maximum SP') AND valeur like ('Autres');
--Max AP
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE libelleavantage like ('Maximum AP') AND valeur like ('Autres');
--Conjoint
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Conjoint') AND iddomaineass = 1) AND (valeur like ('5000')
                OR valeur like ('10000')
                OR valeur like ('15000')
                OR valeur like ('20000')
                OR valeur like ('Autres'));
--Enfants
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Enfants') AND iddomaineass = 1) AND (valeur like ('2500')
                OR valeur like ('5000')
                OR valeur like ('7500')
                OR valeur like ('10000')
                OR valeur like ('Autres'));
--Classe2
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Classe2') AND iddomaineass = 1) AND (valeur like ('Autres'));
--Terminaison
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Terminaison') AND iddomaineass = 1) AND (valeur like ('70 ans')
                OR valeur like ('75 ans')
                OR valeur like ('80 ans')
                OR valeur like ('85 ans')
                OR valeur like ('Autres'));

--Assurance invalidité de courte durée id:4
--Delai
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Hospitalisation') AND iddomaineass = 4) AND (valeur like ('0 jours')
                OR valeur like ('7 jours')
                OR valeur like ('Autres'));
--Accident
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Accident') AND iddomaineass = 4) AND (valeur like ('0 jours')
                OR valeur like ('7 jours')
                OR valeur like ('Autres'));
--Maladie
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Maladie') AND iddomaineass = 4) AND (valeur like ('7 jours')
                OR valeur like ('Autres'));
--Durée
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Durée') AND iddomaineass = 4) AND (valeur like ('16 semaines')
                OR valeur like ('26 semaines')
                OR valeur like ('Autres'));
--Pourcentage
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Pourcentage') AND iddomaineass = 4) AND (valeur like ('60')
                OR valeur like ('66.67')
                OR valeur like ('67')
                OR valeur like ('75')
                OR valeur like ('Autres'));
--Imposables
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" mv WHERE (libelleavantage like ('Imposables ?') AND iddomaineass = 4) AND (valeur like ('Oui')
                OR valeur like ('Non'))
                AND mv.idtype = 4;
--Assurance emploi
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" mv WHERE (libelleavantage like ('Assurances Emploi') AND iddomaineass = 4) AND (valeur like ('Non')
                OR valeur like ('Oui, standard')
                OR valeur like ('Oui, supplémentaire à A.E')
                OR valeur like ('Autres'))
                AND mv.idtype = 2;
--Reduction taux AE
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" mv WHERE (libelleavantage like ('Reduction du taux A.E') AND iddomaineass = 4) AND (valeur like ('Non')
                OR valeur like ('Effective')
                OR valeur like ('A venir'))
                AND mv.idtype = 2;
--Terminaison
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Terminaison') AND iddomaineass = 4) AND (valeur like ('65 ans')
                OR valeur like ('70 ans')
                OR valeur like ('Autres'));

--Assurace invalidité longue durée id:5
--Delai carence
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Délai de carrence') AND iddomaineass = 5) AND (valeur like ('15 semaines')
                OR valeur like ('16 semaines')
                OR valeur like ('17 semaines')
                OR valeur like ('26 semaines')
                OR valeur like ('Autres'));
--Durée
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Durée') AND iddomaineass = 5) AND (valeur like ('24 mois')
                OR valeur like ('60 mois')
                OR valeur like ('Jusqu à 65 ans')
                OR valeur like ('Jusqu à 70 ans')
                OR valeur like ('Autres'));
--Pourcentages
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Pourcentage') AND iddomaineass = 5) AND (valeur like ('60')
                OR valeur like ('66.67')
                OR valeur like ('67')
                OR valeur like ('75')
                OR valeur like ('Autres'));
--Imposables
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" mv WHERE (libelleavantage like ('Imposables ?') AND iddomaineass = 5) AND (valeur like ('Oui')
                OR valeur like ('Non'))
                AND mv.idtype = 4;
--Indexation
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" mv WHERE (libelleavantage like ('Indexation') AND iddomaineass = 5) AND (valeur like ('Non')
                OR valeur like ('Selon IPC maximum 3%')
                OR valeur like ('Autres'))
                AND mv.idtype = 2;
--Ind_Max
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" mv WHERE (libelleavantage like ('Ind_Max') AND iddomaineass = 5) AND (valeur like ('Non')
                OR valeur like ('Selon IPC maximum 3%')
                OR valeur like ('Autres'))
                AND mv.idtype = 2;
--Protection occupation
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Protection occupation') AND iddomaineass = 5) AND (valeur like ('24 mois')
                OR valeur like ('60 mois')
                OR valeur like ('Jusqu à 65 ans')
                OR valeur like ('Autres'));
--LT_NOTES
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('LT_NOTE') AND iddomaineass = 5) AND (valeur like ('Salaires de base')
                OR valeur like ('Salaires et dividendes')
                OR valeur like ('Salaires, dividendes et commissions')
                OR valeur like ('Salaires, dividendes, commissions et bonis')
                OR valeur like ('Autres'));

--Assurance maladie complementaire id:7
--Franchise medicaments
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Franchise médicaments') AND iddomaineass = 7) AND (valeur like ('aucune')
                OR valeur like ('25$ ind. / 50$ Fam')
                OR valeur like ('50$ ind. / 100$ Fam')
                OR valeur like ('100$ ind. / 200$ Fam')
                OR valeur like ('Autres'));
--Coassurance médicaments
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Coassurance médicaments') AND iddomaineass = 7) AND (valeur like ('70')
                OR valeur like ('75')
                OR valeur like ('80')
                OR valeur like ('Autres'));
--Mecanisme de substitution
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Mecanisme de substitution') AND iddomaineass = 7) AND (valeur like ('aucune')
                OR valeur like ('Substitution générique')
                OR valeur like ('Substitution générique obligatoire')
                OR valeur like ('Autres'));
--Franchise pour autres frais médicaux
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Franchise pour autres frais médicaux') AND iddomaineass = 7) AND (valeur like ('aucune')
                OR valeur like ('Combinées avec les médicaments')
                OR valeur like ('25$ ind. / 50$ Fam')
                OR valeur like ('50$ ind. / 100$ Fam')
                OR valeur like ('Autres'));
--Coassurance autres frais
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Coassurance autres frais') AND iddomaineass = 7) AND (valeur like ('70')
                OR valeur like ('75')
                OR valeur like ('80')
                OR valeur like ('Autres'));
--Paramédicaux
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Paramédicaux') AND iddomaineass = 7) AND (valeur like ('300')
                OR valeur like ('400')
                OR valeur like ('500')
                OR valeur like ('Autres'));
--Examen de la vue
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Examen de la vue') AND iddomaineass = 7) AND (valeur like ('50$/24mois')
                OR valeur like ('75$/24mois')
                OR valeur like ('1 examen/24mois')
                OR valeur like ('Autres'));
--Verres correcteurs
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Verres correcteurs') AND iddomaineass = 7) AND (valeur like ('200$/24mois')
                OR valeur like ('300$/24mois')
                OR valeur like ('Autres'));
--Maximum payable
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Assurance voyage') AND iddomaineass = 7) AND (valeur like ('1000000')
                OR valeur like ('2000000')
                OR valeur like ('3000000')
                OR valeur like ('5000000')
                OR valeur like ('Autres'));
--Annulation voyage
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Annulation voyage') AND iddomaineass = 7) AND (valeur like ('Annulation et interruption voyage')
                OR valeur like ('aucune')
                OR valeur like ('Annulation 5000$')
                OR valeur like ('Annulation et interruption 5000$')
                OR valeur like ('Autres'));
--Annulation bagages
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Assurance bagages') AND iddomaineass = 7) AND (valeur like ('aucune')
                OR valeur like ('500$')
                OR valeur like ('Autres'));
--Terminaison
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Terminaison') AND iddomaineass = 7) AND (valeur like ('Retraite')
                OR valeur like ('Retraite ou 70ans')
                OR valeur like ('Retraite ou 75ans')
                OR valeur like ('Retraite ou 80ans')
                OR valeur like ('Retraite ou 85ans')
                OR valeur like ('Autres'));

--Soins dentaires id:2
--Franchise
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Franchise') AND iddomaineass = 2) AND (valeur like ('aucune')
                OR valeur like ('25$ ind. / 50$ Fam')
                OR valeur like ('50$ ind. / 100$ Fam')
                OR valeur like ('Autres'));
--Coassurance base
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Coassurance base') AND iddomaineass = 2) AND (valeur like ('70')
                OR valeur like ('80')
                OR valeur like ('90')
                OR valeur like ('100')
                OR valeur like ('Autres'));

--Coassurance Perio/Endo
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Coassurance Perio/Endo') AND iddomaineass = 2) AND (valeur like ('70')
                OR valeur like ('80')
                OR valeur like ('90')
                OR valeur like ('100')
                OR valeur like ('Autres'));
--Coassurance Majeurs
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Coassurance Majeurs') AND iddomaineass = 2) AND (valeur like ('50')
                OR valeur like ('60')
                OR valeur like ('70')
                OR valeur like ('80')
                OR valeur like ('Autres'));
--Coassurance Orthodontie
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Coassurance Orthodontie') AND iddomaineass = 2) AND (valeur like ('50')
                OR valeur like ('60')
                OR valeur like ('70')
                OR valeur like ('80')
                OR valeur like ('Autres'));
--Examen de rappel
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Examen de rappel') AND iddomaineass = 2) AND (valeur like ('5 mois')
                OR valeur like ('6 mois')
                OR valeur like ('9 mois')
                OR valeur like ('12 mois')
                OR valeur like ('Autres'));
--Maximum annuel
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Maximum annuel') AND iddomaineass = 2) AND (valeur like ('1000')
                OR valeur like ('1500')
                OR valeur like ('2000')
                OR valeur like ('Autres'));
--Terminaison
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Terminaison') AND iddomaineass = 2) AND (valeur like ('Retraite')
                OR valeur like ('Retraite ou 70ans')
                OR valeur like ('Retraite ou 75ans')
                OR valeur like ('Retraite ou 80ans')
                OR valeur like ('Retraite ou 85ans')
                OR valeur like ('Autres'));

--Assurance maladies graves id:6
--Employé
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Employé') AND iddomaineass = 6) AND (valeur like ('30000')
                OR valeur like ('50000')
                OR valeur like ('Autres'));
--Conjoint
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Conjoint') AND iddomaineass = 6) AND (valeur like ('10000')
                OR valeur like ('20000')
                OR valeur like ('Autres'));
--Enfants
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Enfants') AND iddomaineass = 6) AND (valeur like ('5000')
                OR valeur like ('10000')
                OR valeur like ('Autres'));
--Nombre de maladies
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Nombre de maladies') AND iddomaineass = 6) AND (valeur like ('25 maladies')
                OR valeur like ('Autres'));
--Maladies préexistantes
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Maladies préexistantes') AND iddomaineass = 6) AND (valeur like ('24 mois avant/24 mois après')
                OR valeur like ('Autres'));
--Terminaison
INSERT INTO "VALEUR_MODALITE_CONTRAT"(idmodalite, idmodvaleur)
    SELECT idmodalite, idmodvaleur FROM "MODALITE", "MODALITES_VALEUR" WHERE (libelleavantage like ('Terminaison') AND iddomaineass = 6) AND (valeur like ('65 ans')
                OR valeur like ('70 ans')
                OR valeur like ('Autres'));

--MODULES--
--INSERT INTO public."MODULE"(idcontrat, iddomaineass) VALUES(1, 1);

--CATEGORIE_MODULE--
--INSERT INTO public."CATEGORIE_MODULE"(idmodule, idcategorie) VALUES(1, 1);

--SOUSCRIPTIONS--
--INSERT INTO public."SOUSCRIPTIONS"(idmodalite, idmodule, valeur) VALUES(1, 1, '');

--ENTREPRISE_ATTR--
INSERT INTO public."ENTREPRISE_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (1, 'Nombre d''employés', 'Indiquez le nombre d''employés', null, 1);
INSERT INTO public."ENTREPRISE_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'Courriel', 'Courriel', null, 'mail@mail.com');
INSERT INTO public."ENTREPRISE_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'Téléphone secondaire', 'Numéro de téléphone secondaire', null, '(819)000-0000');
INSERT INTO public."ENTREPRISE_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'Ext', 'Extension', null, '(819)000-0000');
INSERT INTO public."ENTREPRISE_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'Fax', 'Télécopieur', null, '(819)000-0000');
INSERT INTO public."ENTREPRISE_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'Sous-groupe', 'Entrez la description des sous-groupes', null, 'Sous-groupe');

--ENTREPRISE_FACUL--
INSERT INTO public."ENTREPRISE_FACUL" (idattrentreprise, identreprise, valeur) VALUES (1, 1, 10);
INSERT INTO public."ENTREPRISE_FACUL" (idattrentreprise, identreprise, valeur) VALUES (2, 1, 'test@test.com');
INSERT INTO public."ENTREPRISE_FACUL" (idattrentreprise, identreprise, valeur) VALUES (3, 1, '(819)822-8282');
INSERT INTO public."ENTREPRISE_FACUL" (idattrentreprise, identreprise, valeur) VALUES (4, 1, '(819)822-8282');
INSERT INTO public."ENTREPRISE_FACUL" (idattrentreprise, identreprise, valeur) VALUES (5, 1, '(819)822-8282');
INSERT INTO public."ENTREPRISE_FACUL" (idattrentreprise, identreprise, valeur) VALUES (6, 1, 'Ledemos');

INSERT INTO public."ENTREPRISE_FACUL" (idattrentreprise, identreprise, valeur) VALUES (1, 2, 150);
INSERT INTO public."ENTREPRISE_FACUL" (idattrentreprise, identreprise, valeur) VALUES (2, 2, 'test2@test.com');
INSERT INTO public."ENTREPRISE_FACUL" (idattrentreprise, identreprise, valeur) VALUES (3, 2, '(819)811-8181');
INSERT INTO public."ENTREPRISE_FACUL" (idattrentreprise, identreprise, valeur) VALUES (4, 2, '(819)811-8181');
INSERT INTO public."ENTREPRISE_FACUL" (idattrentreprise, identreprise, valeur) VALUES (5, 2, '(819)811-8181');
INSERT INTO public."ENTREPRISE_FACUL" (idattrentreprise, identreprise, valeur) VALUES (6, 2, 'Lecrew');

--FOURNISSEUR_FAC--
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (1, 'Dividendes', 'Revenus de dividendes assurables ?', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (4, 'PAE', 'Programme d''aide aux employés inclus avec l''ILD ?', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, 'Annulation ?', 'Annulation voyage ?', null, null, '00 000$');
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, 'Bagages ?', 'Assurance bagages ?', null, null, '0 000$');
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, 'Voyage #jours', 'Nombre de jours maximum', null, null, '000');
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, 'Voyage #$', 'Maximum payable', null, null, '00 000 000$');
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, 'Seuil de mutualisation', 'Seuil de mutualisation', null, null, '00 000$');
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, 'Âge maximum en AMC', 'Âge maximum en AMC', null, null, 'ans');
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, '#Mois de garantie', '#Mois de garantie de taux démographique', null, null, 'mois');
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'FORCE', 'Forces', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'FAIBLE', 'Faiblesses', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'MEMO', 'Mémo', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'SERVICES', 'Services', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'AUTRES', 'Autres', null, null);


INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (1, 1, '1278');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (2, 1, 'Oui');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (3, 1, 'Non');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (4, 1, 'Oui');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (5, 1, '50');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (6, 1, '4500');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (7, 1, '800');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (8, 1, '80');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (9, 1, '10');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (10, 1, 'Fond solvable');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (11, 1, 'Pas très stable');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (12, 1, 'A rappeler sous peu');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (13, 1, 'Informatique');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (14, 1, 'RAS');

INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (1, 4, '1278');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (2, 4, 'Non');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (3, 4, 'Non');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (4, 4, 'Oui');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (5, 4, '50');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (6, 4, '4600');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (7, 4, '800');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (8, 4, '80');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (9, 4, '10');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (10, 4, 'Fond solvable');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (13, 4, 'Informatique');
INSERT INTO public."FOURNISSEUR_FACUL" (idattrfournisseur, idfournisseur, valeur) VALUES (14, 4, 'RAS');

--CONTRAT_COLLECTIF_FACUL--
INSERT INTO public."CONTRAT_COLLECTIF_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (4, 'Administrateur', 'AFC est-il administrateur ?', null, 'Non');
INSERT INTO public."CONTRAT_COLLECTIF_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, 'Admissibilité', 'Délai d''amissibilité à l''assurance en mois', null, 0, 'mois');
INSERT INTO public."CONTRAT_COLLECTIF_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, 'Heures minimum', 'Nombre d''heures minimum par semaine', null, 0, 'par semaine');

INSERT INTO public."CONTRAT_COLLECTIF_FACUL" (idattrcontratcoll, idcontrat, valeur) VALUES (1, 1, 'Oui');
INSERT INTO public."CONTRAT_COLLECTIF_FACUL" (idattrcontratcoll, idcontrat, valeur) VALUES (1, 2, '5');
INSERT INTO public."CONTRAT_COLLECTIF_FACUL" (idattrcontratcoll, idcontrat, valeur) VALUES (3, 1, '5');


--CONTACT_CLIENT--
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, idposte_ent, estDecideur) VALUES(1, 2, 1, true);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, idposte_ent, estDecideur) VALUES(2, 4, 1, true);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, idposte_ent, estDecideur) VALUES(2, 3, 4, false);

--MODULE--
INSERT INTO public."MODULE"(iddomaineass, idcontrat, notes) VALUES (1, 1, 'Voici un exemple de module');
INSERT INTO public."MODULE"(iddomaineass, idcontrat, notes) VALUES (3, 1, 'Un autre exemple');

--SOUSCRIPTIONS--
INSERT INTO public."SOUSCRIPTIONS"(idmodule, idmodalite, idmodvaleur, valeur, notes) VALUES(1, 2, 6, null, 'Voici un exmeple de souscription');
INSERT INTO public."SOUSCRIPTIONS"(idmodule, idmodalite, idmodvaleur, valeur, notes) VALUES(1, 3, 12, null, 'Yolooo');

INSERT INTO public."SOUSCRIPTIONS"(idmodule, idmodalite, idmodvaleur, valeur, notes) VALUES(2, 9, 24, null, 'Voici un exmeple de souscription');
INSERT INTO public."SOUSCRIPTIONS"(idmodule, idmodalite, idmodvaleur, valeur, notes) VALUES(2, 14, 1, 'Val_def', 'Yolooo');

--HISTORIQUE_TAUX--
INSERT INTO public."HISTORIQUE_TAUX"(idclient, idfournisseur, annee_dep, annee_fin, vie, dma, pac, ct, lt, amc_ind, amc_mono, amc_couple) VALUES (2, 10, 1990, 1991, 9, 3.5, 76, 95, 65, 56, 37, 91);
INSERT INTO public."HISTORIQUE_TAUX"(idclient, idfournisseur, annee_dep, annee_fin, vie, dma, pac, ct, lt, amc_ind, amc_mono, amc_couple) VALUES (2, 10, 1992, 1993, 3.8, 4, 76, 90, 65, 56, 45, 89);

--REMUNERATIONS--
INSERT INTO public."REMUNERATION"(idclient, idfournisseur, annee_dep, annee_fin, lt, amc, dent, mg, pae, recu, conseiller, dpaye) VALUES (2, 10, 1990, 1991, 24, 67, 98, 45, 90, to_date('1999-09-01', 'YYYY-MM-DD'), 2, to_date('2006-09-01', 'YYYY-MM-DD'));
INSERT INTO public."REMUNERATION"(idclient, idfournisseur, annee_dep, annee_fin, lt, amc, dent, mg, pae, recu, conseiller, dpaye) VALUES (2, 10, 1992, 1993, 24, 67, 98, 45, 67, to_date('2001-09-01', 'YYYY-MM-DD'), 1, to_date('2001-09-01', 'YYYY-MM-DD'));

-----end public schema -----

-----users schema-----
SELECT setval('users."ENTITE_identite_seq"', 1, FALSE);
SELECT setval('users."OPERATION_idoperation_seq"', 1, FALSE);
SELECT setval('users."CONTRAT_COLLECTIF_MENU_idcontratcollmenu_seq"', 1, FALSE);


--AFFICHAGE-CLIENT--
INSERT INTO users."ENTREPRISE_AFFICHAGE"(idattrentreprise, posX, posY, height, width, minwidth, affichage) VALUES (1, 0, 0, 1, 3, 3, true);
INSERT INTO users."ENTREPRISE_AFFICHAGE"(idattrentreprise, posX, posY, height, width, minwidth, affichage) VALUES (2, 3, 0, 1, 3, 3, true);
INSERT INTO users."ENTREPRISE_AFFICHAGE"(idattrentreprise, posX, posY, height, width, minwidth, affichage) VALUES (3, 6, 0, 1, 3, 3, true);
INSERT INTO users."ENTREPRISE_AFFICHAGE"(idattrentreprise, posX, posY, height, width, minwidth, affichage) VALUES (4, 9, 0, 1, 3, 3, true);
INSERT INTO users."ENTREPRISE_AFFICHAGE"(idattrentreprise, posX, posY, height, width, minwidth, affichage) VALUES (5, 0, 1, 1, 3, 3, true);
INSERT INTO users."ENTREPRISE_AFFICHAGE"(idattrentreprise, posX, posY, height, width, minwidth, affichage) VALUES (6, 3, 1, 1, 3, 3, true);

--AFFICHAGE-FOURNISSEUR--
INSERT INTO users."FOURNISSEUR_AFFICHAGE"(idattrfournisseur, posX, posY, height, width, minwidth, affichage) VALUES (1, 0, 0, 1, 3, 3, true);
INSERT INTO users."FOURNISSEUR_AFFICHAGE"(idattrfournisseur, posX, posY, height, width, minwidth, affichage) VALUES (2, 3, 0, 1, 3, 3, true);
INSERT INTO users."FOURNISSEUR_AFFICHAGE"(idattrfournisseur, posX, posY, height, width, minwidth, affichage) VALUES (3, 6, 0, 1, 3, 3, true);
INSERT INTO users."FOURNISSEUR_AFFICHAGE"(idattrfournisseur, posX, posY, height, width, minwidth, affichage) VALUES (4, 9, 0, 1, 3, 3, true);
INSERT INTO users."FOURNISSEUR_AFFICHAGE"(idattrfournisseur, posX, posY, height, width, minwidth, affichage) VALUES (5, 0, 1, 1, 3, 3, true);
INSERT INTO users."FOURNISSEUR_AFFICHAGE"(idattrfournisseur, posX, posY, height, width, minwidth, affichage) VALUES (6, 3, 1, 1, 3, 3, true);
INSERT INTO users."FOURNISSEUR_AFFICHAGE"(idattrfournisseur, posX, posY, height, width, minwidth, affichage) VALUES (7, 6, 1, 1, 3, 3, true);
INSERT INTO users."FOURNISSEUR_AFFICHAGE"(idattrfournisseur, posX, posY, height, width, minwidth, affichage) VALUES (8, 9, 1, 1, 3, 3, true);
INSERT INTO users."FOURNISSEUR_AFFICHAGE"(idattrfournisseur, posX, posY, height, width, minwidth, affichage) VALUES (9, 0, 2, 1, 3, 3, true);
INSERT INTO users."FOURNISSEUR_AFFICHAGE"(idattrfournisseur, posX, posY, height, width, minwidth, affichage) VALUES (10, 3, 2, 1, 3, 3, true);
INSERT INTO users."FOURNISSEUR_AFFICHAGE"(idattrfournisseur, posX, posY, height, width, minwidth, affichage) VALUES (11, 6, 2, 1, 3, 3, true);
INSERT INTO users."FOURNISSEUR_AFFICHAGE"(idattrfournisseur, posX, posY, height, width, minwidth, affichage) VALUES (12, 9, 2, 1, 3, 3, true);
INSERT INTO users."FOURNISSEUR_AFFICHAGE"(idattrfournisseur, posX, posY, height, width, minwidth, affichage) VALUES (13, 0, 3, 1, 3, 3, true);
INSERT INTO users."FOURNISSEUR_AFFICHAGE"(idattrfournisseur, posX, posY, height, width, minwidth, affichage) VALUES (14, 3, 3, 1, 3, 3, true);

--CONTRAT_MENU--
INSERT INTO users."CONTRAT_COLLECTIF_MENU"(idcontratcollmenu, libellemenu) VALUES (1, 'Renseignement généraux sur le client');
INSERT INTO users."CONTRAT_COLLECTIF_MENU"(idcontratcollmenu, libellemenu) VALUES (2, 'Renseignement généraux sur le contrat');
INSERT INTO users."CONTRAT_COLLECTIF_MENU"(idcontratcollmenu, libellemenu) VALUES (3, 'Modules');
INSERT INTO users."CONTRAT_COLLECTIF_MENU"(idcontratcollmenu, libellemenu) VALUES (4, 'Champs facultatifs');

--AFFICHAGE_META_CONTRAT--
INSERT INTO users."CONTRAT_COLLECTIF_AFFICHAGE_META"(idcontratcollmenu, posX, posY, height, width, minwidth, minheight, affichage) VALUES (1, 0, 0, 8, 4, 2, 6, true);
INSERT INTO users."CONTRAT_COLLECTIF_AFFICHAGE_META"(idcontratcollmenu, posX, posY, height, width, minwidth, minheight, affichage) VALUES (2, 5, 0, 11, 5, 3, 7, true);
INSERT INTO users."CONTRAT_COLLECTIF_AFFICHAGE_META"(idcontratcollmenu, posX, posY, height, width, minwidth, minheight, affichage) VALUES (3, 0, 11, 5, 10, 3, 5, true);
INSERT INTO users."CONTRAT_COLLECTIF_AFFICHAGE_META"(idcontratcollmenu, posX, posY, height, width, minwidth, minheight, affichage) VALUES (4, 0, 16, 13, 10, 5, 5, true);

--AFFICHAGE_CONTRAT--
INSERT INTO users."CONTRAT_COLLECTIF_AFFICHAGE"(idattrcontratcoll, posX, posY, height, width, minwidth, affichage) VALUES (1, 0, 0, 3, 3, 3, true);
INSERT INTO users."CONTRAT_COLLECTIF_AFFICHAGE"(idattrcontratcoll, posX, posY, height, width, minwidth, affichage) VALUES (2, 3, 0, 3, 3, 3, true);
INSERT INTO users."CONTRAT_COLLECTIF_AFFICHAGE"(idattrcontratcoll, posX, posY, height, width, minwidth, affichage) VALUES (3, 0, 3, 3, 3, 3, true);

---OPERATION---
INSERT INTO users."OPERATION"(description, level) VALUES ('READ', 1);
INSERT INTO users."OPERATION"(description, level) VALUES ('UPDATE', 2);
INSERT INTO users."OPERATION"(description, level) VALUES ('CREATE', 4);

---MENU---
--INSERT INTO users."ENTITE"(description) VALUES ('Accueil');
--INSERT INTO users."ENTITE"(description) VALUES ('Gestion des accès');
INSERT INTO users."ENTITE"(description, affichage) VALUES ('Gestion des utilisateurs', false);
INSERT INTO users."ENTITE"(description, affichage) VALUES ('Gestion des clients - ACollectives', true);
INSERT INTO users."ENTITE"(description, affichage) VALUES ('Gestion des prospects', false);
INSERT INTO users."ENTITE"(description, affichage) VALUES ('Gestion des fournisseurs', true);
INSERT INTO users."ENTITE"(description, affichage) VALUES ('Gestion des contrats - ACollectives', true);
INSERT INTO users."ENTITE"(description, affichage) VALUES ('Gestion des contrats - AIndiv', false);

---PERMISSIONS---
--Administateur--
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 1, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 1, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 1, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 2, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 2, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 2, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 3, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 3, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 3, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 4, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 4, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 4, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 5, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 5, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 5, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 6, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 6, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 6, 3);

--Associé--
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 2, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 2, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 2, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 4, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 4, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 4, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 5, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 5, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 5, 3);

--Consultant--
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (3, 2, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (3, 4, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (3, 5, 1);

--Employé--
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (4, 2, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (4, 4, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (4, 5, 1);

--Visiteur--
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (5, 2, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (5, 5, 1);

--ADMIN RIGHTS-- (alain)
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 1, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 1, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 1, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 2, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 2, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 2, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 3, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 3, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 3, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 4, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 4, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 4, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 5, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 5, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 5, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 6, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 6, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 6, 3);

--Associé-- (azizou)
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 2, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 2, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 2, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 4, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 4, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 4, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 5, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 5, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 5, 3);

--Consultant-- (maxime)
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (3, 2, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (3, 4, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (3, 5, 1);

--ENDDATATEST

--Employé-- (jean)
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (4, 2, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (4, 4, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (4, 5, 1);

--ENDDATATEST

-----end user schema -----



