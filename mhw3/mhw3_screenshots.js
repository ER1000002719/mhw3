const KEY_RAWG = "key=ab7a5b9fbdc04a96823d553be23f4a29";
const GET_RAWG = "https://api.rawg.io/api/games/";

const GET_SCREENS = "/screenshots?";

var TARGET = "";

function onResponse(response){
    return response.json();
}

function OnJsonImages(json){
    let n_results = json.count;
    if(n_results > 5) n_results=5;
    const div = document.createElement("div");

    for(let i=0;i<n_results;i++){
        const img = document.createElement('img');
        img.src = json.results[i].image;
        TARGET.querySelector(".screenshots").appendChild(img);
    }
}

function getScreens(game){
    REST=GET_RAWG+game+GET_SCREENS+KEY_RAWG;
    fetch(REST, {mode: 'cors'}).then(onResponse).then(OnJsonImages);  
}


function ShowScreens(event){
    TARGET = event.currentTarget.parentElement;
    event.currentTarget.classList.add("hidden");

    getScreens(TARGET.dataset.game);
}

const Boxes = document.querySelectorAll('.screen-container');
for(const div of Boxes){
    div.querySelector('button').addEventListener("click", ShowScreens);
}
