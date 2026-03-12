console.log("js started");

var data;
var grid = document.querySelector(".grid-container");

// LOAD DATA (localStorage first, otherwise XHR)
if (localStorage.getItem("datalist")) {
  data = JSON.parse(localStorage.getItem("datalist"));
  console.log("Loaded from localStorage");
  if (grid) {
    makeCards();
  }
} else {
  var xhttp = new XMLHttpRequest;

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      console.log("Loaded from gameData.json");

      localStorage.setItem("datalist", JSON.stringify(data));
      console.log("Saved starter data to localStorage");

      if (grid) {
        makeCards();
      }
    }
  };

  xhttp.open("GET", "list.json", true);
  xhttp.send();
}

// RENDER CARDS
function makeCards() {
  grid.innerHTML = "";

  data.forEach(function (book) {
    let card = document.createElement("div");
    card.classList.add("card");

    let textData =
      "<div class='book-title'>" + book.title + "</div>" +
      "<div>Publisher: " + book.author + "</div>";

    card.innerHTML = textData;
    grid.appendChild(card);
  });

  console.log("cards refreshed");
}


