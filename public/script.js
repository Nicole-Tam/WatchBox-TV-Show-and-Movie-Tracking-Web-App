var id = Number(localStorage.getItem('id')) || 0;
var movie = Number(localStorage.getItem('movieCount')) || 0;
var shows = Number(localStorage.getItem('showCount')) || 0;
var favouriteCount = Number(localStorage.getItem('favouriteCount')) || 0;
var watchedShows = Number(localStorage.getItem('watchedShowsCount')) || 0;
var watchedMovies = Number(localStorage.getItem('watchedMoviesCount')) || 0;
var toWatchShows = Number(localStorage.getItem('toWatchShowsCount')) || 0;
var toWatchMovies = Number(localStorage.getItem('toWatchMoviesCount')) || 0;
var date;
const headerName = document.getElementById("table-title");

refreshDisplay(); //refreshes browser content so that preexisting content shows when browser is opened
startDisplay();

const addButton = document.getElementById("add-content-button");
const overlay = document.getElementById("content-popup-background");
const popup = document.getElementById('content-popup');
const closePopup = document.querySelector("#form-close a");
const form = document.getElementById("content-form");

const closeDetails = document.querySelector("#detail-close a");
var contentRow = document.getElementsByClassName("display-content");


addButton.addEventListener("click", () => {
  document.getElementById("content-form").reset();
  overlay.style.display = "flex";
  popup.style.display = 'flex';
});

closePopup.addEventListener("click", () => {
  resetForm();
});

document.addEventListener('keydown', function (e) {
  if (e.key == 'Escape') {
    resetForm();
  }
});

overlay.addEventListener('click', function (event) {
  if (event.target === overlay) {
    resetForm();
  }
});


function resetForm() {
  overlay.style.display = 'none';
  document.getElementById("content-form").reset();
}

const movieButton = document.getElementById("movie-button");
const tvshowButton = document.getElementById("tvshow-button");
const runtimeInput = document.getElementById("runtime");
const showLength = document.getElementById("show-length");
const movieIcon = document.getElementById("movie-icon")
const TVIcon = document.getElementById("tvshow-icon")

movieButton.addEventListener("click", function () { //don't show movie options when tv show button is pressed
  runtimeInput.style.display = "flex";
  showLength.style.display = "none";
  movieButton.id = "movie-button-checked"
  tvshowButton.id = "tvshow-button";
  movieIcon.src = "assets/movie-icon-active.svg";
  TVIcon.src = "assets/tvshow.svg";

});

tvshowButton.addEventListener("click", function () { //don't show tv show options when movie button is pressed
  runtimeInput.style.display = "none";
  showLength.style.display = "flex";
  tvshowButton.id = "movie-button-checked";
  movieButton.id = "movie-button";
  movieIcon.src = "assets/movie-Button.svg";
  TVIcon.src = "assets/tv-icon-active.svg";
});

const deleteBtn = document.getElementById("delete");

deleteBtn.addEventListener("click", function () {
  deleteItem(overlayid);
  detailOverlay.style.display = "none"
});



var detailOverlay = document.getElementById("detail-overlay");
var contentRow = document.getElementsByClassName("display-content");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addItem();
  overlay.style.display = "none";
}
)

//retrieving form input
var id = Number(localStorage.getItem('id')) || 0;
var movie = Number(localStorage.getItem('movieCount')) || 0;
var shows = Number(localStorage.getItem('showCount')) || 0;
var favouriteCount = Number(localStorage.getItem('favouriteCount')) || 0;
var watchedShows = Number(localStorage.getItem('watchedShowsCount')) || 0;
var watchedMovies = Number(localStorage.getItem('watchedMoviesCount')) || 0;
var toWatchShows = Number(localStorage.getItem('toWatchShowsCount')) || 0;
var toWatchMovies = Number(localStorage.getItem('toWatchMoviesCount')) || 0;
var date;


function addItem() {
  var name = form.elements['title'].value
  var mediatype = form.elements['media-type'].value
  var genre = form.elements['genre'].value
  var description = form.elements['description'].value
  var review = form.elements['review'].value
  var rating = form.elements['rating'].value
  var favourites = form.elements['favourites'].checked
  var watched = form.elements['watched'].checked
  var toWatch = form.elements['to-watch'].checked

  var item = (
    {
      id: id,
      mediatype,
      name,
      genre,
      description,
      review,
      rating,
      favourites,
      watched,
      toWatch,
      date: new Date(),
    })

  id = id + 1 //so each item has different id (for deletion)

  if (mediatype === "Movie") {
    item.runtime = form.elements['runtime'].value;
    movie = movie + 1;

    if (favourites === true && watched === true && toWatch === true) {
      favouriteCount = favouriteCount + 1;
      watchedMovies = watchedMovies + 1;
      toWatchMovies = toWatchMovies + 1;
    } else if (favourites === true && watched === true) {
      favouriteCount = favouriteCount + 1;
      watchedMovies = watchedMovies + 1;
    } else if (favourites === true && toWatch === true) {
      favouriteCount = favouriteCount + 1;
      toWatchMovies = toWatchMovies + 1;
    } else if (watched === true && toWatch === true) {
      watchedMovies = watchedMovies + 1;
      toWatchMovies = toWatchMovies + 1;
    } else if (favourites === true) {
      favouriteCount = favouriteCount + 1;
    } else if (watched === true) {
      watchedMovies = watchedMovies + 1;
    } else if (toWatch === true) {
      toWatchMovies = toWatchMovies + 1;
    }
  } else {
    item.seasons = form.elements['seasons'].value;
    item.episodes = form.elements['episodes'].value;
    shows = shows + 1;

    if (favourites === true && watched === true && toWatch === true) {
      favouriteCount = favouriteCount + 1;
      watchedShows = watchedShows + 1;
      toWatchShows = toWatchShows + 1;
    } else if (favourites === true && watched === true) {
      favouriteCount = favouriteCount + 1;
      watchedShows = watchedShows + 1;
    } else if (favourites === true && toWatch === true) {
      favouriteCount = favouriteCount + 1;
      toWatchShows = toWatchShows + 1;
    } else if (watched === true && toWatch === true) {
      watchedShows = watchedShows + 1;
      toWatchShows = toWatchShows + 1;
    } else if (favourites === true) {
      favouriteCount = favouriteCount + 1;
    } else if (watched === true) {
      watchedShows = watchedShows + 1;
    } else if (toWatch === true) {
      toWatchShows = toWatchShows + 1;
    }
  }
  saveCountToLocal();
  var myMovies = getContentData();
  myMovies.push(item);
  setMovieData(myMovies);
  refreshDisplay();
}


function showItem(item) {
  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
  var icon = document.createElement("img")
  tr.classList.add("display-content");
  td1.appendChild(icon);
  td1.classList.add("icon", "headers", "type-row");
  var title = document.createElement("h3");
  title.classList.add("movie-title");
  title.textContent = item.name;
  td2.appendChild(title)
  td2.classList.add("headers", "review-row");
  var review = document.createElement("span");
  review.textContent = item.review;
  td2.appendChild(review);
  td3.textContent = item.genre
  td3.classList.add("headers", "genre-row");
  td4.textContent = item.rating;
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

  if (item.mediatype === "Movie") {
    icon.setAttribute("src", "assets/movie-icon.svg")
    td5.innerHTML = item.runtime + " Minutes";
  } else {
    icon.setAttribute("src", "assets/show-icon.svg")

    if (item.seasons === "0") {
      td5.innerHTML = 'Episodes: ' + item.episodes;
    } else {
      td5.innerHTML = 'Seasons: ' + item.seasons + "<br>" + 'Episodes: ' + item.episodes;
    }
  }

  var whitespace = document.createElement("tr");
  var whitespacetd = document.createElement("td");
  whitespacetd.setAttribute("colspan", 5);
  whitespace.appendChild(whitespacetd);
  whitespace.classList.add("whitespace");
  document.getElementById("content-table").children.item(1).appendChild(whitespace);

}

var overlayid = false

function createDetailOverlay(item) {
  overlayid = item.id
  var overlay = document.getElementById("detail-overlay");
  var contentName = document.querySelector(".content-name");
  var movieName = document.querySelector(".content-title");
  var typeInOverlay = document.querySelector(".content-type");
  var genre = document.querySelector(".content-genre");
  var description = document.querySelector(".content-description");
  var review = document.querySelector(".content-review");
  var rating = document.querySelector(".content-rating");
  var runtimeField = document.querySelector(".content-runtime");
  var seasonsInput = document.getElementById("seasons");
  var episodesInput = document.getElementById("episodes");

  contentName.textContent = item.name;
  typeInOverlay.textContent = item.mediatype;
  genre.textContent = item.genre;
  description.textContent = item.description;
  review.textContent = item.review;
  rating.textContent = item.rating;


  if (item.mediatype === "Movie") {
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

}

function deleteItem(id) {
  var myMovies = getContentData();
  var deletedItem = myMovies.find((m) => m.id === id);

  if (deletedItem.mediatype === "Movie") {
    deletedItem.runtime = form.elements['runtime'].value;
    movie = movie - 1;

    if (deletedItem.favourites === true && deletedItem.watched === true && deletedItem.toWatch === true) {
      favouriteCount = favouriteCount - 1;
      watchedMovies = watchedMovies - 1;
      toWatchMovies = toWatchMovies - 1;
    } else if (deletedItem.favourites === true && deletedItem.watched === true) {
      favouriteCount = favouriteCount - 1;
      watchedMovies = watchedMovies - 1;
    } else if (deletedItem.favourites === true && deletedItem.toWatch === true) {
      favouriteCount = favouriteCount - 1;
      toWatchMovies = toWatchMovies - 1;
    } else if (deletedItem.watched === true && deletedItem.toWatch === true) {
      watchedMovies = watchedMovies - 1;
      toWatchMovies = toWatchMovies - 1;
    } else if (deletedItem.favourites === true) {
      favouriteCount = favouriteCount - 1;
    } else if (deletedItem.watched === true) {
      watchedMovies = watchedMovies - 1;
    } else if (deletedItem.toWatch === true) {
      toWatchMovies = toWatchMovies - 1;
    }
  } else {
    deletedItem.seasons = form.elements['seasons'].value;
    deletedItem.episodes = form.elements['episodes'].value;
    shows = shows - 1;

    if (deletedItem.favourites === true && deletedItem.watched === true && deletedItem.toWatch === true) {
      favouriteCount = favouriteCount - 1;
      watchedShows = watchedShows - 1;
      toWatchShows = toWatchShows - 1;
    } else if (deletedItem.favourites === true && deletedItem.watched === true) {
      favouriteCount = favouriteCount - 1;
      watchedShows = watchedShows - 1;
    } else if (deletedItem.favourites === true && deletedItem.toWatch === true) {
      favouriteCount = favouriteCount - 1;
      toWatchShows = toWatchShows - 1;
    } else if (deletedItem.watched === true && deletedItem.toWatch === true) {
      watchedShows = watchedShows - 1;
      toWatchShows = toWatchShows - 1;
    } else if (deletedItem.favourites === true) {
      favouriteCount = favouriteCount - 1;
    } else if (deletedItem.watched === true) {
      watchedShows = watchedShows - 1;
    } else if (deletedItem.toWatch === true) {
      toWatchShows = toWatchShows - 1;
    }
  }

  saveCountToLocal();
  myMovies = myMovies.filter((m) => m.id !== id);
  setMovieData(myMovies);
  refreshDisplay();
}

function showDetails(e) {
  var ele = e.target;
  while (ele.getAttribute("data-id") == null || ele.getAttribute("data-id") == undefined) { ele = ele.parentElement; }
  var item = getContentData()[Number(ele.getAttribute("data-id"))];
  createDetailOverlay(item);
}


closeDetails.addEventListener("click", () => {
  detailOverlay.style.display = "none";
});


function getContentData() {
  return (JSON.parse(localStorage.getItem("myMovieData")) ?? []); //so that refreshDisplay doesn't show an error when myMovieData is empty

}

function setMovieData(myMovies) {
  localStorage.setItem("myMovieData", JSON.stringify(myMovies));
}


var filterOptions = document.getElementsByClassName('filters');

for (var i = 0; i < filterOptions.length; i++) {
  filterOptions[i].addEventListener('click', function() {
    for (var j = 0; j < filterOptions.length; j++) {
      filterOptions[j].classList.remove('bold');
    }
    this.classList.add('bold');
  });
}


document.getElementById("filter-all").addEventListener("click", function () {
  let filterAllText = document.querySelector("#filter-all a")
  filterAllText.innerHTML = "<b>All</b>"
  filterbyAll();
  headerName.innerHTML = "All (" + (Number(movie) + Number(shows)) + ")";
});

document.getElementById("filter-favourites").addEventListener("click", function () {
  filterbyFavourites();
  headerName.innerHTML = "Favourites (" + favouriteCount + ")";
});

document.getElementById("filter-movies").addEventListener("click", function () {
  filterbyMovies();
  headerName.innerHTML = "Movies (" + movie + ")";
});

document.getElementById("filter-to-watch-movies").addEventListener("click", function () {
  filterbyToWatchMovies();
  headerName.innerHTML = "Movies: To Watch (" + toWatchMovies + ")";
});

document.getElementById("filter-watched-movies").addEventListener("click", function () {
  filterbyWatchedMovies();
  headerName.innerHTML = "Movies: Watched (" + watchedMovies + ")";
});

document.getElementById("filter-shows").addEventListener("click", function () {
  filterbyShows();
  headerName.innerHTML = "TV Shows (" + shows + ")";
});

document.getElementById("filter-to-watch-shows").addEventListener("click", function () {
  filterbyToWatchShows();
  headerName.innerHTML = "Shows: To Watched (" + toWatchShows + ")";
});

document.getElementById("filter-watched-shows").addEventListener("click", function () {
  filterbyWatchedShows();
  headerName.innerHTML = "Shows: Watched (" + watchedShows + ")";
});



function filterbyAll() { filterbyPredicate(x => true) }
function filterbyFavourites() { filterbyPredicate(x => x.favourites === true)}
function filterbyMovies() { filterbyPredicate(x => x.mediatype === "Movie") }
function filterbyToWatchMovies() { filterbyPredicate(x => x.toWatch === true && x.mediatype === "Movie") }
function filterbyWatchedMovies() { filterbyPredicate(x => x.watched === true && x.mediatype === "Movie") }
function filterbyShows() { filterbyPredicate(x => x.mediatype === "TVShow") }
function filterbyToWatchShows() { filterbyPredicate(x => x.toWatch === true && x.mediatype === "TVShow") }
function filterbyWatchedShows() { filterbyPredicate(x => x.watched === true && x.mediatype === "TVShow") }


function filterbyPredicate(predicate) {
  var content = getContentData();
  var contentIds = content.filter(x => predicate(x)).map(x => x.id);
  var table = document.getElementById("content-table").children.item(1);
  for (var i = 0; i < table.children.length; i++) {
    var row = table.children.item(i);

    var rowId = Number(row.getAttribute("data-id"));
    
    if (contentIds.includes(rowId)) {
      row.style.display = "table-row";
      if (row.nextElementSibling !== null) {
        row.nextElementSibling.style.display = "table-row"
      }
    } else {
      row.style.display = "none";
    }
  }
  table.children.item(0).style.display = "table-row"
}

function refreshDisplay() {
  var table = document.getElementById("content-table").children.item(1);
  table.children.item(0).style.display = "table-row"
  for (var i = table.children.length - 1; i >= 1; i--) {
    table.removeChild(table.children.item(i));
  }
  getContentData().map(showItem);
  
}

function startDisplay() {
  headerName.innerHTML = "All (" + (Number(movie) + Number(shows)) + ") ";
}

function saveCountToLocal() {
  localStorage.setItem('id', id); 
  localStorage.setItem('movieCount', movie);
  localStorage.setItem('showCount', shows);
  localStorage.setItem('favouriteCount', favouriteCount);
  localStorage.setItem('watchedShowsCount', watchedShows);
  localStorage.setItem('watchedMoviesCount', watchedMovies);
  localStorage.setItem('toWatchShowsCount', toWatchShows);
  localStorage.setItem('toWatchMoviesCount', toWatchMovies);
}