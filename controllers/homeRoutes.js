const router = require('express').Router();
const { Profile, User } = require('../models');
const withAuth = require('../utils/auth');

router.get ('/', (req, res) => {
  res.redirect('/login') 
})
// router.get('/', async (req, res) => {
//   try {
//     // Get all profiles and JOIN with user data
//     const profileData = await Profile.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['username'],
//         },
//       ],
//     });
//     // Serialize data so the template can read it
//     const profiles = profileData.map((profile) => profile.get({ plain: true }));
//     console.log(profiles)
//     // Pass serialized data and session flag into template
//     res.render('profile', { 
//       profiles, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// router.get('/profile/:id', async (req, res) => {
//   try {
//     const profileData = await Profile.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });
//     const profile = profileData.get({ plain: true });
//     res.render('profile', {
//       ...profile,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


router.get('/register', async (req, res) => {
  try {
    // const profileData = await Profile.findByPk(req.params.id, {
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['firstname', 'lastname'],
    //     },
    //   ],
    // });
// console.log(profileData)
    // const profile = profileData.get({ plain: true });
    res.render('register', {
      // ...profile,
      // logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//single macthes page
router.get('/matches/:id', async (req, res) => {
  try {
    const profileData = await Profile.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['firstname', 'lastname'],
        },
      ],
    });
// console.log(profileData)
    const profile = profileData.get({ plain: true });
    res.render('clickedMatch', {
      ...profile,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//end


router.get('/matches', async (req, res) => {
  try {
    // Get all profiles and JOIN with user data
    const profileData = await Profile.findAll({
      include: [
        {
          model: User,
          attributes: ['email', 'password', 'username', 'firstname', 'lastname'],
        },
      ],
    });
// console.log(profileData)
    // Serialize data so the template can read it
    const profiles = profileData.map((profile) => profile.get({ plain: true }));
    // console.log(profiles)
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
    // Get all profiles and JOIN with user data
    // const profileData =  Profile.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['email', 'password', 'username', 'firstname', 'lastname'],
    //     },
    //   ],
    // });
// console.log(profileData)
//     // Serialize data so the template can read it
//     const profiles = profileData.map((profile) => profile.get({ plain: true }));
//     console.log(profiles)

    // Pass serialized data and session flag into template
    res.render('icebreak', { 
      // profiles,
      // logged_in: req.session.logged_in 
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
    // Get all profiles and JOIN with user data
    // const profileData = await Profile.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['email', 'password', 'username', 'firstname', 'lastname'],
    //     },
    //   ],
    // });
    const userData = await User.findByPk(req.session.user_id, {
      // attributes: { exclude: ['password'] },
      include: [
        { 
          model: Profile,
          attributes: ['bio', 'activities', 'age', 'location', 'snapchat', 'instagram', 'phonenumber'],
         }
      ],
    });
console.log(userData)
    // Serialize data so the template can read it
    // const profiles = profileData.map((profile) => profile.get({ plain: true }));
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
      // attributes: { exclude: ['password'] },
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

module.exports = router;