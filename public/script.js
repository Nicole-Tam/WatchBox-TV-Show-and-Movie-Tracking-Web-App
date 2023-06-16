const addButton = document.getElementById("add-content-button");
const popup = document.getElementById("content-popup-background");


addButton.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  var movieButton = document.getElementById("movie-button");
  var tvshowButton = document.getElementById("tvshow-button");
  var runtimeField = document.getElementById("runtime-field");
  var runtimeText = document.getElementById("runtime-label");
  var leftOffField = document.getElementById("length");
  var leftOffField = document.getElementById("length");
  var moviePlaceholder = document.getElementById("movie-name");
  var showPlaceholder = document.getElementById("show-name");

  movieButton.addEventListener("click", function() {
    runtimeField.style.display = "block";
    runtimeText.style.display = "block";
    moviePlaceholder.style.display = "block";
    length.style.display = "none";
    showPlaceholder.style.display = "none";
  });
  
  tvshowButton.addEventListener("click", function() {
    runtimeField.style.display = "none";
    runtimeText.style.display = "none";
    moviePlaceholder.style.display = "none";
    length.style.display = "block";
    showPlaceholder.style.display = "block";
  });
  