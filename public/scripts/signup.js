const url = 'http://10.114.32.13/users/';
const buttonSubmit = document.querySelector('form button');
buttonSubmit.addEventListener('click', (e) => {
    // e.preventDefault();
    let header = new Headers();
    header.append('Accept', 'application/json');
    let data = new FormData();
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const email = document.querySelector('#email');
    // let jsonObj = [];
    // let obj = {
    //     "username": username.value,
    //     "password": password.value,
    //     "email": email.value
    // }
    // jsonObj.push(obj);
    // console.log(jsonObj)
    data.append('username', username.value);
    data.append('password', password.value);
    data.append('email', email.value);
    let req = new Request(url, {
        method: 'POST',
        headers: header,
        body: data
    });
    console.log(req);
    fetch(req).then((response) => {
        document.querySelector('#message').textContent = "Server is responding";
    }).catch((err) => {
        console.log('ERROR:', err.message);
    });
});