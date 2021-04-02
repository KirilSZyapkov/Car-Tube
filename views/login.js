import { html } from '../node_modules/lit-html/lit-html.js';
import { login, setUserNav } from '../src/data.js';

const loginTemplate = (onSubmit) => html`
<section id="login">
    <div class="container">
        <form @submit=${onSubmit} id="login-form" action="#" method="post">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>`;

export async function loginUser(ctx) {
    ctx.render(loginTemplate(onSubmit));
    setUserNav();
    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userName = formData.get('username');
        const password = formData.get('password');

        if (userName === '' || password === '') {
            return alert('All fields are required!');
        }

        await login(userName, password);
        e.target.reset();
        ctx.page.redirect('/allList');
    }
}