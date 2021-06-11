async function updateProfile  (event) 
 {
  event.preventDefault();
let userid = event.target.getAttribute("data-id"); 

  console.log("test");
  // Collect values from the login form
  const location = document.querySelector('#location').value.trim();
  const bio = document.querySelector('#bio').value.trim();
  const activities = document.querySelector('#activities').value.trim();
  const snapchat = document.querySelector('#snapchat').value.trim();
  const instagram = document.querySelector('#instagram').value.trim();
  const age = document.querySelector('#age').value.trim();
  const phonenumber = document.querySelector('#phonenumber').value.trim();


  // if (location && bio && activities && snapchat && instagram && age && phonenumber) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/profiles/userprofile/' + userid, {
      method: 'PUT',
      body: JSON.stringify({ location, bio, activities, snapchat, instagram, age, phonenumber}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/userprofile');
    } else {
      alert(response.statusText);
    }
//  } 
};

document
  .getElementById('updateprofilebutton')
  .addEventListener('click', updateProfile);