import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { eraseSong, getSong } from '../api/data.js';

let template = (song, isVisible) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${song.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${song.name}</h1>
                <h3>Artist: ${song.artist}</h3>
                <h4>Genre: ${song.genre}</h4>
                <h4>Price: ${song.price}</h4>
                <h4>Date: ${song.releaseDate}</h4>
                <p>Description: ${song.description}</p>
            </div>
            ${isVisible == true ? html`<div class="actionBtn">
                <a href=${`/edit/${song._id}`} class="edit">Edit</a>
                <a href="" class="remove" id=${song._id} @click=${deleteSong}>Delete</a>
            </div>` : ''}

        </div>
    </div>
</section>`;

let container = document.querySelector('main');

export async function detailsPage(ctx) {
    let song = await getSong(ctx.params.id);
    let ownerId = song._ownerId;
    let userId = sessionStorage.getItem('userId');

    let isVisible = false;

    if (ownerId == userId) {
        isVisible = true;
    }

    render(template(song, isVisible), container);
}
async function deleteSong(e) {
    e.preventDefault();

    let confirmed = confirm('Are you sure you want to delete this Album?');

    if (confirmed) {
        await eraseSong(e.target.id);
        page.redirect('/catalog');
    }

}