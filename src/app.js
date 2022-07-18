import page from '../node_modules/page/page.mjs';
import { homePage } from './views/home.js';
import {  logout } from './api/data.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';


page('/',homePage);
page('/create',createPage);
page('/catalog',catalogPage);
page('/register',registerPage);
page('/login',loginPage);
page('/details/:id',detailsPage);
page('/edit/:id',editPage);
page('/search',searchPage);

updateNav();

page();

document.getElementById('logout').addEventListener('click',signOut);

export function updateNav (){

    let userId = sessionStorage.getItem('userId');

    if (userId != null) {
   
        Array.from(document.querySelectorAll('#user')).forEach(e => e.style.display = 'inline-block');
        Array.from(document.querySelectorAll('#guest')).forEach(e => e.style.display = 'none');
      
    }
    else{
        Array.from(document.querySelectorAll('#user')).forEach(e => e.style.display = 'none');
        Array.from(document.querySelectorAll('#guest')).forEach(e => e.style.display = 'inline-block');
    }
}

export async function signOut(e){
    e.preventDefault();
    await logout();
    updateNav();
    page.redirect('/');
}

