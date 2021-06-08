const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log('stephen');

  const firstname = document.querySelector('#firstname-signup').value.trim();
  const lastname = document.querySelector('#lastname-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (firstname && lastname && username && email && password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ firstname, lastname, username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log(response);
      const profile = await fetch('/api/profiles/', {
        method: 'POST',
        body: JSON.stringify({ id: response.id }),
        headers: { 'Content-Type': 'application/json' },
      });

      document.location.replace('/userprofile');
    } else {
      alert(response.statusText);
      console.log(response);
      console.log('stephenERROR');
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
