const form = document.getElementById("searchForm");
const formText = document.getElementById("formtext");
const inResponse = document.getElementById("inResponse");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    value = formText.value;
    renderUI(value);
});

const apiKey = "d45cca5c";

async function searchMovie(movieTitle) {
    const url = `https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

function renderUI(value) {
    if(value.trim()==""){
        inResponse.innerHTML = "";
        inResponse.innerHTML = `<p>Film daxil edin</p>`;
        return;
    }
    searchMovie(`${value}`).then((data) => {
        inResponse.innerHTML = "";
        let addType=``
        let movieType=data.Genre.split(',');
        for (let i = 0; i < movieType.length; i++) {
            const element = movieType[i];
            
            addType+=`<div class="type"><span>${element}</span></div>`
        }
        inResponse.innerHTML = `
        <div class="card">
            <div class="card__head">
                <div class="card__head__left">
                    <img src="${data.Poster}" alt="">
                </div>
                <div class="card__head__right">
                    <div class="card__head__right__top">
                        <h2>${data.Title}</h2>
                        <p class="reting"><i class="fa-solid fa-star" style="color: #FFD43B;"></i>   <span>${data.imdbRating}</span></p>
                        <p class="otherinfo"><span>${data.Rated}</span> <span>${data.Year}</span> <span>${data.Director}</span></p>
                    </div>
                    <div class="card__head__right__bottom">
                        ${addType}
                    </div>
            </div>
            </div>
            <div class="card__bottom">
                <h5>Plot:</h5>
                <p>${data.Plot}</p>
                <h5>Cast:</h5>
                <p>${data.Actors}</p>
            </div>
        </div>
    `;
    }).catch((error) => {
        console.error( error);
        inResponse.innerHTML = `<p>Duzgun Film adi daxil edin</p>`;
    });
}