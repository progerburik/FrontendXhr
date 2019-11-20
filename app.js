import { Api } from './lib.js';
const api = new Api('https://progerburik-server-express.herokuapp.com');

api.getJSON('/posts', data => {
    console.log(data);
}, error => {
    console.log(error);
});

api.postJSON('/posts', { id: 0, content: 'New audio post' }, data => {
    console.log(data);
}, error => {
    console.log(error);
});

api.postJSON('/posts/1/likes', null, data => {
    console.log(data);
}, error => {
    console.log(error);
});

api.deleteJSON('/posts/2/likes', null, data => {
    console.log(data);
}, error => {
    console.log(error);
});
