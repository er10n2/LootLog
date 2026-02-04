import axios from 'https://cdn.jsdelivr.net/npm/axios@1.7.7/+esm';

const applyBtn = document.querySelector('.apply-btn');
const resultsDiv = document.querySelector('.filteredResults-div');

applyBtn.addEventListener("click", async function(e) {
    e.preventDefault();

    const nameInput = document.querySelector('#name-input').value;
    const status = document.querySelector('#status-select').value;

    resultsDiv.innerHTML = "<p style='text-align:center; width:100%;'>Opening Portal...</p>";

    try {
        const response = await axios.get('/api/filter-characters', {
            params: {
                name: nameInput,
                status: status,
            }
        });

        const characters = response.data;
        resultsDiv.innerHTML = "";

        characters.forEach(char => {
            const charDiv = document.createElement('div');
            charDiv.classList.add('charDivStyle');

            charDiv.innerHTML = `
                <img class="char-img" src="${char.image}" alt="${char.name}">
                <h2 class="char-name">${char.name}</h2>
                <span class="char-status status-${char.status.toLowerCase()}">${char.status}</span>
                <p style="opacity: 0.7; margin-top: 15px; font-size: 0.9rem;">
                    Origin: ${char.species}
                </p>
            `;
            resultsDiv.appendChild(charDiv);
        });

    } catch (error) {
        resultsDiv.innerHTML = "<p style='color: #ff7675; text-align:center; width:100%;'>Failed to connect to the Multiverse.</p>";
    }
});