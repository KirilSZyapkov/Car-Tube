import { html } from '../node_modules/lit-html/lit-html.js';
import { setUserNav, creatItem } from '../src/data.js';

const creatTemplate = (onSubmit) => html`
<section id="create-listing">
    <div class="container">
        <form @submit=${onSubmit} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>`;

export async function creat(ctx) {
    ctx.render(creatTemplate(onSubmit));
    setUserNav();
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

        creatItem(body);
        e.target.reset();
        ctx.page.redirect('/allList');
    }
}