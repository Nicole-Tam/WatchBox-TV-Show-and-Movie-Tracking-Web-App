refreshdisplay(); //refreshes browser content so that preexisting content shows when browser is opened.

const addButton = document.getElementById("add-content-button");
const overlay = document.getElementById("content-popup-background");
const popup = document.getElementById('content-popup');
const closePopup = document.getElementById("form-close");
const form = document.getElementById("content-form");

const closeDetails = document.getElementById("detail-close");
var detailOverlay = document.getElementById("detail-overlay");
var contentRow = document.getElementsByClassName("display-content");


addButton.addEventListener("click", () => { //reset form whenever it's opened again.
  form.reset();
  overlay.style.display = "flex";
  popup.style.display = 'flex';
});

closePopup.addEventListener("click", () => {
  overlay.style.display = "none"
});

document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key == 'Escape') {
    overlay.style.display = "none";
  }
});

overlay.addEventListener('click', function (event) {
  if (event.target === overlay) {
    overlay.style.display = 'none';
    document.getElementById("content-form").reset();
  }
});

detailOverlay.addEventListener('click', function (event) {
  if (event.target === detailOverlay) {
    detailOverlay.style.display = 'none';
  }
});

closeDetails.addEventListener("click", () => {
  detailOverlay.style.display = "none";
});

const movieButton = document.getElementById("movie-button");
const tvshowButton = document.getElementById("tvshow-button");
const runtimeInput = document.getElementById("runtime");
const showLength = document.getElementById("show-length");
movieButton.addEventListener("click", function () { //don't show movie options when tv show button is pressed
  runtimeInput.style.display = "flex";
  showLength.style.display = "none";
  movieButton.id = "movie-button-checked"
  tvshowButton.id = "tvshow-button";
});

tvshowButton.addEventListener("click", function () { //don't show tv show options when movie button is pressed
  runtimeInput.style.display = "none";
  showLength.style.display = "flex";
  tvshowButton.id = "movie-button-checked";
  movieButton.id = "movie-button";
});

var detailOverlay = document.getElementById("detail-overlay");
var contentRow = document.getElementsByClassName("display-content");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  additem();
  overlay.style.display="none";
  
}
)

  //retrieving form input
function showDetails(e){
  var item = getMovieData()[Number(e.target.getAttribute("data-id"))];
  document.querySelector(".content-title").textContent=item.name;
  detailOverlay.style.display="flex";
  console.log("click",e)
}

  var id = 0

  function additem() {
    var name = form.elements['title'].value
    var type = form.elements['media-type'].value
    var genre = form.elements['genre'].value
    var description = form.elements['description'].value
    var review = form.elements['review'].value
    var rating = form.elements['rating'].value
    var favorites = form.elements['favourites'].checked
    var watched = form.elements['watched'].checked
    var toWatch = form.elements['to-watch'].checked

var item = (
  {
    id: id,
     mediatype: type,
      name,
      genre,
      description,
      review,
      rating,
      favourites,
      watched,
      toWatch
  })

  console.log(item,"item")

if (type === "movie"){
    item.runtime = form.elements['runtime'].value;
}else {
  item.seasons = form.elements['seasons'].value;
  item.episodes = form.elements['episodes'].value;
}
  }

id = id + 1 //so each item has different id (for deletion)

var myMovies = getMovieData();
console.log("myMovies",myMovies)
if (!Array.isArray(myMovies)) { myMovies = [] }
myMovies.push(item)
setMovieData(myMovies)

function showItem(item){
  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
  var icon = document.createElement("img")
  td1.textContent="";
  td1.appendChild(icon);
  td1.classList.add("icon")
  var h2=document.createElement("h2");
  h2.textContent=item.name;
  td2.appendChild(h2)
  var review = document.createElement("span");
  review.textContent = item.review;
  td2.appendChild(review);
  td3.textContent=item.genre.slice(0,1).toUpperCase()+item.genre.slice(1);  //turns first letter to upper case
  td4.textContent=item.rating;
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  document.getElementById("content-table").children.item(1).appendChild(tr);
  
  tr.addEventListener("click", showDetails)
  tr.setAttribute("data-id", item.id)

  if (item.mediatype === "movie"){
    icon.setAttribute("src","assets/movie-icon.svg")
     td5.innerHTML=item.runtime + " Minutes";
  } else {
    icon.setAttribute("src","assets/tvshow.svg")
    td5.innerHTML='Season: ' + item.seasons +"<br>" + 'Episode: ' + item.episodes;
  }
  
  var whitespace = document.createElement("tr");
  var whitespacetd = document.createElement("td");
  whitespace.classList.add("whitespace");
  whitespacetd.setAttribute("colspan", 5);
  whitespace.appendChild(whitespacetd);
  document.getElementById("content-table").children.item(1).appendChild(whitespace);
 }


 function getMovieData(){
  return (JSON.parse(localStorage.getItem("myMovieData")) ?? []); //so that refreshDisplay doesn't show an error when myMovieData is empty
  
 }

 function setMovieData(myMovies){
  localStorage.setItem("myMovieData", JSON.stringify(myMovies));
 }

 function deleteItem(e) {
    var id = Number(e.target.getAttribute("data-id"));
    var myMovies = getMovieData();
    myMovies = myMovies.filter(m => m.id !== id);
    setMovieData(myMovies);
  }


function refreshdisplay() {
  var table = document.getElementById("content-table").children.item(1);
  console.log(table,"table")
  for(var i = 1; i<table.children.length;i++){
    table.removeChild(table.children.item(i));
  } 
  getMovieData().map(showItem);
}

document.getElementById("filter-all").addEventListener("click", filterbyAll)
document.getElementById("filter-favourites").addEventListener("click", filterbyFavourites)
document.getElementById("filter-movies").addEventListener("click", filterbyMovies)
document.getElementById("filter-to-watch-movies").addEventListener("click", filterbyToWatchMovies)
document.getElementById("filter-watched-movies").addEventListener("click", filterbyWatchedMovies)
document.getElementById("filter-shows").addEventListener("click", filterbyShows)
document.getElementById("filter-to-watch-shows").addEventListener("click", filterbyToWatchShows)
document.getElementById("filter-watched-shows").addEventListener("click", filterbyWatchedShows)

function filterbyAll() { filterbyPredicate(x => true) }
function filterbyFavourites() { filterbyPredicate(x => x.favourites === true) }
function filterbyMovies() { filterbyPredicate(x => x.mediatype === "movie") }
function filterbyToWatchMovies() { filterbyPredicate(x => x.toWatch === true && x.mediatype === "movie") }
function filterbyWatchedMovies() { filterbyPredicate(x => x.watched === true && x.mediatype === "movie") }
function filterbyShows() { filterbyPredicate(x => x.mediatype === "tvshow") }
function filterbyToWatchShows() { filterbyPredicate(x => x.toWatch === true && x.mediatype === "tvshow") }
function filterbyWatchedShows() { filterbyPredicate(x => x.watched === true && x.mediatype === "tvshow")}


function filterbyPredicate(predicate) {
  var shows = getMovieData();
  var show = shows.filter(x => predicate(x)).map(x => x.id)
  var showlist = document.getElementById("content-table").children.item(1);
  console.log(show, "show")
  childrenasArray(showlist).map(divitem => {
    divitem.style.display = show.includes(Number(divitem.getAttribute("data-id"))) ? "block" : "none"
    //relies on the trs having an data-show-id attribute
  })
};

function childrenasArray(element) { //grabs children of a div, but in an array, because it normally is a HTML collection, that cannot be iterated over (i.e. used in a map/for each)
  var xs = []
  for (var i = 0; i < element.children.length; i++) {
    xs.push(element.children.item(i))
  }
  return xs
};