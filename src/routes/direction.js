const { Router } = require('express');
const bodyParse = require('body-parser');
const router = Router();
const admin = require('../database');

router.use(bodyParse());

const db = admin.database();

router.post('/api/direction', async (req, res) => {

    const {
        userkey
    } = req.body;

    var listDirection = [];
    var query = await admin.database().ref("direction").orderByKey();
    query.once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        // childData will be the actual contents of the child
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        if(childData.userkey == userkey){
            const directionInf = {
                directionKey: key,
                name: childData.name,
                direction: childData.direction,
                estado: childData.estado,
            }
            listDirection.push(directionInf);
        }
    });
    res.json(listDirection);
    });
});

router.post('/api/direction/create', async (req, res) => {
 
    const { 
        direction,
        name,
        userkey,
    } = req.body;

    const directionInf =  {
        direction: direction,
        name: name,
        estado: "0",
        userkey: userkey,
    }
    
    await db.ref('direction').push(directionInf,
        function(error) {
            if (error) {
                // The write failed...
                res.json('The write failed...');
            } else {
                res.json("Agregado");
            }
        });
});

router.post('/api/direction/update', async (req, res) => {
 
    const {
        directionKey,
        name,
        direction
    } = req.body;

    const directionInf = {
        name: name,
        direction: direction,
    }
    
    await db.ref('direction').child(directionKey).update(directionInf);
});

router.post('/api/direction/update_estado', async (req, res) => {
 
    const {
        directionKey,
        estado
    } = req.body;

    const directionInf = {
        estado: estado,
    }
    
    await db.ref('direction').child(directionKey).update(directionInf);
});

router.post('/api/direction/delete', async (req, res) => {
 
    const { 
        directionKey
    } = req.body;
    
    await db.ref('direction').child(directionKey).remove();
});

module.exports = router;