refreshdisplay(); //refreshes browser content so that preexisting content shows when browser is opened, or else it would show with no data

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

id = id + 1

var mymovies = getMovieData();
console.log("mymovies",mymovies)
if (!Array.isArray(mymovies)) { mymovies = [] }
mymovies.push(item)
setMovieData(mymovies)

refreshdisplay()
}


function refreshdisplay() {
  var table = document.getElementById("content-table").children.item(1);
  console.log(table,"table")
  for(var i = 1; i<table.children.length;i++){
    table.removeChild(table.children.item(i));
  } 
  getMovieData().map(showItem);
}



