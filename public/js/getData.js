import axios from 'https://cdn.jsdelivr.net/npm/axios@1.7.7/+esm';

const monsterCard = document.querySelector('.card2');
const spellCard = document.querySelector('.card1');
const abilityCard = document.querySelector('.card3');
const equipmentCard = document.querySelector('.card4');
const bigCard = document.querySelector('.bigCard');


monsterCard.addEventListener("click", async function(){

    bigCard.innerHTML = "Loading...";
    
    try{

      const response = await axios.get('/api/random-monster');

      const monster = response.data;

      console.log(monster);


      bigCard.innerHTML = `

      <div class="infoContainer">



      <div class="monsterNameDiv">

      <h1 class="monsterName">${monster.name}</h1>

      </div>


      <div class="sizeDiv">
      
      <small class="type">Type:</small>
      <small class="typeValue">${monster.type}</small>
       <small class="size">Size:</small>
       <small class="sizeValue">${monster.size}</small>
        <small class="alignment">Alignment:</small>
        <small class="alignmentValue">${monster.alignment}</small>

      </div>


      <div class="monsterImageDiv">

    <img class="monsterImage"src="https://www.dnd5eapi.co${monster.image}" alt="${monster.name}">
 
      </div>



    <div class="tableDiv"> 
    <table class="monsterStatsTable">
        <thead>
            <tr>
                <th>Strength</th>
                <th>Speed</th>
                <th>Intelligence</th>
                <th>Wisdom</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="statValue">${monster.strength}</td>
                <td class="statValue">${monster.speed.walk || '0 ft.'}</td>
                <td class="statValue">${monster.intelligence}</td>
                <td class="statValue">${monster.wisdom}</td>
            </tr>
        </tbody>
    </table>
</div>
      
      
      </div>




      </div>

      
      

      
      `

       


    }catch(error){

        bigCard.innerHTML = "Error loading monster.";

    }
   

})