let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner")

function createAndAppendSearchResult(results) {
    let {
        title,
        link,
        description
    } = results;
    //Create Result Item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    searchResultsEl.appendChild(resultItemEl);
    //Create Title Element
    let titleEl = document.createElement("a");
    titleEl.classList.add("results-title");

    titleEl.textContent = title;
    titleEl.href = link;
    titleEl.target = "_blank";
    resultItemEl.appendChild(titleEl);
    //Create Break Element
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);
    //Create URL Element
    let urlEl = document.createElement("a");
    urlEl.classList.add("results-url");

    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";
    resultItemEl.appendChild(urlEl);
    //Create Break Element
    let urlBreakEl = document.createElement("br");
    resultItemEl.appendChild(urlBreakEl);
    //Create Description Element
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none")
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }

}

function searchwikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none")
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchwikipedia);