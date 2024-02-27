import { Role, User, UserInterest } from '../utility/DbHelper.js';

export async function getUserDetails(email, password) {
  const user = await User.findOne({
    attributes: [
      'user_id',
      'user_name',
      'password',
      'phone',
      'email',
      'profile_avatar',
      'Bio',
      'registration',
    ],
    include: [
      {
        model: Role,
        attributes: ['role_name'],
        where: {
          role_name: 'USER',
        },
        as: 'UserRole',
      },
    ],
    where: {
      email: email,
      password: password,
    },
    limit: 1,
  });
  console.log(user.dataValues);
  return user;
}

export async function getInterest(userInterestId){
  const result = await UserInterest.findByPk(userInterestId);
  return result;
}

export async function updateInterest(userInterest, userInterestDetails){
  await userInterest.update({
    interest_id: userInterestDetails.interest_id
  });
  return userInterest;
}