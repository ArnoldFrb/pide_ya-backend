const { Router } = require('express');
const bodyParse = require('body-parser');
const router = Router();
const admin = require('../database');

router.use(bodyParse());

const db = admin.database();

router.post('/api/pedido/create', async (req, res) => {
 
    const { 
        fecha,
        cid,
        sid
    } = req.body;

    const pedidoInf =  {
        fecha: fecha,
        costo: "0",
        estado: "procesando",
        detalle: "",
        cid: cid,
        sid: sid
    }
    
    var pedido = await db.ref('pedidos').push();
        pedido.set(pedidoInf, function(error) {
            if (error) {
                // The write failed...
                res.json('The write failed...');
            } else {
                // Data saved successfully!

                const pedidokey = {
                    pid: pedido.key,
                }

                res.json(pedidokey);
            }
        }
    );  
});

router.post('/api/pedido', async (req, res) => {

    const {
        cid,
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
        if(childData.sid == sid && childData.cid == cid){
            
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

router.post('/api/pedido/update', async (req, res) => {
 
    const {
        pedidoKey,
        costo,
        detalle
    } = req.body;

    const produtoInfo = {
        costo: costo,
        estado: "preparando",
        detalle: detalle
    }
    
    await db.ref('pedidos').child(pedidoKey).update(produtoInfo);
});

router.post('/api/pedido/update_estado', async (req, res) => {
 
    const {
        pedidoKey
    } = req.body;

    const produtoInfo = {
        estado: "enviado",
    }
    
    await db.ref('pedidos').child(pedidoKey).update(produtoInfo);
});

router.post('/api/pedido/update_rechazar', async (req, res) => {
 
    const {
        pedidoKey
    } = req.body;

    const produtoInfo = {
        estado: "rechazado",
    }
    
    await db.ref('pedidos').child(pedidoKey).update(produtoInfo);
});

router.post('/api/pedido/update_aceptar', async (req, res) => {
 
    const {
        pedidoKey
    } = req.body;

    const produtoInfo = {
        estado: "aceptar",
    }
    
    await db.ref('pedidos').child(pedidoKey).update(produtoInfo);
});

router.post('/api/pedido/update_cancelar', async (req, res) => {
 
    const {
        pedidoKey
    } = req.body;

    const produtoInfo = {
        estado: "cancelado",
    }
    
    await db.ref('pedidos').child(pedidoKey).update(produtoInfo);
});

module.exports = router;