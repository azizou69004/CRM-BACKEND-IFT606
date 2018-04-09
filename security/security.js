var db = require(`../models/index`);
var squelb = require(`squel`);
var squel = squelb.useFlavour(`postgres`);

var security = {};
security.checkRights = function(iduser, entity, levelRequired) {
    return new Promise((resolve, reject) => {
        var getRights = squel.select()
            .from(`users."PERMISSIONUTIL_GLOB"`, `perm`)
            .left_join(`users."UTILISATEUR"`, `util`, `perm.iduser = util.iduser`)
            .left_join(`users."OPERATION"`, `op`, `perm.idoperation = op.idoperation`)
            .left_join(`users."ENTITE"`, `ent`, `perm.identite = ent.identite`)
            .field(`op.description`)
            .where(squel.expr()
                .and(`util.iduser = ` + iduser)
                .and(`ent.description = '` + entity + `'`)
            );
        console.log(getRights.toString());

        db.any(getRights.toString())
            .then(rights => {
                var level = 0;
                rights.forEach(function(right) {
                    switch (right.description) {
                        case `READ` :
                            level += 1;
                            break;
                        case `UPDATE` :
                            level += 2;
                            break;
                        case `CREATE` :
                            level += 4;
                            break;
                        default :
                            break;
                    }
                });
                console.log(level);
                if (level >= levelRequired) {
                    resolve();
                } else {
                    reject(`L'utilisateur ne possède pas les droits suffisants`);
                }
                console.log(rights);
            })
            .catch(error => {
                reject(error); // print error;
            });
    });
};

module.exports = security;
