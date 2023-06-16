const addButton = document.getElementById("add-content-button");
const popup = document.getElementById("content-popup-background");
const closePopup = document.getElementById("form-close");

addButton.addEventListener("click", () => {
  popup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none"
})

document.addEventListener('keydown', function(e){

  console.log(e.key);
  if(e.key =='Escape'){
  closePopup();
  }
})

var movieButton = document.getElementById("movie-button");
var tvshowButton = document.getElementById("tvshow-button");
var runtime = document.getElementById("runtime");
var showLength = document.getElementById("show-length");

movieButton.addEventListener("click", function () {
  runtime.style.display = "flex";
  showLength.style.display = "none";
});

tvshowButton.addEventListener("click", function () {
  runtime.style.display = "none";
  showLength.style.display = "flex";
});
