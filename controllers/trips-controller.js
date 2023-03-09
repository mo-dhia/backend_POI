const { doc, getDocs, collection, query, where, setDoc, updateDoc, addDoc, deleteDoc, collectionGroup } = require("firebase/firestore");
const { db } = require("../firebase/config")


exports.addTrip = function (req, res) {
    let { name } = req.body
    name = name[0].toUpperCase() + name.slice(1).toLocaleLowerCase()

    const q = query(collection(db, "points"), where("name", "==", name));

    getDocs(q).then((snap) => {
        if (snap.size) {
            res.send("Trip Already exist")
        } else {
            setDoc(doc(db, "points", name), { ...req.body, size: 0 })
                .then(() => res.send("Added Succesfully"))
        }
    });
};

const deleteTrip = function (req, res) {
    let { name } = req.params
    name = name[0].toUpperCase() + name.slice(1).toLocaleLowerCase()

    // deleteDoc(doc(db, "points", name))
    getDocs(query(collectionGroup(db, name))).then((snap) => {
        if (snap.size) {
            const promises = snap.docs.map((subDoc) => {
                return deleteDoc(doc(db, "points", name, name, subDoc.id))
            });
            Promise.all(promises).then(() => {
                deleteDoc(doc(db, "points", name)).then(() => res.send("DELETED")).catch((err) => err)
            });
        } else {
            res.send("no")
        }
    });
}

exports.getTrips = function (req, res) {
    let categories = [];

    getDocs(collection(db, "points")).then((e) => {
        const allTrips = e.docs.map(el => { return { ...el.data(), id: el.id } })
        console.log(allTrips)
        res.send(allTrips)


    });
};


exports.updateTrip = function (req, res) {
    const { name } = req.params
    const docRef = doc(db, "points", name)
    const updatedName = req.body.name
    if (req.body.size) {
        res.send("you cannot update the size of a trip manually")
    }
    else if (updatedName) {
        getDocs(query(collectionGroup(db, name))).then((snap) => {
            if (snap.size) {
                const promises = snap.docs.map((subDoc) => {
                    let newSubDoc = subDoc.data()
                    newSubDoc.trip = updatedName
                    return setDoc(doc(db, "points", updatedName, updatedName, subDoc.id), newSubDoc)
                });
                Promise.all(promises).then(() => {
                    setDoc(doc(db, "points", updatedName), { ...req.body, size: promises.length })
                        .then(() => { deleteTrip({ params: { name } }); res.send("UPDATED") })


                });
            } else {
                res.send("Trip Not Found")
            }
        });
    } else {
        updateDoc(docRef, req.body).then((e) => {
            res.send(req.body)
        }).catch(err => res.send(err))
    }
};

exports.deleteTrip = deleteTrip;
