const router = require('express').Router();
const { Profile, User } = require('../../models');
const { aggregate } = require('../../models/User');
const withAuth = require('../../utils/auth');

// searches for all profiles within database
router.get('/', async (req, res) => {
  try {
    const profileData = await Profile.findAll({
      // include: {model: User}
    })
    // console.log(profileData)
    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// searches for profile based on id
router.get('/:id', async (req, res) => {
  try {
    const profileData = await Profile.findByPk(req.params.id, {
      // include: {model: User}
    })
    // console.log(profileData)

    if (!profileData) {
      res.status(404).json({ message: 'No profile found with this id' })
    } else {
      res.status(200).json(profileData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

//creates profile
router.post('/', withAuth , async (req, res) => {
  try {
    const newProfile = await Profile.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProfile);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', /* withAuth ,*/ async (req, res) => {
  try {
    const profileData = await Profile.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!profileData) {
      res.status(404).json({ message: 'No profile found with this id!' });
      return;
    }

    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.put('/:id', async (req, res) => {
//   // update a category by its `id` value
//   console.log(req.body)
//   console.log(req.params)
//   try {
//     const profileData = await Profile.update(
//       { 
//         location: req.body.location ,
//        returning: true
//       },
//       {where: {id: parseInt(req.params.id)} }
//     )
//     console.log(profileData)
//     res.status(200).json(profileData);
//   } catch (err) {
//     res.status(400).json(err);
//   }

// });

//This route will update the profile object 
router.put('/userprofile/:id', async (req, res) => {
  console.log(req.body, "test")
  try {
    const profileData = await Profile.update(
      { 
        location: req.body.location ,
        bio: req.body.bio,
        activities: req.body.activities,
        age: req.body.age,
        phonenumber: req.body.phonenumber,
        snapchat: req.body.snapchat,
        instagram: req.body.instagram,

       returning: true
      },
      {where: {user_id: parseInt(req.params.id)} }
    )
    console.log(profileData)
    res.status(200).json(profileData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//This route will update the profile object 
router.put('/userprofile/:id', async (req, res) => {
  try {
    const profileData = await Profile.update(
      { 
        location: req.body.location ,
       returning: true
      },
      {where: {id: parseInt(req.params.id)} }
    )
    console.log(profileData)
    res.status(200).json(profileData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
