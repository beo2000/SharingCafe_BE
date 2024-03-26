import {
  Role,
  User,
  UserInterest,
  SequelizeInstance,
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

export async function register(userId, user) {
  return await User.create({
    user_id: userId,
    user_name: user.user_name,
    password: user.password,
    phone: user.phone,
    email: user.email,
    Bio: user.Bio,
    gender: user.gender,
    age: user.age,
    is_available: true,
    role_id: '6150886b-5920-4884-8e43-d4efb62f89d3',
  });
}

export async function getUserByPhone(phone) {
  // const sqlQuery = `
  // select
  //   u.*
  // from
  //   "user" u
  //  where u.phone = '${phone}'
  // `;
  // const result = await SequelizeInstance.query(sqlQuery, {
  //   type: SequelizeInstance.QueryTypes.SELECT,
  //   raw: true,
  // });
  // return result;
  return await User.findOne({
    where: { phone: phone },
  });
}

export async function getUserByEmail(email) {
  // const sqlQuery = `
  // select
  //   u.*
  // from
  //   "user" u
  //  where u.email = '${email}'
  // `;
  // const result = await SequelizeInstance.query(sqlQuery, {
  //   type: SequelizeInstance.QueryTypes.SELECT,
  //   raw: true,
  // });
  // return result;
  return await User.findOne({
    where: { email: email },
  });
}

export async function getUser(userId) {
  const sqlQuery = `
  select 
    u.user_id, u."Bio", u.user_name, u.profile_avatar, u.email, u.phone
  from 
    "user" u
   where u.user_id = '${userId}'
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getInterests(userId) {
  const sqlQuery = `
  select 
    i.name
  from 
    user_interest q
  join 
    interest i 
    on 1=1 
    and q.interest_id = i.interest_id
  join
    "user" u
    on u.user_id = q.user_id
   where q.user_id = '${userId}'
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
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
  const sqlQuery = `
  select 
    q.*, u.user_name, i.name
  from 
    user_interest q
  join 
    interest i 
    on 1=1 
    and q.interest_id = i.interest_id
  join
    "user" u
    on u.user_id = q.user_id
   where q.user_interest_id  = '${userInterestId}'
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
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
export async function getUserDetailsByEmail(email) {
  const sqlQuery = `
    select 
      user_id
      , role_name as role
    from 
      public."user" u 
    inner join 
      role r 
    on u.role_id = r.role_id
    where u.email = '${email}'
  `;

  const userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}
export async function getUserDetailsById(userId) {
  const sqlQuery = `
  SELECT 
  u.*,
  json_agg(
      json_build_object(
          'interest_id', ui.interest_id,
          'interest_name', ui.name
      )
    ) AS interest_list
  FROM 
    public."user" u 
  INNER JOIN 
    (SELECT * FROM role WHERE role_name = 'USER') r ON u.role_id = r.role_id
  LEFT JOIN 
    (
        SELECT 
            ui.user_id,
            ui.interest_id,
            i.name
        FROM 
            user_interest ui 
        INNER JOIN 
            interest i ON i.interest_id = ui.interest_id
        ORDER BY 
            ui.user_id, ui.interest_id  
    ) ui ON ui.user_id = u.user_id
    where u.user_id = '${userId}'
  GROUP BY 
    u.user_id, u.role_id;  
  `;
  const userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return userDetails;
}
export async function getUserMatchByInterest(userId) {
  const sqlQuery = `
    SELECT 
    u.*
    FROM 
    public."user" u
    inner JOIN 
    user_interest ui ON u.user_id = ui.user_id
    WHERE 
    u.user_id != '${userId}'
    AND ui.interest_id IN (
    select 
      interest_id
    from 
      user_interest
    where user_id = '${userId}')
  `;

  const userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}

export async function getUserMatchWithStatus(userId) {
  const sqlQuery = `
    select 
      *
    from 
      public.user u
    inner join 
      user_match um
      on um.user_id_liked = u.user_id 
    inner join 
      user_match_status ums 
      on um.user_match_status_id  = ums.user_match_status_id 
    where um.current_user_id  = '${userId}'
      `;
  const userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}

export async function getUserMatchWithPendingStatus(userId) {
  const sqlQuery = `
    select 
      *
    from 
      public.user u
    inner join 
      user_match um
      on um.user_id_liked = u.user_id 
    inner join 
      user_match_status ums 
      on um.user_match_status_id  = ums.user_match_status_id 
    where 
      um.current_user_id  = '${userId}'
      and ums.user_match_status = 'Pending'
      `;
  const userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}

export async function getUserMatchByInterestPaging(userId, limit, offset) {
  const sqlQuery = `
  SELECT 
    u.*
  FROM 
    public."user" u
  inner JOIN 
    user_interest ui ON u.user_id = ui.user_id
  WHERE 
    u.user_id != '${userId}'
    AND ui.interest_id IN (
    select 
      interest_id
    from 
      user_interest
    where user_id = '${userId}')
  limit ${limit}
  offset ${offset}
  `;

  const userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}

export async function getMyEvents(userId) {
  const sqlQuery = `
  select 
    e.event_id, e.title, e.background_img, e.time_of_event, e.address, e.location, e.participants_count
  from
    public."event" e 
  left join 
    interest i 
    on 1=1 
    and e.interest_id = i.interest_id
  join
    "user" u
    on e.organizer_id = u.user_id
  where e.organizer_id = '${userId}'
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getEventsByInterest(interestId) {
  const sqlQuery = `
  select 
    e.*, u.user_name, i.name 
  from
    public."event" e 
  left join 
    interest i 
    on 1=1 
    and e.interest_id = i.interest_id
  join
    "user" u
    on e.organizer_id = u.user_id
  where e.interest_id = '${interestId}'
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getBlogsByInterest(interestId) {
  const sqlQuery = `
  select 
    b.*, u.user_name, i.name
  from 
    blog b 
  join 
    interest i 
    on 1=1 
    and b.interest_id = i.interest_id
  join
    "user" u
    on u.user_id = b.user_id
   where b.interest_id = '${interestId}'
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getSuggestEvent(userId) {
  const sqlQuery = `
  select 
    e.title, e.background_img, e.time_of_event, e.address, e.participants_count
	from
		user_interest q
	join
		interest i 
		on q.interest_id = i.interest_id
	join 
		"user" u 
		on u.user_id = q.user_id 
	join "event" e 
		on e.interest_id = i.interest_id 
	where u.user_id = '${userId}'
  order by e.participants_count desc
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function updateProfile(userId, profile) {
  return await User.update(
    {
      user_name: profile.user_name,
      phone: profile.phone,
      email: profile.email,
      Bio: profile.Bio,
      password: profile.password,
      profile_avatar: profile.profile_avatar,
      gender: profile.gender,
      age: profile.age,
    },
    {
      where: { user_id: userId },
    },
  );
}

export async function updateAvatar(userId, fileData) {
  return await User.update(
    {
      profile_avatar: fileData?.path,
    },
    {
      where: { user_id: userId },
    },
  );
}
export async function deleteUserInterests(userId) {
  const sqlQuery = `
  DELETE FROM public.user_interest
  WHERE user_id = :userId
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: userId,
    type: SequelizeInstance.QueryTypes.DELETE,
    raw: true,
  });
  return result;
}

export async function upsertInterests(data) {
  const sqlQuery = `
  INSERT INTO public.user_interest (user_interest_id, interest_id, user_id, created_at) 
  VALUES(gen_random_uuid(), :interest_id, :user_id, now()));
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: data,
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}
