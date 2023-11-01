let movie_container=document.querySelector(".movie_container");
let searchB=document.querySelector("#search");
let nextbtn=document.querySelector(".next");
let previousbtn=document.querySelector(".previous");
let pagenumber=document.querySelector(".page");
let totalpage=1;
let page=1;

searchB.addEventListener("input",async()=>{
    page=1;
    pagenumber.innerText=""
    debouncefun(page);
    
//    let movies= await FetchApi(searchB.value);
//    console.log(movies.Search)
//    let AllResults= await addTomain(movies.Search);
//    movie_container.innerHTML=AllResults.innerHTML
})

nextbtn.addEventListener("click",()=>{
    if(page<totalpage){
        page++;
    }
   
    debouncefun(page);
})
previousbtn.addEventListener("click",()=>{
    if(page>0){
        --page;
    }
    debouncefun(page);
})

async function FetchApi(s){
       let response=await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=4c1e50bb&s=${s}&page=${page}`);
       let movies=await response.json();
       console.log("hi")
       return movies;
}
async function addTomain(listOfMovies){
    try{
        let main_container=document.createElement("div")
    listOfMovies.forEach(element => {
        let container=document.createElement("div");
        container.classList.add("movie-card");
        container.innerHTML=`<img src="${element.Poster}" alt="image unavailable">
        <p class="movie-name">${element.Title}</p>
        <p class="year">${element.Year}</p>
       `;
       main_container.appendChild(container);
 
    });
    return main_container
    }
    catch(e){
        // console.log(e);
        let errorDiv=document.createElement("div");
        errorDiv.innerHTML='<p>movie not found</p>'
        return errorDiv;
    }

}
async function changepage(){
    console.log(page)
    pagenumber.innerText=""
    let movies= await FetchApi(searchB.value,page);
   console.log(movies)
   let AllResults= await addTomain(movies.Search);
   totalpage=movies.totalResults;
   pagenumber.innerText=`page ${page} of ${Math.floor(totalpage/10)}`
   movie_container.innerHTML=AllResults.innerHTML;
}


const debounce=(func,delay)=>{
    let time;
    return (page)=>{
        if(time){
            clearTimeout(time);
        }
        time=setTimeout((page)=>{
            func(page)
        },delay)
    }
}

let debouncefun =debounce(changepage,1000);