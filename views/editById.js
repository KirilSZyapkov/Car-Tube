import { html } from '../node_modules/lit-html/lit-html.js';
import { setUserNav, editItemById, getItemById } from '../src/data.js';

const editTemplate = (item, onSubmit) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${item.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${item.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${item.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${item.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${item.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${item.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;

export async function changeById(ctx) {
    const id = ctx.params.id;
    const item = await getItemById(id);

    setUserNav();
    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const body = {
            brand: formData.get('brand'),
            model: formData.get('model'),
            description: formData.get('description'),
            year: Number(formData.get('year')),
            imageUrl: formData.get('imageUrl'),
            price: Number(formData.get('price'))
        }

        const isEmpty = Object.values(body).some(e => !e);
        if (isEmpty) {
            return alert('All fields are required!');
        };
        await editItemById(id, body);
        ctx.page.redirect('/details/' + id);
    }
}