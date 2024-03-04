import {
  Role,
  SequelizeInstance,
  User,
  UserInterest,
} from '../utility/DbHelper.js';

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

export async function getUser(userId) {
  const result = await User.findByPk(userId);
  return result;
}

export async function getInterests(userId) {
  const result = await UserInterest.findAll({
    where: { user_id: userId },
  });
  return result;
}

export async function createInterest(userInterestId, userInterestDetails) {
  return await UserInterest.create({
    user_interest_id: userInterestId,
    interest_id: userInterestDetails.interest_id,
    user_id: userInterestDetails.user_id,
  });
}

export async function getInterest(userInterestId) {
  const result = await UserInterest.findByPk(userInterestId);
  return result;
}

export async function updateInterest(userInterest, userInterestDetails) {
  await userInterest.update({
    interest_id: userInterestDetails.interest_id,
  });
  return userInterest;
}

export async function deleteInterests(interestIds) {
  const deletedInterest = await UserInterest.destroy({
    where: { user_interest_id: interestIds },
  });
  return deletedInterest;
}
export async function getUserDetailsById(userId) {
  const sqlQuery = `
    select 
      user_id
      , role_name as role
    from 
      public."user" u 
    inner join 
      role r 
    on u.role_id = r.role_id
    where user_id = '${userId}'
  `;

  const userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}
export async function getUserMatchByInterest(userId) {
  const sqlQuery = `
WITH base AS (
  SELECT 
    u.user_id,
    array_agg(ui.interest_id) AS interests
  FROM 
    public."user" u 
  LEFT JOIN 
    user_interest ui ON u.user_id = ui.user_id 
  WHERE u.user_id = '${userId}'
  GROUP BY u.user_id
)
SELECT 
  u.*
FROM 
  public."user" u
LEFT JOIN 
  user_interest ui ON u.user_id = ui.user_id
WHERE 
  u.user_id != (SELECT user_id FROM base) 
  AND ui.interest_id = ANY ((SELECT interests FROM base)::uuid[]);
  `;

  const userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}

export async function getUserMatchByInterestPaging(userId, limit, offset) {
  const sqlQuery = `
WITH base AS (
  SELECT 
    u.user_id,
    array_agg(ui.interest_id) AS interests
  FROM 
    public."user" u 
  LEFT JOIN 
    user_interest ui ON u.user_id = ui.user_id 
  WHERE u.user_id = '${userId}'
  GROUP BY u.user_id
)
SELECT 
  u.*
FROM 
  public."user" u
LEFT JOIN 
  user_interest ui ON u.user_id = ui.user_id
WHERE 
  u.user_id != (SELECT user_id FROM base) 
  AND ui.interest_id = ANY ((SELECT interests FROM base)::uuid[])
limit ${limit}
offset ${offset}
  `;

  const userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}
