import { Api } from './lib.js';
const api = new Api('https://progerburik-server-express.herokuapp.com');  // http://localhost:9999

const rootEl = document.getElementById('root');
const addEl = document.createElement('form');
addEl.className = 'form-inline';
addEl.innerHTML = `
    <input data-id="content" class="form-control mb-2 mr-sm-2"></input>
    <button class="btn btn-info mb-2">Добавить</button>
`;
rootEl.appendChild(addEl);
const contentEl = addEl.querySelector('[data-id=content]');
contentEl.value = localStorage.getItem('adding');
contentEl.addEventListener('input', (evt) => {
    localStorage.setItem('adding', evt.currentTarget.value);
});
addEl.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const value = contentEl.value;
    const data = {
        content: value,
        likes: 0
    };
    api.postJSON('/posts', data, (evt) => {
        loadData();
        contentEl.value = '';
        localStorage.removeItem('adding');
    }, handleError);
});

const listEl = document.createElement('ul');
listEl.className = 'list-group';
rootEl.appendChild(listEl);

const rebuildList = (data) => {
    listEl.innerHTML = '';
    for (const item of data) {
        const el = document.createElement('li');
        el.className = 'list-group-item';
        el.innerHTML = `
        ${item.id} ${item.content} 
        <span class="badge badge-warning">likes:${item.likes}</span>
        <button type="button" class="btn btn-success btn-sm" data-action="like">like</button> 
        <button type="button" class="btn btn-danger btn-sm" data-action="dislike">dislike</button> 
        <button type="button" class="btn btn-secondary btn-sm" data-action="remove">remove</button>
        `;
        el.querySelector('[data-action=remove]').addEventListener('click', () => {
            api.deleteJSON(`/posts/${item.id}`, loadData, handleError);
        });
        el.querySelector('[data-action=like]').addEventListener('click', () => {
            api.postJSON(`/posts/${item.id}/likes/`, null, loadData, handleError);
        });
        el.querySelector('[data-action=dislike]').addEventListener('click', () => {
            api.deleteJSON(`/posts/${item.id}/likes/`, loadData, handleError);
        });
        listEl.appendChild(el);
    }
};
const handleError = (data) => {
    console.log(`error with:`);
    console.log({ data });
};
const loadData = () => {
    api.getJSON('/posts', rebuildList, handleError);
};
loadData();