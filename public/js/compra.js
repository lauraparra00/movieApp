const IMGURL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const poster = urlParams.get('poster');

document.addEventListener( "DOMContentLoaded", getPoster(poster));

function getPoster(poster){
    document.getElementById('img-compra').setAttribute('src', IMGURL + poster);
}