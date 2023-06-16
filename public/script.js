const addButton = document.getElementById("add-content-button");
const popup = document.getElementById("content-popup-background");

addButton.addEventListener("click", () => {
  popup.style.display = "flex";
});

var movieButton = document.getElementById("movie-button");
var tvshowButton = document.getElementById("tvshow-button");
var runtime = document.getElementById("runtime");
var showLength = document.getElementById("show-length");

movieButton.addEventListener("click", function () {
  runtime.style.display = "block";
  showLength.style.display = "none";
});

tvshowButton.addEventListener("click", function () {
  runtime.style.display = "none";
  showLength.style.display = "block";
});
