export const settings = {
    host: ''
}

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok === false) {
            const error = await response.json();
            throw new Error(error);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function getOptions(method = 'get', body) {
    const options = {
        method,
        headers: {}
    }

    const token = sessionStorage.getItem('authToken');
    if (token !== null) {
        options.headers['X-Authorization'] = token;
    }
    if (body) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url) {
    return await request(url, getOptions());
}

export async function put(url, data) {
    return await request(url, getOptions('put', data));
}

export async function post(url, data) {
    return await request(url, getOptions('post', data));
}

export async function del(url) {
    return await request(url, getOptions('delete'));
}


export async function login(username, password) {
    const result = await post(settings.host + '/users/login', { username, password });

    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userName', result.username);
    sessionStorage.setItem('userID', result._id);

    return result;
}

export async function register(username, password) {
    const result = await post(settings.host + '/users/register', { username, password });

    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userName', result.username);
    sessionStorage.setItem('userID', result._id);

    return result;
}

export async function logout() {
    const result = await get(settings.host + '/users/logout');

    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userID');

    return result;
}