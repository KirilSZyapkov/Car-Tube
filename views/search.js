import { html } from '../node_modules/lit-html/lit-html.js';
import { setUserNav, getAllItemsBYQuery } from '../src/data.js';

const searchTemplate = (data, onSearch, query) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value = ${query || ''}>
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        ${data.length > 0 ? data.map(itemTemplate) : html`<p class="no-cars"> No results.</p>`}

    </div>
</section>`;

const itemTemplate = (item) => html`
<div class="listing">
    <div class="preview">
        <img src=${item.imageUrl}>
    </div>
    <h2>${item.brand} ${item.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${item.year}</h3>
            <h3>Price: ${item.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href=${'/details/' + item._id} class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function search(ctx) {
    setUserNav();
    const years = Number(ctx.querystring.split('=')[1]);
      
    const data = Number.isNaN(years) ? [] : await getAllItemsBYQuery(years);
    ctx.render(searchTemplate(data, onSearch, years));

    function onSearch() {
        const input = encodeURIComponent(document.getElementById('search-input').value);
        
        ctx.page.redirect('/byYear?query=' + input);
    }
}