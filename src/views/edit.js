import { html, render } from "../../node_modules/lit-html/lit-html.js";
import page from '../../node_modules/page/page.mjs';
import { editSong, getSong } from "../api/data.js";

let template = (song) => html`
<section class="editPage">
    <form @submit=${onSubmit} id=${song._id}>
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" class="name" type="text" value=${song.name}>

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value=${song.imgUrl}>

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="text" value=${song.price}>

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value=${song.releaseDate}>

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" value=${song.artist}>

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" value=${song.genre}>

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10"
                    cols="10">${song.description}</textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>`;

let container = document.querySelector('main');

export async function editPage(ctx) {

    let song = await getSong(ctx.params.id);
    render(template(song), container)
}
async function onSubmit(e) {
    e.preventDefault();

    let form = new FormData(e.target);
    let name = form.get('name');
    let imgUrl = form.get('imgUrl');
    let price = form.get('price');
    let releaseDate = form.get('releaseDate');
    let artist = form.get('artist');
    let genre = form.get('genre');
    let description = form.get('description');


    if (name == '' || imgUrl == '' || description == '' || artist == ''
        || releaseDate == '' || price == '' || genre == '') {
        return alert('All fields are required!');
    }

    let data = { name, imgUrl, price, releaseDate, artist, genre, description };

    let id = e.target.id;

    await editSong(id, data);
    page.redirect('/details/' + id);
}