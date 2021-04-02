import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { setUserNav, logoutUser } from '../src/data.js';

import { homePage } from '../views/homePage.js';
import { loginUser } from '../views/login.js';
import { register } from '../views/register.js';
import { allList } from '../views/allList.js';
import { detailsById } from '../views/detailsById.js';
import { creat } from '../views/creat.js';
import { changeById } from '../views/editById.js';
import { myList } from '../views/myList.js';
import { search } from '../views/search.js';




const container = document.getElementById('site-content');
setUserNav();

page('/', decorateContext, homePage);
page('/login', decorateContext, loginUser);
page('/register', decorateContext, register);
page('/allList', decorateContext, allList);
page('/details/:id', decorateContext, detailsById);
page('/logout', decorateContext, logoutUser);
page('/creat', decorateContext, creat);
page('/edit/:id', decorateContext, changeById);
page('/myList', decorateContext, myList);
page('/byYear', decorateContext, search);

page.start();

async function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, container);

    next();
}

