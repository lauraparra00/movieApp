/* 
========================================== 
API Urls
========================================== 
*/

const POPULAR = 'https://api.themoviedb.org/3/movie/popular/';
const APIURL = 'https://api.themoviedb.org/3/movie/';
const KEY = '?api_key=7715948e664c6e129be057fb76a55a6d';
const IMGURL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const NUMBEROF = 20;
document.addEventListener("DOMContentLoaded", getMovies);

/* 
========================================== 
Function called at app start getting popular movies 
========================================== 
*/

async function getMovies() {
    for (let i = 0; i < NUMBEROF; i++) {
        try {
            /* call api using Url constants */
            const movieData = await fetch(POPULAR + KEY, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            const movieObj = await movieData.json();
            if (!movieObj) throw "empty";

            /* populate card whith object data */
            createCard(movieObj, i);
        } catch (err) {
            console.log("Input is " + err);
            i--;
        }
    }
    /* function to add opacity */
    showMain();
}

/* 
========================================== 
Function called with the search input 
========================================== 
*/

async function getMoviesSearch(query) {
    try {
        const movieDataSearch = await fetch("https://api.themoviedb.org/3/search/movie" + KEY + "&language=en-US&page=1&include_adult=false&page=1&query=" + query, {
            headers: {
                'Accept': 'application/json',
            }
        });
        const movieSearch = await movieDataSearch.json();
        if (!movieSearch) throw "empty";

        for (let i = 0; i < movieSearch.results.length; i++) {
            try {
                /* control that movie has an image */
                if (!movieSearch.results[i].poster_path) throw "noImage";
                createCard(movieSearch, i);
            } catch (err) {
                console.log("Input is " + err);
            }
        }
    } catch (err) {
        console.log("Input is " + err);
    }
    showMain();
}

/* 
========================================== 
Function to create card and populate with movie data 
========================================== 
*/

function createCard(movie, pos) {
    /* create html elements */
    const movieDiv = document.createElement("div");
    const imgContainer = document.createElement("p");
    const poster = document.createElement("img");

    const name = document.createElement("h4");
    const genre = document.createElement("h6")
    const buttons = document.createElement("span")
        // const description = document.createElement("input");
        // const favorite = document.createElement("input")

    // const score = document.createElement("span");
    // const infoCollapsed = document.createElement("div");
    // const overview = document.createElement("strong");
    // const overviewText = document.createElement("span");
    // const description = document.createElement("span");

    /* add classes and data to html elements */
    const movieid = 'id' + movie.results[pos].id;
    document.getElementById('movieContainer').appendChild(movieDiv);
    movieDiv.setAttribute('class', 'movie');

    movieDiv.setAttribute('id', movieid);

    document.getElementById(movieid).appendChild(imgContainer);
    imgContainer.setAttribute('class', 'imgContainer');

    document.querySelector('#' + movieid + ' .imgContainer').appendChild(poster);
    poster.setAttribute('alt', movie.results[pos].title);
    poster.setAttribute('src', IMGURL + movie.results[pos].poster_path);

    document.querySelector('#' + movieid + ' .imgContainer').appendChild(name);
    name.innerHTML = movie.results[pos].title

    document.querySelector('#' + movieid + ' .imgContainer').appendChild(genre);
    let type = movie.results[pos].genre_ids[0]
    if (type == 28) genre.innerHTML = "-Acción"
    if (type == 12) genre.innerHTML = "-Aventura"
    if (type == 16) genre.innerHTML = "-Animada"
    if (type == 35) genre.innerHTML = "-Comedia"
    if (type == 80) genre.innerHTML = "-Crimen"
    if (type == 99) genre.innerHTML = "-Documental"
    if (type == 18) genre.innerHTML = "-Drama"
    if (type == 10751) genre.innerHTML = "-Familiar"
    if (type == 14) genre.innerHTML = "-Fantasía"
    if (type == 36) genre.innerHTML = "Historia"
    if (type == 27) genre.innerHTML = "-Terror"
    if (type == 10402) genre.innerHTML = "-Musical"
    if (type == 9648) genre.innerHTML = "-Misterio"
    if (type == 10749) genre.innerHTML = "-Romance"
    if (type == 878) genre.innerHTML = "-Ciencia Ficción"
    if (type == 10770) genre.innerHTML = "-Película de TV"
    if (type == 53) genre.innerHTML = "-Suspenso"
    if (type == 10752) genre.innerHTML = "-Guerra"
    if (type == 37) genre.innerHTML = "-Película de vaqueros"
    genre.innerHTML += " / " + movie.results[pos].release_date

    document.querySelector('#' + movieid + ' .imgContainer').appendChild(buttons)
    buttons.innerHTML = `
                        <button class="heart" type="submit" onclick="favorite()" ><svg viewBox="0 0 512 512" width="25" fill="red" title="heart"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" /></svg></button>
                        <input type="button" onclick="location.href='http://google.com';" value="más info"/>
                         
    `
        // document.querySelector('#' + movieid + ' .imgContainer').appendChild(description)
        // description.setAttribute('type', 'button')
        // description.setAttribute('onclick', "location.href='http://google.com';")
        // description.setAttribute('value', "más info")

    //document.querySelector('#' + movied + '.imgContainer').appendChild()

}

function favorite() {
    let button = document.querySelector(".heart")
    button.disabled = true;

}

function showMain() {
    document.getElementById('movieContainer').setAttribute('class', 'fadeIn');
}

function fadeMain() {
    document.getElementById('movieContainer').removeAttribute('class', 'fadeIn');
}

/* 
========================================== 
Function called on change of search input 
========================================== 
*/

function updateResult(query) {
    let movieContainer = document.getElementById('movieContainer');
    fadeMain();
    movieContainer.innerHTML = "";
    getMoviesSearch(query);
}