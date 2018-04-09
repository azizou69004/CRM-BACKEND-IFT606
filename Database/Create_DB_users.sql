--## SCRIPT DE CREATION DES TABLES Users			###
--## PLATEFORME: PostgreSQL						    ###
--## AUTEURS: Equipe CRM - UdeS A17                 ###
--## DECEMBRE 2017                                  ###
--## COPYRIGHT (c)                                  ###
--#####################################################

DROP TABLE IF EXISTS users."PERMISSIONROLE_GLOB" CASCADE;
DROP TABLE IF EXISTS users."PERMISSIONUTIL_GLOB" CASCADE;
DROP TABLE IF EXISTS users."PERMISSIONROLE_ENTR" CASCADE;
DROP TABLE IF EXISTS users."PERMISSIONUTIL_ENTR" CASCADE;
DROP TABLE IF EXISTS users."PERMISSIONROLE_CONTRCOLL" CASCADE;
DROP TABLE IF EXISTS users."PERMISSIONUTIL_CONTRCOLL" CASCADE;
DROP TABLE IF EXISTS users."PERMISSIONROLE_FOURN" CASCADE;
DROP TABLE IF EXISTS users."PERMISSIONUTIL_FOURN" CASCADE;
DROP TABLE IF EXISTS users."INVITE" CASCADE;
DROP TABLE IF EXISTS users."OPERATION" CASCADE;
DROP TABLE IF EXISTS users."ENTITE" CASCADE;
DROP TABLE IF EXISTS users."CONTRAT_COLLECTIF_AFFICHAGE" CASCADE;
DROP TABLE IF EXISTS users."CONTRAT_COLLECTIF_AFFICHAGE_META" CASCADE;
DROP TABLE IF EXISTS users."CONTRAT_COLLECTIF_MENU" CASCADE;
DROP TABLE IF EXISTS users."ENTREPRISE_AFFICHAGE" CASCADE;
DROP TABLE IF EXISTS users."FOURNISSEUR_AFFICHAGE" CASCADE;
DROP TABLE IF EXISTS users."MODIFICATION_CLIENT" CASCADE;
DROP TABLE IF EXISTS users."RELATION_FOURNISSEUR" CASCADE;
DROP TABLE IF EXISTS users."POSITION" CASCADE;

CREATE TABLE users."ENTITE" (
  identite serial PRIMARY KEY,
  description  varchar(60),
  affichage boolean
);

CREATE TABLE users."POSITION" (
  idposition serial PRIMARY KEY,
  identite  integer REFERENCES users."ENTITE" (identite),
  position varchar(1000)
);

CREATE TABLE users."OPERATION" (
  idoperation serial PRIMARY KEY,
  description  varchar(30),
  level integer
);

CREATE TABLE users."PERMISSIONROLE_GLOB" (
  idrole  integer REFERENCES users."ROLEADM" (idrole),
  identite  integer REFERENCES users."ENTITE" (identite),
  idoperation  integer REFERENCES users."OPERATION" (idoperation),
  CONSTRAINT  pk_PERMISSIONROLE_GLOB  PRIMARY KEY (idrole, identite, idoperation)
);

CREATE TABLE users."PERMISSIONUTIL_GLOB" (
  iduser  integer REFERENCES users."UTILISATEUR" (iduser),
  identite  integer REFERENCES users."ENTITE" (identite),
  idoperation  integer REFERENCES users."OPERATION" (idoperation),
  CONSTRAINT  pk_PERMISSIONUTIL_GLOB  PRIMARY KEY (iduser, identite, idoperation)
);

CREATE TABLE users."PERMISSIONROLE_ENTR" (
  idrole  integer REFERENCES users."ROLEADM" (idrole),
  idattrentreprise  integer REFERENCES public."ENTREPRISE_ATTR" (idattrentreprise),
  idoperation  integer REFERENCES users."OPERATION" (idoperation),
  CONSTRAINT  pk_PERMISSIONROLE_ENTR  PRIMARY KEY (idrole, idattrentreprise, idoperation)
);

CREATE TABLE users."PERMISSIONUTIL_ENTR" (
  iduser  integer REFERENCES users."UTILISATEUR" (iduser),
  idattrentreprise  integer REFERENCES public."ENTREPRISE_ATTR" (idattrentreprise),
  idoperation  integer REFERENCES users."OPERATION" (idoperation),
  CONSTRAINT  pk_PERMISSIONUTIL_ENTR  PRIMARY KEY (iduser, idattrentreprise, idoperation)
);

CREATE TABLE users."PERMISSIONROLE_CONTRCOLL" (
  idrole  integer REFERENCES users."ROLEADM" (idrole),
  idattrcontratcoll  integer REFERENCES public."CONTRAT_COLLECTIF_ATTR" (idattrcontratcoll),
  idoperation  integer REFERENCES users."OPERATION" (idoperation),
  CONSTRAINT  pk_PERMISSIONROLE_CONTRCOLL  PRIMARY KEY (idrole, idattrcontratcoll, idoperation)
);

CREATE TABLE users."PERMISSIONUTIL_CONTRCOLL" (
  iduser  integer REFERENCES users."UTILISATEUR" (iduser),
  idattrcontratcoll  integer REFERENCES public."CONTRAT_COLLECTIF_ATTR" (idattrcontratcoll),
  idoperation  integer REFERENCES users."OPERATION" (idoperation),
  CONSTRAINT  pk_PERMISSIONUTIL_CONTRCOLL  PRIMARY KEY (iduser, idattrcontratcoll, idoperation)
);

CREATE TABLE users."PERMISSIONROLE_FOURN" (
  idrole  integer REFERENCES users."ROLEADM" (idrole),
  idattrfournisseur  integer REFERENCES public."FOURNISSEUR_ATTR" (idattrfournisseur),
  idoperation  integer REFERENCES users."OPERATION" (idoperation),
  CONSTRAINT  pk_PERMISSIONROLE_FOURN  PRIMARY KEY (idrole, idattrfournisseur, idoperation)
);

CREATE TABLE users."PERMISSIONUTIL_FOURN" (
  iduser  integer REFERENCES users."UTILISATEUR" (iduser),
  idattrfournisseur  integer REFERENCES public."FOURNISSEUR_ATTR" (idattrfournisseur),
  idoperation  integer REFERENCES users."OPERATION" (idoperation),
  CONSTRAINT  pk_PERMISSIONUTIL_FOURN  PRIMARY KEY (iduser, idattrfournisseur, idoperation)
);

/*CREATE TABLE users."INVITE" (
  iduser  integer REFERENCES users."UTILISATEUR" (iduser),
  idclient  integer REFERENCES public."CLIENT" (idclient),
  idpersonne  integer REFERENCES public."PERSONNE" (idpersonne),
  CONSTRAINT  pk_INVITE  PRIMARY KEY (iduser, idclient, idpersonne)
);*/

CREATE TABLE users."CONTRAT_COLLECTIF_AFFICHAGE" (
  idattrcontratcoll  integer PRIMARY KEY REFERENCES public."CONTRAT_COLLECTIF_ATTR" (idattrcontratcoll),
  posX integer,
  posY integer,
  height integer,
  width integer,
  minwidth integer,
  affichage  boolean
);

CREATE TABLE users."CONTRAT_COLLECTIF_MENU" (
	idcontratcollmenu serial PRIMARY KEY,
	libellemenu varchar(40)
);

CREATE TABLE users."CONTRAT_COLLECTIF_AFFICHAGE_META" (
  idcontratcollmenu  integer PRIMARY KEY REFERENCES users."CONTRAT_COLLECTIF_MENU" (idcontratcollmenu),
  posX integer,
  posY integer,
  height integer,
  width integer,
  minwidth integer,
  minheight integer,
  affichage  boolean 
);

CREATE TABLE users."FOURNISSEUR_AFFICHAGE" (
  idattrfournisseur  integer PRIMARY KEY REFERENCES public."FOURNISSEUR_ATTR" (idattrfournisseur),
  posX integer,
  posY integer,
  height integer,
  width integer,
  minwidth integer,
  affichage  boolean
);

CREATE TABLE users."ENTREPRISE_AFFICHAGE" (
  idattrentreprise  integer PRIMARY KEY REFERENCES public."ENTREPRISE_ATTR" (idattrentreprise),
  posX integer,
  posY integer,
  height integer,
  width integer,
  minwidth integer,
  affichage  boolean
);

CREATE TABLE users."MODIFICATION_CLIENT" (
  iduser  integer REFERENCES users."UTILISATEUR" (iduser),
  idclient  integer REFERENCES public."CLIENT" (idclient),
  derniere_modification date,
  CONSTRAINT  pk_MODIFICATION_CLIENT  PRIMARY KEY (iduser, idclient) 
);

CREATE TABLE users."RELATION_FOURNISSEUR" (
  idemploye  integer REFERENCES users."EMPLOYE_INT" (idemploye),
  idfournisseur  integer REFERENCES public."FOURNISSEUR" (idfournisseur),
  code_fournisseur varchar(100),
  CONSTRAINT  pk_RELATION_FOURNISSEUR  PRIMARY KEY (idemploye, idfournisseur) 
);