// const sequelize = require('../config/connection');
// const { User, Profile } = require('../models');

// const userData = require('./userData.json');
// const profileData = require('./profileData.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   for (var index = 0; index < users.length; index++) {
//     const profile = profileData[index];
//     await Profile.create({
//       ...profile,
//       user_id: users[index].id,
//     });
//   }

//   // for (const profile of profileData) {
//   //   await Profile.create({
//   //     ...profile,
//   //     user_id: users[Math.floor(Math.random() * users.length)].id,
//   //   });
//   // }

//   process.exit(0);
// };

// seedDatabase();

// for (var index = 0; index < users.length; index++) {
//   const profile = profileData[index];
//   await Profile.create({
//     ...profile,
//     user_id: users[index].id,
//   });
// }


const sequelize = require('../config/connection');
const { User, Profile } = require('../models');

const userData = require('./userData.json');
const profileData = require('./profileData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const profile of profileData) {
    
  }
  for (var index = 0; index < users.length; index++) {
    const profile = profileData[index];
    await Profile.create({
      ...profile,
      user_id: users[index].id,
    });
  }
  process.exit(0);
};

seedDatabase();