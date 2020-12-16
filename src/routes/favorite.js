const { Router } = require('express');
const bodyParse = require('body-parser');
const router = Router();
const admin = require('../database');
const AskStore = require('../models/ask-store');

router.use(bodyParse());

const db = admin.database();

router.post('/api/favorite', async (req, res) => {

    const {
        clientekey
    } = req.body;

    var listFavorite = [];
    var query = await admin.database().ref("favoritos").orderByKey();
    query.once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        // childData will be the actual contents of the child
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        if(childData.clientekey == clientekey){
            const producto = {
                favoritekey: key,
                clientekey: childData.clientekey,
                tiendakey: childData.tiendakey,
            }
            listFavorite.push(producto);
        }
    });
    res.json(listFavorite);
    });
});

router.post('/api/favorite/create', async (req, res) => {
 
    const { 
        clientekey,
        tiendakey,
    } = req.body;

    const favoriteInf =  {
        clientekey: clientekey,
        tiendakey: tiendakey,
    }
    
    await db.ref('favoritos').push(favoriteInf,
        function(error) {
            if (error) {
                // The write failed...
                res.json('The write failed...');
            } else {
                res.json("Agregado");
            }
        });
});

router.post('/api/favorite/delete', async (req, res) => {
 
    const { 
        favoritekey
    } = req.body;
    
    await db.ref('favoritos').child(favoritekey).remove()
    .then(function(error){
        if (error) {
            // The write failed...
            res.json('The write failed...');
        } else {
            res.json("Actualizado");
        }
    });;
});

module.exports = router;