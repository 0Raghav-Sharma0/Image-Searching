const search = document.querySelector('#search');
const search_btn = document.querySelector('#search-btn');
const img_container = document.querySelector('.img-container');
const read = document.getElementById("read_more");
let page = 1;
let search_value = '';

const key = 'RuJTeKhXAyF9G-9VlCJJv1NlEMuCgGCDgIS-2Brjv3E';

search_btn.addEventListener('click', async () => {
    search_value = search.value.trim();
    if (search_value === '') {
        alert('Please enter a search term');
        return;
    }
    page = 1;  // Reset page number on new search
    img_container.innerHTML = '';  // Clear previous images
    await fetchImages();
    read.style.display = "block";
});

async function fetchImages() {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${search_value}&client_id=${key}`;
    let data = await fetch(url);
    data = await data.json();
    displayImages(data);
}

function displayImages(data) {
    data.results.forEach(element => {
        const img = document.createElement('img');
        img.src = element.urls.regular;
        const img_link = document.createElement("a");
        img_link.href = element.links.html;
        img_link.target = "_blank";
        img_link.appendChild(img);
        img_container.appendChild(img_link);
    });
}

read.addEventListener("click", async (e) => {
    e.preventDefault();
    page++;  // Increment page number
    await fetchImages();  // Fetch next page of images
});
