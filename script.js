//declare variables
const apiKey = "AIzaSyBZ4J6atY7fEjCSZqA6iiT37eT86aS8bgI";
const searchInput = document.querySelector(".search");
const submitBtn = document.querySelector(".submit");
const gifContainer = document.querySelector(".gif-container");
//event listener for submit button
submitBtn.addEventListener("click", function () {
  const gifName = searchInput.value;
  const URL = `https://tenor.googleapis.com/v2/search?q=${gifName}&key=${apiKey}`;
  const http = new XMLHttpRequest();
  http.open("GET", URL);
  http.responseType = "json";
  http.onreadystatechange = function () {
    if (http.readyState === 4) {
      let response = http.response;

      if (response && response.results && response.results.length > 0) {
        let result = response.results;
        gifDisplay(result);
      } else {
        const errorMsg = document.createElement("h1");
        errorMsg.innerHTML = "No GIFs were found";
        gifContainer.appendChild(errorMsg);
      }
    }
  };
  http.send();
});

function gifDisplay(gifInfo) {
  gifContainer.innerHTML = "";
  gifInfo.forEach((gif) => {
    const gifImg = document.createElement("img");
    gifImg.setAttribute("src", gif.media_formats.tinygif.url);
    gifImg.setAttribute("width", "250");
    gifImg.setAttribute("height", "300");
    gifContainer.appendChild(gifImg);
  });
}
