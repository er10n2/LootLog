import express from "express";
import axios from 'axios';

const app = express();
let monsterList =[];

app.use(express.static('public'))

app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');


app.get('/', function(req, res){

    res.render('home');
})



async function initializeData(){


    try{

        const response = await axios.get('https://www.dnd5eapi.co/api/2014/monsters');
         monsterList = response.data.results;
console.log("✅ Monster list cached and ready!");

    }catch(error){
console.error("❌ Failed to cache monster list:", error.message);
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


app.listen(3000,function(){
    console.log('listening on port 3000');
})