var map = document.getElementById("map");
var buttons = document.getElementById("button-grid");

var btnOnClick = function (e) {
  var selected = e.srcElement.dataset.abb;
  map.classList = selected;
};

fetch("dist/data/USA.json").then(response => response.json()).then(json => {
  // Create Buttons
  json.forEach(state => {
    var btn = document.createElement('a');
    btn.classList = "button";
    btn.innerHTML = state.name;
    btn.dataset.abb = state.abbreviation;
    btn.addEventListener("click", function (e) {
      btnOnClick(e);
    });
    buttons.appendChild(btn);
  });
});