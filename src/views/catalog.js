import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getAllSongs } from '../api/data.js';

let templateAll = (data) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
   
  ${data.map(template)}

</section>
`;

let template = (song) => html`
<div class="card-box">
        <img src=${song.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${song.name}</p>
                <p class="artist">Artist: ${song.artist}</p>
                <p class="genre">Genre: ${song.genre}</p>
                <p class="price">Price: ${song.price}</p>
                <p class="date">Release Date: ${song.releaseDate}</p>
            </div>
            <div class="btn-group">
                <a href=${`/details/${song._id}`} id="details">Details</a>
            </div>
        </div>
    </div>`;

        
let container = document.querySelector('main');

export async function catalogPage() {

    let data = await getAllSongs();
    
    
    render(templateAll(data), container);
    
    let userId = sessionStorage.getItem('userId');
 if (userId == null) {
       Array.from(document.querySelectorAll('#details')).forEach(e => e.style.display = 'none');
    }

    if (data.length == 0) {
        render(html`<h1>All Albums</h1><p>No Albums in Catalog!</p>`, document.getElementById('catalogPage'));
    }

}