refreshdisplay(); //refreshes browser content so that preexisting content shows when browser is opened.

const addButton = document.getElementById("add-content-button");
const overlay = document.getElementById("content-popup-background");
const popup = document.getElementById('content-popup');
const closePopup = document.getElementById("form-close");
const form = document.getElementById("content-form");

const closeDetails = document.getElementById("detail-close");
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
  
id = id + 1 //so each item has different id (for deletion)

if (type === "movie"){
    item.runtime = form.elements['runtime'].value;
}else {
  item.seasons = form.elements['seasons'].value;
  item.episodes = form.elements['episodes'].value;
}
  var myMovies = getMovieData();
  myMovies.push(item);
  setMovieData(myMovies);
  refreshdisplay();
}




function showItem(item){
  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
  var icon = document.createElement("img")
  tr.classList.add("display-content");
  td1.textContent="";
  td1.appendChild(icon);
  td1.classList.add("icon", "headers", "type-row");
  var title=document.createElement("h3");
  title.classList.add("movie-title");
  title.textContent=item.name;
  td2.appendChild(title)
  td2.classList.add("headers", "review-row");
  var review = document.createElement("span");
  review.textContent = item.review;
  td2.appendChild(review);
  td3.textContent=item.genre.slice(0,1).toUpperCase()+item.genre.slice(1);  //turns first letter to upper case
  td3.classList.add("headers", "genre-row");
  td4.textContent=item.rating;
  td4.classList.add("headers", "rating-row");
  td5.classList.add("headers", "length-row");
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
    icon.setAttribute("src","assets/show-icon.svg")

    if (item.seasons === "0"){
      td5.innerHTML= 'Episodes: ' + item.episodes;
    } else {
    td5.innerHTML='Seasons: ' + item.seasons +"<br>" + 'Episodes: ' + item.episodes;
    }
  }
  
  var whitespace = document.createElement("tr");
  var whitespacetd = document.createElement("td");
  whitespacetd.setAttribute("colspan",5);
  whitespace.appendChild(whitespacetd);
  whitespace.classList.add("whitespace");
  document.getElementById("content-table").children.item(1).appendChild(whitespace);
  
 }


function createDetailOverlay(item) {
  var overlay = document.getElementById("detail-overlay");
  var contentName = document.querySelector(".content-name");
  var movieName = document.querySelector(".content-title");
  var genre = document.querySelector(".content-genre");
  var description = document.querySelector(".content-description");
  var review = document.querySelector(".content-review");
  var rating = document.querySelector(".content-rating");
  var runtimeField = document.querySelector(".content-runtime");
  var seasonsInput = document.getElementById("seasons");
  var episodesInput = document.getElementById("episodes");

  contentName.textContent = item.name;
  genre.textContent = item.genre;
  description.textContent = item.description;
  review.textContent = item.review;
  rating.textContent = item.rating;
  

  if (item.mediatype === "movie") {
    runtimeField.textContent = item.runtime + " Minutes";
    document.getElementById("show-length").style.display = "none";
    document.getElementById("runtime").style.display = "block";
  } else {
    seasonsInput.value = item.seasons;
    episodesInput.value = item.episodes;
    document.getElementById("runtime").style.display = "none";
    document.getElementById("show-length").style.display = "block";
  }

  overlay.style.display = "flex";

  var deleteButton = document.getElementById("delete");
    deleteButton.addEventListener("click", function () {
    deleteItem(item.id);
    overlay.style.display = "none";
    // Remove the row from the table (if it exists)
    var row = document.querySelector("[data-id='" + item.id + "']");
    if (row) {
      row.parentNode.removeChild(row);
    }
  });


  
}

function deleteItem(id) {
  var myMovies = getMovieData();
  myMovies = myMovies.filter((m) => m.id !== id);
  setMovieData(myMovies);

  var table = document.getElementById("content-table").children.item(1);
  var rows = table.getElementsByClassName("display-content");

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    if (Number(row.getAttribute("data-id")) === id) {
      row.parentNode.removeChild(row);
      break;
    }
  }
}

function showDetails(e) {
  var item = getMovieData()[Number(e.target.getAttribute("data-id"))];
  createDetailOverlay(item);
}


closeDetails.addEventListener("click", () => {
  detailOverlay.style.display = "none";
});


 function getMovieData(){
  return (JSON.parse(localStorage.getItem("myMovieData")) ?? []); //so that refreshDisplay doesn't show an error when myMovieData is empty
  
 }

 function setMovieData(myMovies){
  localStorage.setItem("myMovieData", JSON.stringify(myMovies));
 }


var headerName = document.getElementById ("table-title");

document.getElementById("filter-all").addEventListener("click", function (){filterbyAll(); headerName.textContent = "All";});
document.getElementById("filter-favourites").addEventListener("click", function (){filterbyFavourites(); headerName.textContent = "Favourites"});
document.getElementById("filter-movies").addEventListener("click", function (){filterbyMovies(); headerName.textContent = "Movies"});
document.getElementById("filter-to-watch-movies").addEventListener("click", function (){filterbyToWatchMovies(); headerName.textContent = "Movies: To Watch"});
document.getElementById("filter-watched-movies").addEventListener("click", function (){filterbyWatchedMovies(); headerName.textContent = "Movies: Watched"});
document.getElementById("filter-shows").addEventListener("click", function (){filterbyShows(); headerName.textContent = "TV Shows"});
document.getElementById("filter-to-watch-shows").addEventListener("click", function (){filterbyToWatchShows(); headerName.textContent = "Shows: To Watched"});
document.getElementById("filter-watched-shows").addEventListener("click", function (){filterbyWatchedShows(); headerName.textContent = "Shows: Watched"});

function filterbyAll() { filterbyPredicate(x => true) }
function filterbyFavourites() { filterbyPredicate(x => x.favourites === true) }
function filterbyMovies() { filterbyPredicate(x => x.mediatype === "movie") }
function filterbyToWatchMovies() { filterbyPredicate(x => x.toWatch === true && x.mediatype === "movie") }
function filterbyWatchedMovies() { filterbyPredicate(x => x.watched === true && x.mediatype === "movie") }
function filterbyShows() { filterbyPredicate(x => x.mediatype === "tvshow") }
function filterbyToWatchShows() { filterbyPredicate(x => x.toWatch === true && x.mediatype === "tvshow") }
function filterbyWatchedShows() { filterbyPredicate(x => x.watched === true && x.mediatype === "tvshow")}


function filterbyPredicate(predicate) {
  var content = getMovieData();
  var contentIds = content.filter(x => predicate(x)).map(x => x.id);
  var table = document.getElementById("content-table").children.item(1);
  for (var i = 0; i < table.children.length; i++) {
    var row = table.children.item(i);
  
    var rowId = Number(row.getAttribute("data-id")); // turns it from string to number for comparison

  }
  
}

function refreshdisplay() {
  var table = document.getElementById("content-table").children.item(1);
  for(var i = 1; i<table.children.length;i++){
    table.removeChild(table.children.item(i));
  } 
  getMovieData().map(showItem);
}