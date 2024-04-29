import {
  Role,
  User,
  UserInterest,
  SequelizeInstance,
} from '../utility/DbHelper.js';

export async function getUserDetails(email, password) {
  let user = await User.findOne({
    attributes: [
      'user_id',
      'user_name',
      'password',
      'phone',
      'email',
      'profile_avatar',
      'story',
      'registration',
      'gender',
      'age',
      'purpose',
      'favorite_location',
      'lat',
      'lng',
      'address',
      'token_id',
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
      is_available: true,
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
    story: user.story,
    gender: user.gender,
    age: user.age,
    is_available: true,
    role_id: '6150886b-5920-4884-8e43-d4efb62f89d3',
  });
}

export async function getUserByPhone(phone) {
  // let sqlQuery = `
  // select
  //   u.*
  // from
  //   "user" u
  //  where u.phone = '${phone}'
  // `;
  // let result = await SequelizeInstance.query(sqlQuery, {
  //   type: SequelizeInstance.QueryTypes.SELECT,
  //   raw: true,
  // });
  // return result;
  return await User.findOne({
    where: { phone: phone },
  });
}

export async function getUserByEmail(email) {
  // let sqlQuery = `
  // select
  //   u.*
  // from
  //   "user" u
  //  where u.email = '${email}'
  // `;
  // let result = await SequelizeInstance.query(sqlQuery, {
  //   type: SequelizeInstance.QueryTypes.SELECT,
  //   raw: true,
  // });
  // return result;
  return await User.findOne({
    where: { email: email },
  });
}

export async function getUserToken(userId) {
  let sqlQuery = `
  select 
    u.user_id, u.token_id
  from 
    "user" u
   where u.user_id = '${userId}'
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}
export async function getUserInfoById(userId) {
  let sqlQuery = `
  select 
   u.lat,
   u.lng,
   u.token_id,
   u.user_name
  from 
    "user" u
   where u.user_id = '${userId}'
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}
export async function updateUserToken(email, token) {
  let sqlQuery = `
      UPDATE public."user" 
      SET 
        token_id = :token
      WHERE 
        email = :email
    `;

  let [result] = await SequelizeInstance.query(sqlQuery, {
    replacements: { email: email, token: token },
    type: SequelizeInstance.QueryTypes.UPDATE,
  });

  return result;
}

export async function getInterests(userId) {
  let sqlQuery = `
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
  let result = await SequelizeInstance.query(sqlQuery, {
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
  let sqlQuery = `
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
  let result = await SequelizeInstance.query(sqlQuery, {
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
  let deletedInterest = await UserInterest.destroy({
    where: { user_interest_id: interestIds },
  });
  return deletedInterest;
}
export async function getUserDetailsByEmail(email) {
  let sqlQuery = `
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

  let userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}
export async function getUserDetailsById(userId) {
  let sqlQuery = `
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
  let userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return userDetails;
}
export async function getUserMatchByInterest(
  userId,
  filterByAge,
  filterByGender,
  filterByAddress,
) {
  let sqlQuery = `
   WITH interests AS (
    SELECT 
        DISTINCT u.user_id,
        u.user_name,
        u.phone,
        u.email,
        u.profile_avatar,
        u.story,
        u.registration,
        u.gender,
        u.age,
        u.purpose,
        u.favorite_location,
        u.lat,
        u.lng,
        u.address,
        u.token_id 
    FROM 
        public."user" u
    INNER JOIN 
        user_interest ui ON ui.user_id = u.user_id
    INNER JOIN 
        interest i ON i.interest_id = ui.interest_id OR ui.interest_id = i.parent_interest_id
    WHERE 
        ui.interest_id IN (
            SELECT ui2.interest_id 
            FROM user_interest ui2 
            WHERE ui2.user_id = '${userId}'
        )
),
match_liked AS (
    SELECT 
        DISTINCT u.user_id,
        u.user_name,
        u.phone,
        u.email,
        u.profile_avatar,
        u.story,
        u.registration,
        u.gender,
        u.age,
        u.purpose,
        u.favorite_location,
        u.lat,
        u.lng,
        u.address,
        u.token_id
    FROM 
        public."user" u
    WHERE 
        u.user_id IN (
            SELECT current_user_id 
            FROM user_match um 
            WHERE user_id_liked = '${userId}'
        )
        AND u.user_id <> '${userId}'
),
sub_total as(
SELECT 
        u.user_id,
        u.user_name,
        u.phone,
        u.email,
        u.profile_avatar,
        u.story,
        u.registration,
        u.gender,
        u.age,
        u.purpose,
        u.favorite_location,
        u.lat,
        u.lng,
        u.address,
        u.token_id
    FROM 
        interests u
    WHERE 
        u.user_id <> '${userId}'
)
, base AS (
    select * from sub_total
    UNION 
    SELECT 
        u.user_id,
        u.user_name,
        u.phone,
        u.email,
        u.profile_avatar,
        u.story,
        u.registration,
        u.gender,
        u.age,
        u.purpose,
        u.favorite_location,
        u.lat,
        u.lng,
        u.address,
        u.token_id
    FROM 
        public."user" u
    WHERE 
        u.user_id <> '${userId}'
)
,total as(
 select 
    user_id,
    user_name,
    phone,
    email,
    profile_avatar,
    story,
    registration,
    gender,
    age,
    purpose,
    favorite_location,
    lat,
    lng,
    address,
    token_id
FROM 
    base u
WHERE
u.user_id NOT IN (
    SELECT user_id_liked 
    FROM user_match um 
    WHERE current_user_id = '${userId}'
)
)
SELECT 
    u.user_id,
    u.user_name,
    u.phone,
    u.email,
    u.profile_avatar,
    u.story,
    u.registration,
    u.gender,
    u.age,
    u.purpose,
    u.favorite_location,
    u.lat,
    u.lng,
    u.address,
    u.token_id
FROM 
    match_liked u
WHERE 
    u.user_id <> '${userId}'
    UNION 
 select 
 *
FROM total t
 where 1=1
  `;
  filterByAge
    ? (sqlQuery += `
and t.age = '${filterByAge}'
`)
    : '';
  filterByGender
    ? (sqlQuery += `
and t.gender = '${filterByGender}'
`)
    : '';
  filterByAddress
    ? (sqlQuery += `
and t.address = '${filterByAddress}'
`)
    : '';

  let userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}

export async function getUserMatchWithStatus(userId, status) {
  let sqlQuery = `
SELECT 
    *
FROM 
    public.user u
INNER JOIN 
    user_match um ON um.user_id_liked = u.user_id OR um.current_user_id = u.user_id 
INNER JOIN 
    user_match_status ums ON um.user_match_status_id = ums.user_match_status_id 
WHERE 
    (um.user_id_liked = '${userId}' or um.current_user_id = '${userId}')
    AND ums.user_match_status_id IS NOT null
    and u.user_id <> '${userId}'
  `;

  if (status == 'Pending') {
    sqlQuery = ` 
    SELECT 
    *
FROM 
    public.user u
INNER JOIN 
    user_match um ON um.user_id_liked = u.user_id OR um.current_user_id = u.user_id 
INNER JOIN 
    user_match_status ums ON um.user_match_status_id = ums.user_match_status_id 
WHERE 
    um.user_id_liked = '${userId}'
    AND ums.user_match_status_id IS NOT null
    and u.user_id <> '${userId}'
    AND ums.user_match_status = '${status}'`;
  } else if (status == 'Matched'){
    sqlQuery += ` AND ums.user_match_status = '${status}'`;
  }
  let userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}

export async function getUserMatchWithPendingStatus(userId) {
  let sqlQuery = `
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
  let userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}

export async function getUserMatchByInterestPaging(
  userId,
  filterByAge,
  filterByGender,
  filterByAddress,
  limit,
  offset,
) {
  let sqlQuery = `
WITH interests AS (
    SELECT 
        DISTINCT u.user_id,
        u.user_name,
        u.phone,
        u.email,
        u.profile_avatar,
        u.story,
        u.registration,
        u.gender,
        u.age,
        u.purpose,
        u.favorite_location,
        u.lat,
        u.lng,
        u.address,
        u.token_id 
    FROM 
        public."user" u
    INNER JOIN 
        user_interest ui ON ui.user_id = u.user_id
    INNER JOIN 
        interest i ON i.interest_id = ui.interest_id OR ui.interest_id = i.parent_interest_id
    WHERE 
        ui.interest_id IN (
            SELECT ui2.interest_id 
            FROM user_interest ui2 
            WHERE ui2.user_id = '${userId}'
        )
),
match_liked AS (
    SELECT 
        DISTINCT u.user_id,
        u.user_name,
        u.phone,
        u.email,
        u.profile_avatar,
        u.story,
        u.registration,
        u.gender,
        u.age,
        u.purpose,
        u.favorite_location,
        u.lat,
        u.lng,
        u.address,
        u.token_id
    FROM 
        public."user" u
    WHERE 
        u.user_id IN (
            SELECT current_user_id 
            FROM user_match um 
            WHERE user_id_liked = '${userId}'
        )
        AND u.user_id <> '${userId}'
),
sub_total as(
SELECT 
        u.user_id,
        u.user_name,
        u.phone,
        u.email,
        u.profile_avatar,
        u.story,
        u.registration,
        u.gender,
        u.age,
        u.purpose,
        u.favorite_location,
        u.lat,
        u.lng,
        u.address,
        u.token_id
    FROM 
        interests u
    WHERE 
        u.user_id <> '${userId}'
)
, base AS (
    select * from sub_total
    UNION 
    SELECT 
        u.user_id,
        u.user_name,
        u.phone,
        u.email,
        u.profile_avatar,
        u.story,
        u.registration,
        u.gender,
        u.age,
        u.purpose,
        u.favorite_location,
        u.lat,
        u.lng,
        u.address,
        u.token_id
    FROM 
        public."user" u
    WHERE 
        u.user_id <> '${userId}'
)
,total as(
 select 
    user_id,
    user_name,
    phone,
    email,
    profile_avatar,
    story,
    registration,
    gender,
    age,
    purpose,
    favorite_location,
    lat,
    lng,
    address,
    token_id
FROM 
    base u
WHERE
u.user_id NOT IN (
    SELECT user_id_liked 
    FROM user_match um 
    WHERE current_user_id = '${userId}'
  )
), user_in_age_and_address as(
  select 
    u.user_id,
    u.user_name,
    u.phone,
    u.email,
    u.profile_avatar,
    u.story,
    u.registration,
    u.gender,
    u.age,
    u.purpose,
    u.favorite_location,
    u.lat,
    u.lng,
    u.address,
    u.token_id
  from 
    public.user u
  where 1 = 1
  and u.user_id <> '${userId}'
  and u.age in (select age from "user" u2 where u2.user_id = '${userId}')
  and u.address in (select address from "user" u2 where u2.user_id = '${userId}')
)
, default_filter as (
select * from user_in_age_and_address
union
SELECT 
    u.user_id,
    u.user_name,
    u.phone,
    u.email,
    u.profile_avatar,
    u.story,
    u.registration,
    u.gender,
    u.age,
    u.purpose,
    u.favorite_location,
    u.lat,
    u.lng,
    u.address,
    u.token_id
FROM 
    match_liked u
WHERE 
    u.user_id <> '${userId}'
    and u.user_id not in (select blocker_id from user_block ub where blocked_id = '${userId}')
    and u.user_id not in (select blocked_id from user_block ub where blocker_id = '${userId}')
    UNION 
 select 
 *
FROM total t
  WHERE 
    1=1
    and t.user_id not in(select blocker_id from user_block ub where blocked_id = '${userId}')
    and t.user_id not in (select blocked_id from user_block ub where blocker_id = '${userId}')
)
select * from default_filter df
where 1=1 
`;
  filterByAge
    ? (sqlQuery += `
and df.age = '${filterByAge}'
`)
    : '';
  filterByGender
    ? (sqlQuery += `
and df.gender = '${filterByGender}'
`)
    : '';
  filterByAddress
    ? (sqlQuery += `
and df.address = '${filterByAddress}'
`)
    : '';

  sqlQuery += `
limit ${limit} 
offset ${offset}`;

  let userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}

export async function getMyEvents(userId) {
  let sqlQuery = `
  select 
    e.event_id, e.title, e.background_img, e.time_of_event, e.address, e.location, e.participants_count, e.is_visible, i.name
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
  let result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getEventsByInterest(interestId) {
  let sqlQuery = `
  select 
    e.*, u.user_name, i.name, u.profile_avatar
  from
    public."event" e 
  left join 
    interest i 
    on 1=1 
    and e.interest_id = i.interest_id
  join
    "user" u
    on e.organizer_id = u.user_id
  where e.interest_id = '${interestId}' and e.is_approve = true and e.is_visible = true
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getBlogsByInterest(interestId) {
  let sqlQuery = `
  select 
    b.*, u.user_name, i.name, u.profile_avatar
  from 
    blog b 
  join 
    interest i 
    on 1=1 
    and b.interest_id = i.interest_id
  join
    "user" u
    on u.user_id = b.user_id
   where b.interest_id = '${interestId}' and b.is_approve = true and b.is_visible = true
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getSuggestEvent(userId) {
  let date = new Date(Date.now());
  let sqlQuery = `
  select 
    e.title, e.background_img, e.time_of_event, e.address, e.participants_count, i.name
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
	where u.user_id = '${userId}' and e.is_approve = true and e.is_visible = true and e.end_of_event >= '${date.toUTCString()}'
  order by e.participants_count desc
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
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
      story: profile.story,
      password: profile.password,
      profile_avatar: profile.profile_avatar,
      gender: profile.gender,
      age: profile.age,
      purpose: profile.purpose,
      favorite_location: profile.favorite_location,
      lat: profile.lat,
      lng: profile.lng,
      address: profile.address,
      token_id: profile.token_id,
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
  let sqlQuery = `
  DELETE FROM public.user_interest
  WHERE user_id = '${userId}'
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    raw: true,
  });
  return result;
}

export async function upsertInterests(data) {
  let sqlQuery = `
  INSERT INTO public.user_interest (user_interest_id, interest_id, user_id, created_at) 
  VALUES(gen_random_uuid(), :interest_id, :user_id, now())
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    replacements: data,
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function deleteUnlikeTopics(userId) {
  let sqlQuery = `
  DELETE FROM public.unlike_topic
  WHERE user_id = '${userId}'
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    raw: true,
  });
  return result;
}

export async function upsertUnlikeTopics(data) {
  let sqlQuery = `
  INSERT INTO public.unlike_topic (unlike_topic_id, user_id, topic, created_at) 
  VALUES(gen_random_uuid(), :user_id, :topic, now());
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    replacements: data,
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  console.log(result);
  return result;
}

export async function deletePersonalProblems(userId) {
  let sqlQuery = `
  DELETE FROM public.personal_problem
  WHERE user_id = '${userId}'
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    raw: true,
  });
  return result;
}

export async function upsertPersonalProblems(data) {
  let sqlQuery = `
  INSERT INTO public.personal_problem (personal_problem_id, user_id, problem, created_at) 
  VALUES(gen_random_uuid(), :user_id, :problem, now());
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    replacements: data,
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function deleteFavoriteDrinks(userId) {
  let sqlQuery = `
  DELETE FROM public.favorite_drink
  WHERE user_id = '${userId}'
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    raw: true,
  });
  return result;
}

export async function upsertFavoriteDrinks(data) {
  let sqlQuery = `
  INSERT INTO public.favorite_drink (favorite_drink_id, user_id, favorite_drink, created_at) 
  VALUES(gen_random_uuid(), :user_id, :favorite_drink, now());
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    replacements: data,
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function deleteFreeTimes(userId) {
  let sqlQuery = `
  DELETE FROM public.free_time
  WHERE user_id = '${userId}'
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    raw: true,
  });
  return result;
}

export async function upsertFreeTimes(data) {
  let sqlQuery = `
  INSERT INTO public.free_time (free_time_id, user_id, free_time, created_at) 
  VALUES(gen_random_uuid(), :user_id, :free_time, now());
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    replacements: data,
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getTokenId(userId) {
  return await User.findOne({
    attributes: ['token_id'],
    where: {
      user_id: userId,
    },
  });
}

export async function getLocationByUserId(userId) {
  return await User.findOne({
    attributes: ['lat', 'lng'],
    where: {
      user_id: userId,
    },
  });
}

// update lat,lng of user
export async function updateLocation(userId, lat, lng) {
  return await User.update(
    {
      lat: lat,
      lng: lng,
    },
    {
      where: { user_id: userId },
    },
  );
}

//get profile of userId
export async function getProfile(userId) {
  let sqlQuery = `
  select 
    u.user_id, u.user_name, u.profile_avatar, u.story, u.gender, u.age, u.purpose, u.favorite_location, u.address,
    i.interest_id ,
    i."name" as interest_name,
    pp.personal_problem_id,
    pp.problem,
    ut.unlike_topic_id,
    ut.topic,
    fd.favorite_drink_id,
    fd.favorite_drink,
    ft.free_time_id,
    ft.free_time 
    from public."user" u
    left join public.user_interest ui on u.user_id = ui.user_id
    left join public.interest i on i.interest_id = ui.interest_id 
    left join public.personal_problem pp on pp.user_id = u.user_id 
    left join public.unlike_topic ut on ut.user_id = u.user_id 
    left join public.favorite_drink fd on fd.user_id = u.user_id
    left join public.free_time ft on ft.user_id = u.user_id 
    where u.user_id = '${userId}'
    `;
  let result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getProvince() {
  let sqlQuery = `
  select * from province
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}
export async function getUserBlockedByUser(userId) {
  let sqlQuery = `
  select 
  u.user_id,
  u.user_name,
  u.email,
  u.profile_avatar
from "user" u 
inner join user_block ub 
on blocked_id = u.user_id 
and ub.blocker_id = :userId
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    replacements: { userId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function blockingAUser(userId, blockedId) {
  let sqlQuery = `
  INSERT INTO public.user_block (blocker_id, blocked_id, created_at)
VALUES (:userId, :blockedId, now())
ON CONFLICT (blocker_id, blocked_id) DO NOTHING;
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    replacements: { userId, blockedId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}
export async function unBlockingAUser(userId, blockedId) {
  let sqlQuery = `
    DELETE FROM public.user_block 
    WHERE blocker_id = :userId AND blocked_id = :blockedId
  `;
  let result = await SequelizeInstance.query(sqlQuery, {
    replacements: { userId, blockedId },
    type: SequelizeInstance.QueryTypes.DELETE, // Changed QueryTypes.SELECT to QueryTypes.DELETE
    raw: true,
  });
  return result;
}
export async function getBlockCouple(messageData) {
  let { from, to } = messageData;
  let sqlQuery = `
      SELECT *
      FROM public.user_block
      WHERE (blocker_id = '${from}' AND blocked_id = '${to}')
          OR (blocker_id = '${to}' AND blocked_id = '${from}')
    `;
  let result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.INSERT,
    raw: true,
  });
  return result;
}
