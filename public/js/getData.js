import axios from 'https://cdn.jsdelivr.net/npm/axios@1.7.7/+esm';

const monsterCard = document.querySelector('.card2');
const spellCard = document.querySelector('.card1');
const abilityCard = document.querySelector('.card3');
const equipmentCard = document.querySelector('.card4');
const bigCard = document.querySelector('.bigCard');


const applyBtn = document.querySelector('.apply-btn');
const filteredResultsDiv = document.querySelector('.filteredResults-div');

const resultsDiv = document.querySelector('.filteredResults-div');



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





spellCard.addEventListener("click", async function(){

    bigCard.innerHTML = "Loading...";

    try {
        const response = await axios.get('/api/random-spell');
        const spell = response.data;

        console.log(spell);

        bigCard.innerHTML = `
        <div class="infoContainer">

            <div class="monsterNameDiv">
                <h1 class="monsterName">${spell.name}</h1>
            </div>

            <div class="sizeDiv">
                <small class="type">Range:</small>
                <small class="typeValue">${spell.range}</small>
                
                <small class="size">Duration:</small>
                <small class="sizeValue">${spell.duration}</small>
                
                <small class="alignment">Level:</small>
                <small class="alignmentValue">${spell.level}</small>
            </div>

            <div class="tableDiv"> 
                <table class="monsterStatsTable">
                    <thead>
                        <tr>
                            <th>Casting Time</th>
                            <th>School</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="statValue">${spell.casting_time}</td>
                            <td class="statValue">${spell.school.name}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="descriptionDiv" style="margin-top: 20px; padding: 0 20px; text-align: center;">
                <small class="type">Description:</small>
                <p style="color: #3d2b1f; line-height: 1.4;">${spell.desc}</p>
            </div>

        </div>
        `;

    } catch(error) {
        bigCard.innerHTML = "Error loading spell.";
    }
});



equipmentCard.addEventListener("click", async function(){

    bigCard.innerHTML = "Loading...";


    try {
        const response = await axios.get('/api/random-equipment');
        const equipment = response.data;
        
    
        bigCard.innerHTML = `
        <div class="infoContainer">

            <div class="monsterNameDiv">
                <h1 class="monsterName">${equipment.name}</h1>
            </div>

            <div class="sizeDiv">
                <small class="type">Category:</small>
                <small class="typeValue">${equipment.equipment_category.name}</small>
                
                <small class="size">Weight:</small>
                <small class="sizeValue">${equipment.weight} lbs</small>
                
                <small class="alignment">Cost:</small>
                <small class="alignmentValue">${equipment.cost.quantity} ${equipment.cost.unit}</small>
            </div>

            

            <div class="tableDiv"> 
                <table class="monsterStatsTable">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="statValue">Equipment Type</td>
                            <td class="statValue">${equipment.weapon_category || 'Adventuring Gear'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        `;

    } catch(error) {
        bigCard.innerHTML = "Error loading equipment.";
    }
});




abilityCard.addEventListener("click", async function(){
    bigCard.innerHTML = "Loading...";

    try {
        const response = await axios.get('/api/random-magic-item');
        const item = response.data;

        bigCard.innerHTML = `
        <div class="infoContainer">
            <div class="monsterNameDiv">
                <h1 class="monsterName">${item.name}</h1>
            </div>

            <div class="sizeDiv">
                <small class="type">Category:</small>
                <small class="typeValue">${item.equipment_category.name}</small>
                <small class="size">Rarity:</small>
                <small class="sizeValue">Magic Item</small>
            </div>

            <div class="descriptionDiv" style="margin-top: 20px; padding: 0 20px; text-align: center;">
                <small class="type">Description:</small>
                <p style="color: #3d2b1f; line-height: 1.4; max-height: 300px; overflow-y: auto;">
                    ${item.desc}
                </p>
            </div>
        </div>
        `;

    } catch(error) {
        bigCard.innerHTML = "Error loading Magic Item.";
    }
});





applyBtn.addEventListener("click", async function(e){

    e.preventDefault();

   const nameInput = document.querySelector('#name-input').value;
   const status = document.querySelector('#status-select').value;





    try{

        const response = await axios.get('/api/filter-characters',{
            params:{
                name: nameInput,
                status: status,
            }
        });

        const characters =  response.data;


        resultsDiv.innerHTML = "";

        characters.forEach(char =>{

            const charDiv = document.createElement('div');

            charDiv.classList.add('charDivStyle');


         charDiv.innerHTML = `
        <img class="char-img" src="${char.image}" alt="${char.name}">
        <h2 class="char-name">${char.name}</h2>
        <span class="char-status">${char.status}</span>
        <p style="font-family: 'Almendra'; color: #6b4e31; margin-top: 10px;">
            Species: ${char.species}
        </p>
    `;
            resultsDiv.appendChild(charDiv);

            

        })


    }catch(error){
console.log(error);
    }




})