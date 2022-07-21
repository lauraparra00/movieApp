const KEY = '?api_key=7715948e664c6e129be057fb76a55a6d';
const IMGURL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieid = urlParams.get('movie');
const users = [
    {
        "id": "meetfinicky ",
        "region": "UK",
        "price": "",
    },
    {
        "id": "pausemainmast ",
        "region": "Italy",
        "price": "",
    },
    {
        "id": "haulbedstraw ",
        "region": "Spain",
        "price": "",
    },
    {
        "id": "obsoletewatch ",
        "region": "UK",
        "price": "",
    },
    {
        "id": "faintwinning ",
        "region": "France",
        "price": "",
    },
    {
        "id": "skysurgeon ",
        "region": "Italy",
        "price": "",
    },
    {
        "id": "worklizard ",
        "region": "Spain",
        "price": "",
    },
    {
        "id": "onlyhamster ",
        "region": "Brasil",
        "price": "",
    },
    {
        "id": "regionwasp ",
        "region": "Spain",
        "price": "",
    }
]

/*document.addEventListener( "DOMContentLoaded", getMovies);*/
document.addEventListener( "DOMContentLoaded", getMovie(movieid));

/* 
========================================== 
Function to get specific movie data 
========================================== 
*/
 
async function getMovie(movieid){
        try{
            const movieData = await fetch ("https://api.themoviedb.org/3/movie/"+ movieid + KEY +"&language=en-US", {
            headers: {
                'Accept': 'application/json',
                }
            });
            const movieObj = await movieData.json(); 
            if(!movieObj) throw "empty";
                console.log(movieObj); 
             createMovie(movieObj); 
        } catch(err) {
            console.log("Input is " + err); 
        }
    createTable();
    
}

/* 
========================================== 
Function to populate movie data 
========================================== 
*/

function createMovie(movie){
    document.querySelector('#content .img-movie').setAttribute('src', IMGURL + movie.poster_path);
    document.querySelector('.movieData .title-movie').innerHTML = movie.title;
    document.querySelector('#content .year-movie').innerHTML = movie.release_date;
    document.querySelector('#content .description-movie').innerHTML = movie.overview;
}

function createTable(){
    for(let i=0; i<5; i++){
        let pos = Math.floor(Math.random() * (9 - 0) + 0);
        
        let price = Math.floor(Math.random() * (100 - 1) + 1);
        document.getElementById('user' + i).innerHTML = users[pos].id;
        document.getElementById('region' + i).innerHTML = users[pos].region;
        document.getElementById('price' + i).innerHTML = price + '€';
    }
    
}