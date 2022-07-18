
let host = 'http://localhost:3030';

async function request(url, options) {
    try {
        let response = await fetch(host + url, options);

        if (!response.ok) {
            let err = await response.json();
            throw new Error(err.message);
        }

        try {
            let data = await response.json();
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
    let options = {
        method,
        headers: {}
    };
    let token = sessionStorage.getItem('token');

    if (token != null) {
        options.headers['X-Authorization'] = token;
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url) {
    return await request(url, getOptions());
}
export async function post(url, data) {
    return await request(url, getOptions('post', data))
}

export async function put(url, data) {
    return await request(url, getOptions('put', data))
}
export async function del(url) {
    return await request(url, getOptions('delete'))
}

 export async function login(email,password){
     let result = await post('/users/login',{email,password});

     sessionStorage.setItem('token',result.accessToken);
     sessionStorage.setItem('email',result.email);
     sessionStorage.setItem('userId',result._id);

 }
 export async function register(email,password){
    let result = await post('/users/register',{email,password});

    sessionStorage.setItem('token',result.accessToken);
    sessionStorage.setItem('email',result.email);
    sessionStorage.setItem('userId',result._id);

}

export async function logout(){
    let result = await get('/users/logout');

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userId');

    return result;

}