`use strict`;

const express = require(`express`);
const path = require(`path`);
const favicon = require(`serve-favicon`);
const cookieParser = require(`cookie-parser`);
const bodyParser = require(`body-parser`);
const index = require(`./routes/index`);
const users = require(`./routes/users`);
const attributesManagement = require(`./routes/attributesManagement`);
const login = require(`./routes/login`);
const collectiveContracts = require('./routes/collectiveContract');
const reset = require(`./routes/reset`);
const resetPassword = require(`./routes/resetPassword`);
const fournisseurs = require(`./routes/fournisseurs`);
const assurancesCollectives = require(`./routes/assurancesCollectives`);
const clients = require(`./routes/clients`);
const createCustomer = require(`./routes/createCustomer`);


const usersTest = require(`./routes/usersTest`);
const loginTest = require(`./routes/loginTest`);
const clientsTest = require(`./routes/clientsTest`);
const createCustomerTest = require(`./routes/createCustomerTest`);
const resetPasswordTest = require(`./routes/resetPasswordTest`);
const fournisseursTest = require(`./routes/fournisseursTest`);
const assurancesCollectivesTest = require(`./routes/assurancesCollectivesTest`);
const attributesManagementTest = require(`./routes/attributesManagementTest`);
const app = express();

//view engine setup
app.set(`views`, path.join(__dirname, `views`));
//app.set('view engine', 'jade');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
					   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, `public`)));

app.use(function(req, res, next) {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE,OPTIONS`);
    res.header(`Access-Control-Allow-Headers`, `X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, Origin`);
    res.header(`Access-Control-Allow-Credentials`, `true`);
    next();
});

app.use(`/`, index);
app.use(`/users`, users);
app.use(`/attributesManagement`, attributesManagement);
app.use(`/`, attributesManagementTest);
app.use(`/clients`, clients);
app.use(`/`, login);
app.use(`/`, reset);
app.use(`/`, assurancesCollectives);
app.use(`/`, resetPassword);
app.use(`/`, createCustomer);
app.use(`/usersTest`, usersTest);
app.use(`/clientsTest`, clientsTest);
app.use(`/`, resetPasswordTest);
app.use(`/`, loginTest);
app.use(`/`, assurancesCollectivesTest);
app.use(`/`, createCustomerTest);
app.use(`/`, fournisseursTest);
app.use('/providers', fournisseurs);
app.use('/collectiveContracts', collectiveContracts)


//catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error(`Not Found`);
    err.status = 404;
    next(err);
});

//error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get(`env`) === `development` ? err : {};

    // render the error page
    res.status(err.status || 500);
//	res.render('error');
});

module.exports = app;
