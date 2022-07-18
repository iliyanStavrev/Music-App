import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { register } from '../api/data.js';
import { updateNav } from '../app.js';


let template = () => html`
<section id="registerPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Register</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <label for="conf-pass" class="vhide">Confirm Password:</label>
            <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

            <button type="submit" class="register">Register</button>

            <p class="field">
                <span>If you already have profile click <a href="login">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;

let container = document.querySelector('main');

async function onSubmit(e) {
    e.preventDefault();
    let form = new FormData(e.target);
    let email = form.get('email');
    let password = form.get('password');
    let rePass = form.get('conf-pass');

    if (email == '' || password == '') {
        return alert('All fields are required!');
    }
    if (password != rePass) {
        return alert('Passwords don\'t match!');
    }

    await register(email, password);
    updateNav();
    page.redirect('/');
}

export async function registerPage() {

    render(template(), container);
}