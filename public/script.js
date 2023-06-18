const addButton = document.getElementById("add-content-button");
const overlay = document.getElementById("content-popup-background");
const popup = document.getElementById('content-popup');
const closePopup = document.getElementById("form-close");

addButton.addEventListener("click", () => {
  overlay.style.display = "flex";
  popup.style.display = 'flex';
});

closePopup.addEventListener("click", () => {
  overlay.style.display = "none"
});

document.addEventListener('keydown', function(e){
  console.log(e.key);
  if(e.key =='Escape'){
    overlay.style.display = "none";
  }
});

overlay.addEventListener('click', function(event) {
  if (event.target === overlay) {
    overlay.style.display = 'none';
    popup.style.display = 'none';
  }
});

var movieButton = document.getElementById("movie-button");
var tvshowButton = document.getElementById("tvshow-button");
var runtime = document.getElementById("runtime");
var showLength = document.getElementById("show-length");

movieButton.addEventListener("click", function () { //don't show movie options when tv show button is pressed
  runtime.style.display = "flex";
  showLength.style.display = "none";
});

tvshowButton.addEventListener("click", function () { //don't show tv show options when movie button is pressed
  runtime.style.display = "none";
  showLength.style.display = "flex";
});


//retrieving form data

// const mediaType = form.elements['media-type'].value;
// const title = form.elements['title'].value;
// const genre = form.elements['genre'].value;
// const description = form.elements['description'].value;
// const review = form.elements['review'].value;
// const rating = form.elements['rating'].value;
// const runtime = form.elements['runtime'].value;
// const seasons = form.elements['seasons'].value;
// const episodes = form.elements['episodes'].value;
// const favorites = form.elements['favourites'].checked;
// const watched = form.elements['watched'].checked;
// const toWatch = form.elements['to-watch'].checked;

let formData = {
  mediaType,
  title,
  genre,
  description,
  review,
  rating,
  runtime,
  seasons,
  episodes,
  favorites,
  watched,
  toWatch
};

localStorage.setItem('formData', JSON.stringify(formData));

form.reset();
});


const form = document.querySelector('#content-form');

form.addEventListener("submit", function (event) {
event.preventDefault();

if (form.elements.mediaType.value === "movie"){
addMovie(
    form.elements.mediaType.value,
    form.elements.title.value,
    form.elements.genre.value,
    form.elements.description.value,
    form.elements.review.value,
    form.elements.rating.value,
    form.elements.runtime.value,
    form.elements.favorites.value,
    form.elements.watched.value,
    form.elements.toWatch.value
)

}
})

function addMovie(mediaType, title, genre, description, review, rating, runtime, favourites, watched, toWatch) {

  // Creating the object, directly passing in the input parameters
  let movieTrack = {
      mediaType,
      title,
      genre,
      description,
      review,
      rating,
      runtime,
      favourites,
      watched,
      toWatch,
      id: Date.now(),
      date: new Date().toISOString()
  }
  
  let movieTrack = {
    mediaType,
    title,
    genre,
    description,
    review,
    rating,
    runtime,
    favourites,
    watched,
    toWatch,
    id: Date.now(),
    date: new Date().toISOString()
  }
  



  // const mediaType = form.elements['media-type'].value;
// const title = form.elements['title'].value;
// const genre = form.elements['genre'].value;
// const description = form.elements['description'].value;
// const review = form.elements['review'].value;
// const rating = form.elements['rating'].value;
// const runtime = form.elements['runtime'].value;
// const seasons = form.elements['seasons'].value;
// const episodes = form.elements['episodes'].value;
// const favorites = form.elements['favourites'].checked;
// const watched = form.elements['watched'].checked;
// const toWatch = form.elements['to-watch'].checked;


//retrieving form input
  var id = 0 
  
  
  function additem(){
    var name = form.elements['title'].value,
    var type = form.elements['media-type'].value
    var genre = form.elements['genre'].value;
    var description = form.elements['description'].value;
    var review = form.elements['review'].value;
    var rating = form.elements['rating'].value;
    var favorites = form.elements['favourites'].checked;
    var watched = form.elements['watched'].checked;
    var toWatch = form.elements['to-watch'].checked;

  
    var item = (
    { id: id
      , showtype: "movie"
      , name: name
    , length: length
        ...other properties...
    })
  
    if(type == "movie")
      item.runtime = form.elements['runtime'].value;
    }else{
      item.seasons = form.elements['seasons'].value;
      episodes = form.elements['episodes'].value;  
    }
    
    id = id+1 //for id
  
    var mymovies = localstorage.getItem("mymoviedata")
    if(!Array.isArray(mymovies)){ mymovies = [] }
    mymovies.push(item)
    localStorage.setItem("mymoveidata", mymovies)
  
    refreshdisplay()
  }
  
  
  -- How to delete items --
  If you want to delete an item, the easiest way is to filter through it with an id (assign each item added a unique numerical id, by incrementing a global outside, as in the above example). The easiest way to pass this id to the function, is to add a data attribute to the a href / button that is the delete button.
  
  <a href="#" data-id="4">X</a> // This link should have onclick="deleteitem", or preferrably, document.addEventListener('click', deleteitem)
  
  function deleteitem(e){
     var id = Number(e.target.getAttribute("data-id"))
     var mymovies = localstorage.getItem("mymoviedata")
     mymovies = mymovies.filter(m => m.id !== id)
     localStorage.setItem("mymoveidata", mymovies)
  }
  
  
  function refreshdisplay(){
  
  }
  
  
  function filterbyfavourites(){ filterbypredicate(x => x.favourites === true)}
  function filterbywatched(){ filterbypredicate(x => x.type == "movie")}
  function filterbywatched(){ filterbypredicate(x => x.type == "tvshow")}
  function filterbywatched(){ filterbypredicate(x => x.watched === true && x.type == "movie")}
  function filterbywatched(){ filterbypredicate(x => x.watched === true && x.type == "tvshow")}
  function filterbywatched(){ filterbypredicate(x => x.watched === true && x.type == "movie")}
  function filterbywatched(){ filterbypredicate(x => x.watched === true && x.type == "tvshow")}
  
  
  function filterbypredicate(predicate){
    var shows = localstorage.getItem("mymoviedata")
    var show = shows.filter(x => predicate(x)).map(x => x.id)
   var showlist = document.getElementById("showlist")
   childrenasarray(showlist).map(divitem => {
    divitem.style.display = show.includes(Number(divitem.getAttribute("data-show-id"))) ? "block" : "none"
        //relies on the trs having an data-show-id attribute
    })
    })
    }
  
    function childrenasarray(element){ //grabs children of a div, but in an array, because it normally is a HTML collection, that cannot be iterated over (i.e. used in a map/foreach)
      var xs = []
      for(var i = 0; i< element.children.length; i++){
        xs.push(element.children.item(i))
      }
      return xs
    }
    }