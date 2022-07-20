const POPULAR = 'https://api.themoviedb.org/3/movie/popular/';
const APIURL = 'https://api.themoviedb.org/3/movie/';
const KEY = '?api_key=7715948e664c6e129be057fb76a55a6d';
const IMGURL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const NUMBEROF = 20;
document.addEventListener( "DOMContentLoaded", getMovies);

async function getMovies(){
    for(let i = 0; i < NUMBEROF; i++){
        try{
            const movieData = await fetch (POPULAR + KEY, {
            headers: {
                'Accept': 'application/json',
                }
            });
            const movieObj = await movieData.json(); 
            if(!movieObj) throw "empty";
           
         createCard(movieObj, i);
        } catch(err) {
            console.log("Input is " + err);
            i--;
        }
    }
    showMain();
} 

async function getMoviesSearch(query){
        try{
            const movieDataSearch = await fetch ("https://api.themoviedb.org/3/search/movie" +KEY+ "&language=en-US&page=1&include_adult=false&page=1&query=" + query, {
            headers: {
                'Accept': 'application/json',
                }
            });
            const movieSearch = await movieDataSearch.json(); 
            if(!movieSearch) throw "empty";
            
         for (let i = 0; i<movieSearch.results.length; i++){
             try{
                 if(!movieSearch.results[i].poster_path) throw "noImage";
                 createCard(movieSearch, i);
             }
             catch(err){
                console.log("Input is " + err); 
             }
             
         }
         
        } catch(err) {
            console.log("Input is " + err); 
        }
    showMain();
}

function createCard(movie, pos){
    const movieDiv = document.createElement("div"); 
    const imgContainer = document.createElement("div");
    const poster = document.createElement("img");
    const info = document.createElement("div");
    const name = document.createElement("h3");
    const score = document.createElement("span");
    const infoCollapsed = document.createElement("div");
    const overview = document.createElement("strong");
    const overviewText = document.createElement("span");
    const description = document.createElement("span");
    
    const movieid = 'id' + movie.results[pos].id;
    document.getElementById('movieContainer').appendChild(movieDiv);
    movieDiv.setAttribute('class', 'movie');
    
    movieDiv.setAttribute('id', movieid);
    
    document.getElementById(movieid).appendChild(imgContainer);
    imgContainer.setAttribute('class', 'imgContainer');
    
    document.querySelector('#' + movieid + ' .imgContainer').appendChild(poster);
    poster.setAttribute('alt', movie.results[pos].title); 
    poster.setAttribute('src',  IMGURL + movie.results[pos].poster_path);     
}

function showMain(){
    document.getElementById('movieContainer').setAttribute('class', 'fadeIn');
}

function fadeMain(){
    document.getElementById('movieContainer').removeAttribute('class', 'fadeIn');
}

function updateResult(query) {
    let movieContainer = document.getElementById('movieContainer');
    fadeMain();
    movieContainer.innerHTML = "";
    getMoviesSearch(query);
}