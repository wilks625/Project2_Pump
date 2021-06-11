const router = require('express').Router();
const { Profile, User, Image } = require('../models');
const withAuth = require('../utils/auth');
const zipcodes = require('zipcodes-nearby');

router.get('/register', async (req, res) => {
  try {
    res.render('register', {
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//single matches page
router.get('/match/:id', async (req, res) => {
  try {
    const profileData = await Profile.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['firstname', 'lastname'],
        },
      ],
    });
    const profile = profileData.get({ plain: true });
    res.render('clickedMatch', {
      ...profile,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/matches/:id', async (req, res) => {
  try {
    const profileZipCode = req.params.id;
    let nearbyZipcodes = [];

    await zipcodes.near(profileZipCode, 8047).then(function(zipcodes){
      nearbyZipcodes = zipcodes;
    });

    // make the sql query
    const profileData = await Profile.findAll({
      where: {
        location: nearbyZipcodes
      },
      include: [
        {
          model: User,
          attributes: ['email', 'username', 'firstname', 'lastname', ],
        },
      ],
    });
    
    // render the page
    const profiles = profileData.map((profile) => profile.get({ plain: true }));
    res.render('matches', { 
      profiles,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
    console.log("butt");
    console.log(err);
  }
});


router.get('/matches', async (req, res) => {
  try {
    // Get all profiles and JOIN with user data
    const profileData = await Profile.findAll({
      include: [
        {
          model: User,
          attributes: ['email', 'password', 'username', 'firstname', 'lastname', ],
        },
      ],
    });
    // Serialize data so the template can read it
    const profiles = profileData.map((profile) => profile.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('matches', { 
      profiles,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//icebreak page
router.get('/icebreak',   (req, res) => {
  try {
    res.render('icebreak', { 
    });  
  } catch (err) {
    res.status(500).json(err);
  }
});
//end 

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/userprofile');
    return;
  }
  res.render('login');
});



//user's profile route
router.get('/userprofile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        { 
          model: Profile,
          attributes: ['bio', 'activities', 'age', 'location', 'snapchat', 'instagram', 'phonenumber', 'profile_img_url'],
         }
      ],
    });
console.log(userData)
    // Serialize data so the template can read it
    const user = userData.get({ plain: true });
    // Pass serialized data and session flag into template
    res.render('userprofile', { 
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', /*withAuth,*/ async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const profileData = await User.findByPk(req.session.user_id, {
      include: [
        { 
          model: User,
          attributes: ['firstname', 'lastname'],
         }
      ],
    });
    const profile = profileData.get({ plain: true });
    res.render('profile', {
      ...profile,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//update profile page 
//user's profile route
router.get('/userprofile/:id', withAuth, async (req, res) => {
  try {
    const profileData = await User.findByPk(req.session.user_id, {
      // attributes: { exclude: ['password'] },
      include: [
        { 
          model: Profile,
          attributes: ['bio', 'activities', 'age', 'location', 'snapchat', 'instagram', 'phonenumber', 'profile_img_url'],
         }
      ],
    });
console.log(profileData)
    // Serialize data so the template can read it
    // const profiles = profileData.map((profile) => profile.get({ plain: true }));
    const profile = profileData.get({ plain: true });
    
    // Pass serialized data and session flag into template
    res.render('updateProfile', { 
      ...profile,
      logged_in: true,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;