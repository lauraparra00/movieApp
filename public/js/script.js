/* 
========================================== 
API Urls
========================================== 
*/

const POPULAR = 'https://api.themoviedb.org/3/movie/popular/';
const APIURL = 'https://api.themoviedb.org/3/movie/';
const KEY = '?api_key=7715948e664c6e129be057fb76a55a6d';
const IMGURL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const NUMBEROF = 25;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const genre = urlParams.get('genre')

/*document.addEventListener( "DOMContentLoaded", getMovies);*/
document.addEventListener( "DOMContentLoaded", getMoviesbyGenres(genre));

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

/* 0: {id: 28, name: 'Action'}
1: {id: 12, name: 'Adventure'}
2: {id: 16, name: 'Animation'}
3: {id: 35, name: 'Comedy'}
4: {id: 80, name: 'Crime'}
5: {id: 99, name: 'Documentary'}
6: {id: 18, name: 'Drama'}
7: {id: 10751, name: 'Family'}
8: {id: 14, name: 'Fantasy'}
9: {id: 36, name: 'History'}
10: {id: 27, name: 'Horror'}
11: {id: 10402, name: 'Music'}
12: {id: 9648, name: 'Mystery'}
13: {id: 10749, name: 'Romance'}
14: {id: 878, name: 'Science Fiction'}
15: {id: 10770, name: 'TV Movie'}
16: {id: 53, name: 'Thriller'}
17: {id: 10752, name: 'War'}
18: {id: 37, name: 'Western'} */

async function getMoviesbyGenres(genre) {
    for (let i = 1; i < NUMBEROF; i++) {
        try {
            const movieDataSearch = await fetch("https://api.themoviedb.org/3/discover/movie" + KEY + "&include_adult=false&page=" + i + "&sort_by=revenue.desc&primary_release_year=2007|2006|2005|2004|2003|2002|2001|2000|1999|1998|1997|1996|1995|1994|1993|1992|1991|1990|1989|1988|1987|1986|1985|1984", {
                headers: {
                    'Accept': 'application/json',
                }
            });
            const movieSearch = await movieDataSearch.json();
            if (!movieSearch) throw "empty";

            for (let j = 0; j < movieSearch.results.length; j++) {
                try {
                    /* control that movie has an image */
                    if (!movieSearch.results[j].poster_path) throw "noImage";

                    for (let k = 0; k < movieSearch.results[j].genre_ids.length; k++) {
                        if (movieSearch.results[j].genre_ids[k] == genre) {
                            createCard(movieSearch, j);
                        }
                    };
                } catch (err) {
                    console.log("Input is " + err);
                }
            }
        } catch (err) {
            console.log("Input is " + err);
        }
    }
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

    const anchor = document.createElement("a");
    const movieDiv = document.createElement("div"); 
    const imgContainer = document.createElement("div");
    const poster = document.createElement("img");

    const name = document.createElement("h4");
    const genre = document.createElement("li")
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
    document.getElementById('movieContainer').appendChild(anchor);
    anchor.setAttribute('href', "detalle.html?movie=" + movie.results[pos].id); 
    
    anchor.appendChild(movieDiv);
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
    if (type == 28) genre.innerHTML = "Acción"
    if (type == 12) genre.innerHTML = "Aventura"
    if (type == 16) genre.innerHTML = "Animada"
    if (type == 35) genre.innerHTML = "Comedia"
    if (type == 80) genre.innerHTML = "Crimen"
    if (type == 99) genre.innerHTML = "Documental"
    if (type == 18) genre.innerHTML = "Drama"
    if (type == 10751) genre.innerHTML = "Familiar"
    if (type == 14) genre.innerHTML = "Fantasía"
    if (type == 36) genre.innerHTML = "Historia"
    if (type == 27) genre.innerHTML = "Terror"
    if (type == 10402) genre.innerHTML = "Musical"
    if (type == 9648) genre.innerHTML = "Misterio"
    if (type == 10749) genre.innerHTML = "Romance"
    if (type == 878) genre.innerHTML = "Ciencia Ficción"
    if (type == 10770) genre.innerHTML = "Película de TV"
    if (type == 53) genre.innerHTML = "Suspenso"
    if (type == 10752) genre.innerHTML = "Guerra"
    if (type == 37) genre.innerHTML = "Película de vaqueros"
    genre.innerHTML += " / " + movie.results[pos].release_date

    document.querySelector('#' + movieid + ' .imgContainer').appendChild(buttons)
    buttons.innerHTML = `
                        <button class="button" type="submit" onclick="favorite(${movieid})" ><svg viewBox="0 0 512 512" width="18" fill="#d7ff00" title="heart"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" /></svg></button>
                        `
}

function favorite(movieid) {
    let button = document.querySelector('#' + movieid + ' .button')
    button.setAttribute('disabled', 'true');

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