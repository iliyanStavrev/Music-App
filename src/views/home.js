import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { updateNav } from '../app.js';


let templateAll = () => html`
    <section id="welcomePage">
    <div id="welcome-message">
        <h1>Welcome to</h1>
        <h1>My Music Application!</h1>
    </div>

    <div class="music-img">
        <img src="./images/musicIcons.webp">
    </div>
</section>`;


 
let container = document.querySelector('main');

export async function homePage() {

    render (templateAll(),container);
   
   
}