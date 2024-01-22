

function showSearch(event) {
    event.preventDefault();
    let citySearchElement = document.querySelector("#cityInput")
    let searchCity = document.querySelector("#showCity");
    searchCity.innerHTML = citySearchElement.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showSearch);