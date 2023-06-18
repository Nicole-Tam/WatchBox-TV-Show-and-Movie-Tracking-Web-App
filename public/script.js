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

