const { Router } = require('express');
const bodyParse = require('body-parser');
const router = Router();
const admin = require('../database');
const AskStore = require('../models/ask-store');

router.use(bodyParse());

const db = admin.database();

router.post('/api/notific/pedidos', async (req, res) => {

    const {
        cid
    } = req.body;

    var listProductos = [];
    var query = await admin.database().ref("pedidos").orderByKey();
    query.once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        // childData will be the actual contents of the child
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        if(childData.cid == cid){

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

router.post('/api/notific/update_estado', async (req, res) => {
 
    const {
        pedidoKey
    } = req.body;

    const produtoInfo = {
        estado: "comprado",
    }
    
    await db.ref('pedidos').child(pedidoKey).update(produtoInfo);
});

module.exports = router;