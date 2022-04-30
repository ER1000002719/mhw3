const Client_id = "9f572b0077af458e92b54aec175daf4c";
const Client_secret = "d33c9b798d5642e69f36cb3d555bd0a4";
const url = "https://api.spotify.com/v1/playlists/";
const playlist_id = "37i9dQZF1DXdfOcg1fm0VG";

let token;

function onResponse(response){
    return response.json();
}

function onToken(accessToken){
    token = accessToken.access_token;
}

function onJson(json){
    playlist = json.tracks;

    do{
    num = Math.floor(Math.random() * (playlist.total + 1));
    iframe = document.querySelector("iframe");
    img = document.querySelector("#album img");
    h1 = document.querySelector("#album h1");

    iframe.src = playlist.items[num].track.preview_url;
    img.src = playlist.items[num].track.album.images[1].url;
    h1.innerHTML = playlist.items[num].track.name;
    }while(playlist.items[num].track.preview_url === null)

    document.querySelector("#album").classList.remove("hidden");
    document.querySelector('.play').classList.add("hidden");
}

function playMusic(event){
    const restURL = url + playlist_id;

    fetch(restURL,{ 
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
        }
    }   
    ).then(onResponse).then(onJson);
}

fetch("https://accounts.spotify.com/api/token",
{
    method:"post",
    body: 'grant_type=client_credentials',
    headers:{
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(Client_id + ':' + Client_secret)
    }
}
).then(onResponse).then(onToken);

document.querySelector('.play').addEventListener('click', playMusic);