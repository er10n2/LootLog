import express from "express";
import axios from 'axios';

const app = express();

const PORT = process.env.PORT || 3000;
let monsterList =[];
let spellsList = [];
let equipmentList = [];
let magicItemsList = [];

const monsterSizes = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"];

const monsterTypes = [
    "aberration", "beast", "celestial", "construct", "dragon", 
    "elemental", "fey", "fiend", "giant", "humanoid", 
    "monstrosity", "ooze", "plant", "undead", "swarm"
];


app.use(express.static('public'))

app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');


app.get('/', function(req, res){

    res.render('home', {
        sizes: monsterSizes,
        types: monsterTypes,
    });
})



async function initializeData(){
    try {
        
        const [monsters, spells, equipment, magicItems] = await Promise.all([
            axios.get('https://www.dnd5eapi.co/api/2014/monsters'),
            axios.get('https://www.dnd5eapi.co/api/2014/spells'),
            axios.get('https://www.dnd5eapi.co/api/2014/equipment'),
            axios.get('https://www.dnd5eapi.co/api/2014/magic-items'),
        ]);

        monsterList = monsters.data.results;
        spellsList = spells.data.results;
        equipmentList = equipment.data.results;
        
        magicItemsList = magicItems.data.results; 
        
        console.log(monsterList);
        console.log("monster list loaded:", monsterList.length);



      

        console.log("✅ All D&D data lists are ready!");

    } catch(error) {
        console.error("❌ Failed to cache data:", error.message);
    }
}

initializeData();



app.get('/api/random-monster', async (req, res) => {

    if (monsterList.length === 0) {
        return res.status(503).json({ error: "Data is still loading, try again in a second." });
    }

    try {
        
        const randomSelection = monsterList[Math.floor(Math.random() * monsterList.length)];
        
    
        const detailResponse = await axios.get(`https://www.dnd5eapi.co${randomSelection.url}`);
        res.json(detailResponse.data);
    } catch (error) {
        res.status(500).json({ error: "Failed" });
    }
});



app.get('/api/random-spell', async (req, res)=>{


    if(spellsList.length === 0){

        return res.status(503).json({error: "Data is still loading, try again in a second."});

    }

    try{

        const  randomSelection = spellsList[Math.floor(Math.random()* spellsList.length)];

        const detailResponse = await axios.get(`https://www.dnd5eapi.co${randomSelection.url}`);

        res.json(detailResponse.data);


    }catch(error){
        res.status(500).json({error: "Failed"});
    }


});



app.get('/api/random-equipment', async (req, res)=>{

    if(equipmentList.length === 0 ){

        return res.status(503).json({error: "Data is still loading, try again in a second."});

    }

    try{

        const randomSelection = equipmentList[Math.floor(Math.random()*equipmentList.length)];


        const detailResponse = await axios.get(`https://www.dnd5eapi.co${randomSelection.url}`);


        res.json(detailResponse.data);



    }catch(error){

         res.status(500).json({error: "Failed"});

    }

    


})



app.get('/api/random-magic-item', async (req, res) => {
    if (magicItemsList.length === 0) {
        
        return res.status(503).json({ error: "Loading..." });

    }

    try {
        const randomSelection = magicItemsList[Math.floor(Math.random() * magicItemsList.length)];
        const detailResponse = await axios.get(`https://www.dnd5eapi.co${randomSelection.url}`);
        res.json(detailResponse.data);
    } catch (error) {
        res.status(500).json({ error: "Failed" });
    }
});






app.get('/api/filter-characters', async (req, res)=>{


    const name = req.query.name;
    const status = req.query.status;

    try{

        const response = await axios.get('https://rickandmortyapi.com/api/character/',{
            params:{
                name :name,
                status : status,
            }
        })

        res.json(response.data.results);


    }catch(error){

        if(error.response && error.response.status === 404){
            res.status(404).json({messgae: "No character found!"})

        }else {
            res.status(500).json({ message: "Server error" });
        }

    }


})






app.listen(PORT, function() {
    console.log(`✅ Server is running on port ${PORT}`);
});