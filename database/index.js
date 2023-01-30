const admin = require("firebase-admin");

const serviceAccount = require("./dory-malware-firebase-adminsdk-hpq4l-991826b3ff.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dory-malware-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

module.exports = db;


