const url = 'https://10.114.32.13/signup';

const buttonSubmit = document.querySelector('.form-button');
buttonSubmit.addEventListener('click', (e) => {
  e.preventDefault();


  let data = new FormData();
  data.append('username', username.value );
  data.append('password',password.value );
  data.append('email', email.value);

  console.log(data.username);

  let request = new Request( url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json; charset=utf-8' },
    mode: 'no-cors',
    body: data
  } );

  fetch( request  )
  .then((response) => {
    //return response.json();
    //})
  //.then((json) => {
    //  console.log(json);
   // })
  }).catch((err) => {
    console.log('ERROR:', err.message);
  });
});