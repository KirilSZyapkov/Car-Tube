import { html } from '../node_modules/lit-html/lit-html.js';
import { getItemById, setUserNav, deleteItemById } from '../src/data.js';

const carDetailsRemplate = (item, deleteItem, itemOwnerId, id) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${item.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${item.brand}</li>
            <li><span>Model:</span>${item.model}</li>
            <li><span>Year:</span>${item.year}</li>
            <li><span>Price:</span>${item.price}$</li>
        </ul>

        <p class="description-para">${item.description}</p>

        <div class="listings-buttons">
            ${itemOwnerId !== item._ownerId ? '' : html`
            <a href=${`/edit/${item._id}`} class="button-list">Edit</a>
            <a @click=${deleteItem} href="javascript:void(0)" class="button-list">Delete</a>`}

        </div>
    </div>
</section>`;

export async function detailsById(ctx) {
    setUserNav();
    const itemOwnerId = sessionStorage.getItem('userID');
    const id = ctx.params.id;
    const item = await getItemById(id);
    
    ctx.render(carDetailsRemplate(item, deleteItem, itemOwnerId, id));

    async function deleteItem() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteItemById(id);
            ctx.page.redirect('/allList');
        }
    }
}