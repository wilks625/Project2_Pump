const router = require('express').Router();
const { Profile, User } = require('../../models');
const withAuth = require('../../utils/auth');

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

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  console.log(req.body)
  console.log(req.params)
  try {
    const userData = await User.update(
      { 
        location: req.body.location ,
       returning: true
      },
      {where: {id: parseInt(req.params.id)} }
    )
    console.log(userData)
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }

});

module.exports = router;
