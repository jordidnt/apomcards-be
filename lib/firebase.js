const admin = require('firebase-admin');
const serviceAccount = require('../service-accounts/firebase-account');

module.exports = () => {
    const app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    return app.firestore();
};