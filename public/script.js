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
