const admin = require('firebase-admin');

const  serviceAccount = require("../pide-ya-db-firebase-adminsdk-b7qzn-129a8bb56b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://pide-ya-db.firebaseio.com/'
});

module.exports = admin;

//const auth = admin.auth();
