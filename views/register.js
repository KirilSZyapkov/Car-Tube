import { html } from '../node_modules/lit-html/lit-html.js';
import { setUserNav, registration } from '../src/data.js';

const registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="container">
        <form @submit=${onSubmit} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`;

export async function register(ctx) {
    ctx.render(registerTemplate(onSubmit));
    setUserNav();
    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userName = formData.get('username');
        const password = formData.get('password');
        const rePass = formData.get('repeatPass');

        if (userName === '' || password === '' || rePass === '') {
            return alert('All fields are required!');
        }

        if (password !== rePass) {
            return alert('Passwords don\'t match!');
        }
        await registration(userName, password);
        e.target.reset();
        ctx.page.redirect('/allList');
    }
}