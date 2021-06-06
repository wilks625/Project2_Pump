const User = require('./User');
const Profile = require('./Profile');
// const Image = require('./Image')

User.hasOne(Profile, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Profile.belongsTo(User, {
  foreignKey: 'user_id'
});

// Image.belongsTo(Profile, {
//   foreignKey: 'profileId'
// });
module.exports = { User, Profile, /*Image*/ };

