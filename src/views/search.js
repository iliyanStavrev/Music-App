import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getByName } from '../api/data.js';



let search = () => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button class="button-list" @click=${searchByName}>Search</button>
    </div>

    <div id="results">

    </div>

</section>`;

let templateAll = (data) => html`
<h2>Results:</h2>

<div class="search-result">

    ${data.map(template)}

</div>
`;

let template = (song) => html`
<div class="card-box">
    <img src=${song.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${song.name}s</p>
            <p class="artist">Artist: ${song.artist}</p>
            <p class="genre">Genre: ${song.genre}</p>
            <p class="price">Price: ${song.price}</p>
            <p class="date">Release Date: ${song.releaseDate}</p>
        </div>
        <div class="btn-group">
            <a href=${`/details/${song._id}`} id="details">Details</a>
        </div>
    </div>
</div>
`;

let container = document.querySelector('main');

export async function searchPage() {

    render(search(), container);

}

async function searchByName(e) {
    e.preventDefault();
    let query = document.getElementById('search-input').value;

    let data = await getByName(query);
    render(templateAll(data), document.getElementById('results'));

    let userId = sessionStorage.getItem('userId');
    if (userId == null) {
        Array.from(document.querySelectorAll('#details')).forEach(e => e.style.display = 'none');
    }

    if (data.length == 0) {
        render(html`<p class="no-result">No result.</p>`, document.querySelector('.search-result'))
    }

}
