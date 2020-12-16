const { Router } = require('express');
const bodyParse = require('body-parser');
const router = Router();
const admin = require('../database');

router.use(bodyParse());

const db = admin.database();

router.post('/api/producto', async (req, res) => {

    const {
        pid
    } = req.body;

    var listProductos = [];
    var query = await admin.database().ref("detalle-pedidos").orderByKey();
    query.once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        // childData will be the actual contents of the child
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        if(childData.pid == pid){
            const producto = {
                producoKey: key,
                producto: childData.producto,
                detalle: childData.detalle,
                pid: childData.pid
            }
            listProductos.push(producto);
        }
    });
    res.json(listProductos);
    });
});

router.post('/api/producto/create', async (req, res) => {
 
    const { 
        producto,
        detalle,
        pid
    } = req.body;

    const productoInf =  {
        producto: producto,
        detalle: detalle,
        pid: pid,
    }
    
    await db.ref('detalle-pedidos').push(productoInf,
        function(error) {
            if (error) {
                // The write failed...
                res.json('The write failed...');
            } else {
                res.json("Agregado");
            }
        });
});

router.post('/api/producto/update', async (req, res) => {
 
    const {
        productoKey,
        producto,
        detalle
    } = req.body;

    const produtoInfo = {
        producto: producto,
        detalle: detalle
    }
    
    await db.ref('detalle-pedidos').child(productoKey).update(produtoInfo);
});

router.post('/api/producto/delete', async (req, res) => {
 
    const { 
        productoKey
    } = req.body;
    
    await db.ref('detalle-pedidos').child(productoKey).remove();
});

module.exports = router;