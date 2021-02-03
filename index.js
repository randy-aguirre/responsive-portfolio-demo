const toggleButton = document.getElementsByClassName('mobile-icon')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

let container = document.getElementsByClassName("container")[0];
let rowContainer = document.getElementsByClassName("row-container")[0];

let footer = document.getElementsByTagName("footer")[0];

footer.className = "all";

let layoutOption = "grid";
let lastSearch = footer.className;


function splitToChunks(array, parts) {
    let result = [];
    for (let i = parts; i > 0; i--) {
        result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
}

const getFilteredData = async (filter, layoutOption) => {
    container.innerHTML = '';
    rowContainer.innerHTML = '';

    console.log(filter);

    footer.className = filter;

    localStorage.setItem("last_search", filter);

    let response = await fetch("./portfolio/images.json")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return filteredData = data.images.filter(object => object.type === filter)
        })


    if (seeMore.className === "see-more") {
        let splittedPhotos = splitToChunks(response, 2);

        if (layoutOption === "grid") {
            splittedPhotos[0].map(image => {
                let newImage = document.createElement("img");
                let figure = document.createElement("figure");

                newImage.src = image.source;

                figure.appendChild(newImage);
                container.appendChild(figure);
            })
        } else {
            splittedPhotos[0].map(image => {
                let newImage = document.createElement("img");
                let figure = document.createElement("figure");

                newImage.className = "row-img"
                figure.className = "row-figure"
                newImage.src = image.source;

                figure.appendChild(newImage);
                rowContainer.appendChild(figure);
            })
        }

    } else {
        if (layoutOption === "grid") {
            response.map(image => {
                let newImage = document.createElement("img");
                let figure = document.createElement("figure");

                newImage.src = image.source;

                figure.appendChild(newImage);
                container.appendChild(figure);
            })
        } else {
            response.map(image => {
                let newImage = document.createElement("img");
                let figure = document.createElement("figure");

                newImage.className = "row-img"
                figure.className = "row-figure"
                newImage.src = image.source;

                figure.appendChild(newImage);
                rowContainer.appendChild(figure);
            })
        }

        seeMore.className = "see-more";
    }



    console.log(localStorage.getItem("last_search"));
}


const getAllData = async (layoutOption) => {
    container.innerHTML = '';
    rowContainer.innerHTML = '';

    localStorage.setItem("last_search", "all");

    let response = await fetch("./portfolio/images.json")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data.images
        })

    if (seeMore.className === "see-more") {
        let splittedPhotos = splitToChunks(response, 2);

        if (layoutOption === "grid") {
            splittedPhotos[0].map(image => {
                let newImage = document.createElement("img");
                let figure = document.createElement("figure");

                newImage.src = image.source;

                figure.appendChild(newImage);
                container.appendChild(figure);
            })
        } else {
            splittedPhotos[0].map(image => {
                let newImage = document.createElement("img");
                let figure = document.createElement("figure");

                newImage.className = "row-img"
                figure.className = "row-figure"
                newImage.src = image.source;

                figure.appendChild(newImage);
                rowContainer.appendChild(figure);
            })
        }


    } else {
        if (layoutOption === "grid") {
            response.map(image => {
                let newImage = document.createElement("img");
                let figure = document.createElement("figure");

                newImage.src = image.source;

                figure.appendChild(newImage);
                container.appendChild(figure);
            })
        } else {
            response.map(image => {
                let newImage = document.createElement("img");
                let figure = document.createElement("figure");

                newImage.className = "row-img"
                figure.className = "row-figure"
                newImage.src = image.source;

                figure.appendChild(newImage);
                rowContainer.appendChild(figure);
            })
        }

        seeMore.className = "see-more"

    }

}

let allSelector = document.getElementsByClassName("all")[0];
let brandingSelector = document.getElementsByClassName("branding")[0];
let webSelector = document.getElementsByClassName("web")[0];
let photoSelector = document.getElementsByClassName("photo")[0];
let appSelector = document.getElementsByClassName("app")[0];

let gridLayoutSelector = document.getElementsByClassName("grid-selector")[0];
let rowLayoutSelector = document.getElementsByClassName("row-selector")[0];

let seeMore = document.getElementsByClassName("see-more")[0];

allSelector.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    console.log("all");
    getAllData(layoutOption);
});

brandingSelector.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    getFilteredData(brandingSelector.getAttribute("class"), layoutOption);
});

webSelector.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    console.log("web");
    getFilteredData(webSelector.getAttribute("class"), layoutOption);
});

photoSelector.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    console.log("photo");
    getFilteredData(photoSelector.getAttribute("class"), layoutOption);
});

appSelector.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    console.log("app");
    getFilteredData(appSelector.getAttribute("class"), layoutOption);
});

document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    getAllData(layoutOption);
}, false);

gridLayoutSelector.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    console.log(lastSearch);

    layoutOption = "grid";
    if (lastSearch !== "all") {
        getFilteredData(lastSearch, layoutOption)
    } else {
        getAllData(layoutOption);
    }
});

rowLayoutSelector.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    console.log(lastSearch);

    layoutOption = "row";
    if (lastSearch !== "all") {
        getFilteredData(lastSearch, layoutOption)
    } else {
        getAllData(layoutOption);
    }
});

seeMore.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    seeMore.className = "see-more active";

    console.log(lastSearch);

    lastSearch = localStorage.getItem("last_search");

    if (lastSearch !== "all") {
        getFilteredData(lastSearch, layoutOption)
    } else {
        getAllData(layoutOption);
    }

    return false;
});
