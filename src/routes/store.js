const { Router } = require('express');
const bodyParse = require('body-parser');
const router = Router();
const admin = require('../database');
const AskStore = require('../models/ask-store');

router.use(bodyParse());

const db = admin.database();

router.post('/api/store/pedidos', async (req, res) => {

    const {
        sid
    } = req.body;

    var listProductos = [];
    var query = await admin.database().ref("pedidos").orderByKey();
    query.once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        // childData will be the actual contents of the child
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        if(childData.sid == sid){

            const producto = {
                cid: childData.cid,
                costo: childData.costo,
                fecha: childData.fecha,
                estado: childData.estado,
                detalle: childData.detalle,
                sid: childData.sid,
                pid: key
            }

            listProductos.push(producto);
        }
    });
    res.json(listProductos);
    });
});

router.post('/api/store/users', async (req, res) => {

    const { uid } = req.body;
    
    await db.ref('user-details').once('value', (snapshot) => {
        var HasDisplayName = snapshot.child(uid+"/displayName").val();
        var hasDirection = snapshot.child(uid+"/direction").val();
        var hasPhoneNumber = snapshot.child(uid+"/phoneNumber").val();

        const userInf = {
            displayName: HasDisplayName,
            phoneNumber: hasPhoneNumber,
            direction: hasDirection
        }

        res.json(userInf);
    });
});

module.exports = router;