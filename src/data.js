import * as crud from './api.js';
import { homePage } from '../views/homePage.js';

const host = 'http://localhost:3030';
crud.settings.host = host;

export const login = crud.login;
export const registration = crud.register;
export const logout = crud.logout;

export async function getAllList() {
    return await crud.get(host + '/data/cars?sortBy=_createdOn%20desc');
}

export async function getItemById(id) {
    return await crud.get(host + '/data/cars/' + id);
}

export async function deleteItemById(id) {
    return await crud.del(host + '/data/cars/' + id);
}

export async function creatItem(body) {
    return await crud.post(host + '/data/cars', body);
}

export async function editItemById(id, body) {
    return await crud.put(host + '/data/cars/' + id, body);
}

export async function getAllMyItems() {
    const userId = sessionStorage.getItem('userID');
    return await crud.get(host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getAllItemsBYQuery(query) {
    if (query) {
        return await crud.get(host + `/data/cars?where=year%3D"${query}"`);
    } else {
        return await crud.get(host + `/data/cars`);
    }
}

export async function logoutUser(ctx) {

    await logout();
    setUserNav();
    ctx.page.redirect('/');
}

export function setUserNav() {
    const userName = sessionStorage.getItem('userName');
    if (userName) {
        document.querySelector('#profile>a').textContent = `Welcome ${userName}`;
        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}