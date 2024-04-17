import { Schedule, SequelizeInstance, Rating } from '../utility/DbHelper.js';

export async function createSchedule(schedule_id, dataObj) {
  return await Schedule.create({
    schedule_id: schedule_id,
    content: dataObj.content,
    location: dataObj.location,
    schedule_time: dataObj.date,
    sender_id: dataObj.sender_id,
    receiver_id: dataObj.receiver_id,
  });
}

export async function getScheduleBetweenUsers(userId, anotherUserId) {
  const sqlQuery = `
select
	schedule_id,
	"content",
	schedule_time,
	is_accept,
	created_at,
	"location",
	sender_id,
	receiver_id
from
	public.schedule
where
	1 = 0
	or (
      sender_id = '${userId}'
	  and receiver_id = '${anotherUserId}'
    )
	or (
      sender_id = '${anotherUserId}'
	  and receiver_id = '${userId}'
    )
order by
	schedule_time desc
  `;

  const userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}

export async function changeStatus(dataObj) {
  console.log(dataObj);
  return await Schedule.update(
    { is_accept: dataObj.is_accept },
    { where: { schedule_id: dataObj.schedule_id } },
  );
}

export async function getScheduleHistoryByUserId(userId) {
  const sqlQuery = `
        SELECT
            *
        FROM
            public.schedule
        WHERE
            sender_id = '${userId}'
            OR receiver_id = '${userId}'
            AND schedule_time < NOW()
        ORDER BY
            schedule_time DESC
    `;

  const userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return userDetails;
}
export async function getScheduleId(scheduleId) {
  const sqlQuery = `
SELECT
    u.user_name as user_from,
    u.token_id as user_from_token,
    u2.user_name as user_to,
    u2.token_id as user_token_token,
    'The schedule ' || s.content || ' occurring at ' || s.schedule_time || ' has been updated as ' || now()  as message
FROM
    public.schedule s
inner join public.user u
on u.user_id = s.sender_id
inner join public.user u2
on u2.user_id = s.receiver_id
WHERE
    schedule_id = '${scheduleId}'
    `;

  const userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return userDetails;
}

export async function getScheduleById(scheduleId) {
  const sqlQuery = `
  SELECT
  u.user_name as user_from,
  u.token_id as user_from_token,
  u2.user_name as user_to,
  u2.token_id as user_token_token,
  'The schedule ' || s.content || ' occurring at ' || s.schedule_time || ' has been updated as ' || now()  as message
FROM
  public.schedule s
inner join public.user u
on u.user_id = s.sender_id
inner join public.user u2
on u2.user_id = s.receiver_id
WHERE
  schedule_id = '${scheduleId}'
  `;

  const userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}

export async function createRating(rating_id, loginUser, dataObj) {
  return await Rating.create({
    schedule_id: dataObj.schedule_id,
    content: dataObj.content,
    rating_id: rating_id,
    user_id: loginUser,
    rating: dataObj.rating,
  });
}