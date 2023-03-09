const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
require('dotenv').config();



const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const firebaseMapper = (obj) => {
    let result = {}
    result.id = obj.docs[0].id
    const reducer = (obj, result) => {
        for (let k in obj) {
            if (obj[k].arrayValue) {
                if (Object.keys(obj[k].arrayValue).length) {
                    obj[k].arrayValue.values.forEach((e, i) => {
                        if (i === 0) {
                            result[k] = []
                            result[k][i] = {}
                            reducer(e.mapValue.fields, result[k][i])

                        }
                        else {
                            result[k][i] = {}
                            reducer(e.mapValue.fields, result[k][i])
                        }
                    });
                } else {
                    result[k] = []
                }
            } else {
                if (obj[k].integerValue) { result[k] = obj[k].integerValue }
                else if (obj[k].stringValue) { result[k] = obj[k].stringValue }
            }
        }
    }


    reducer(obj.docs[0]._document.data.value.mapValue.fields, result)
    return result
}
module.exports = { app, db, firebaseMapper }