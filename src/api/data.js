
import * as api from './api.js';

export let register = api.register;
export let login = api.login;
export let logout = api.logout;


export async function getAllSongs(){
    return await api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}
export async function getSong(id){
    return await api.get('/data/albums/' + id);
}
export async function eraseSong(id){
    return await api.del('/data/albums/' + id);
}

export async function createSong(data){
    return await api.post('/data/albums',data);
}
export async function editSong(id ,data){
    return await api.put('/data/albums/' + id, data);
}

export async function getByName(query){
    return await api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}