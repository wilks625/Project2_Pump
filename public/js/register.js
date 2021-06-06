const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log("stephen")
  
    const fname = document.querySelector('#firstname-signup').value.trim();
    const lname = document.querySelector('#lastname-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (fname && lname && username && email && password) {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({ fname, lname, username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
          console.log(response)
        document.location.replace('/userprofile');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);