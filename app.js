const accesKey = "SQkZYEYllrt2cS5GCCwrtQBmvIgjMaAqotn1cMI9c3I";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const searchMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
    const fragment = document.createDocumentFragment();

    results.forEach((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";

      imageLink.append(image);
      fragment.appendChild(imageLink);
    });

    searchResult.innerHTML = "";
    searchResult.appendChild(fragment);

    if (data.total_pages > page) {
      searchMoreBtn.style.display = "block";
    } else {
      searchMoreBtn.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

searchMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
