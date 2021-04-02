import { html } from '../node_modules/lit-html/lit-html.js';
import { setUserNav } from '../src/data.js';


const homePageTemplate = () => html`
<section id="main">
    <div id="welcome-container">
        <h1>Welcome To Car Tube</h1>
        <img class="hero" src="/images/car-png.webp" alt="carIntro">
        <h2>To see all the listings click the link below:</h2>
        <div>
            <a href="/allList" class="button">Listings</a>
        </div>
    </div>
</section>`;

export async function homePage(cxt) {
    setUserNav();
    cxt.render(homePageTemplate());
}