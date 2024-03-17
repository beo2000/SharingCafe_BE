import { Event, SequelizeInstance } from '../utility/DbHelper.js';

export async function getEvents() {
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
    on u.user_id = e.organizer_id
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getEvent(eventId) {
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
  where e.event_id = '${eventId}'
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}
export async function createEvent(eventId, dataObj, fileData) {
  return await Event.create({
    event_id: eventId,
    organizer_id: dataObj.organizer_id,
    title: dataObj.title,
    description: dataObj.description,
    time_of_event: dataObj.time_of_event,
    end_of_event: dataObj.end_of_event,
    location: dataObj.location,
    adress: dataObj.adress,
    background_img: fileData?.path,
    is_visible: dataObj.is_visible,
    interest_id: dataObj.interest_id
  });
}

export async function updateEvent(eventId, eventDetails){
   return await Event.update({
    organizer_id: eventDetails.organizer_id,
    interest_id: eventDetails.interest_id,
    title: eventDetails.title,
    description: eventDetails.description,
    time_of_event: eventDetails.time_of_event,
    end_of_event: eventDetails.end_of_event,
    location: eventDetails.location,
    participants_count: eventDetails.participants_count,
    interest_id: eventDetails.interest_id,
    is_approve: eventDetails.is_approve,
    background_img: eventDetails.background_img,
    is_visible: eventDetails.is_visible
  }, {
    where: {event_id: eventId}
  });
}

export async function deleteEvent(eventId) {
  const deletedEvent = await Event.destroy({
    where: { event_id: eventId },
  });
  return deletedEvent;
}

export async function getNewEvents() {
  const date = new Date(Date.now());
  const sqlQuery = `
  select 
    e.event_id, e.title, e.background_img, e.time_of_event, e.end_of_event, e.adress, e.location, e.participants_count, u.user_name, i.name 
  from
    public."event" e 
  left join 
    interest i 
    on 1=1 
    and e.interest_id = i.interest_id
  join
    "user" u
    on u.user_id = e.organizer_id
    where e.time_of_event >= '${date.toUTCString()}' or e.end_of_event >= '${date.toUTCString()}'
  order by e.time_of_event
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getEventsByDate(dateString) {
  const date = new Date(dateString.date);
  const sqlQuery = `
  select 
    e.event_id, e.title, e.background_img, e.time_of_event, e.end_of_event, e.adress, e.location, e.participants_count, u.user_name, i.name 
  from
    public."event" e 
  left join 
    interest i 
    on 1=1 
    and e.interest_id = i.interest_id
  join
    "user" u
    on u.user_id = e.organizer_id
    where e.time_of_event >= '${date.toDateString()}'
  order by e.time_of_event
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getEventsByName(dataObj) {
  const name = dataObj.title;
  const sqlQuery = `
  select 
    e.event_id, e.title, e.background_img, e.time_of_event, e.end_of_event, e.adress, e.location, e.participants_count, u.user_name, i.name 
  from
    public."event" e 
  left join 
    interest i 
    on 1=1 
    and e.interest_id = i.interest_id
  join
    "user" u
    on u.user_id = e.organizer_id
    where e.title like '%${name}%'
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getPopularEvents() {
  const sqlQuery = `
  select 
  e.event_id, e.title, e.background_img, e.time_of_event, e.end_of_event, e.adress, e.location, e.participants_count, u.user_name, i.name 
  from
    public."event" e 
  left join 
    interest i 
    on 1=1 
    and e.interest_id = i.interest_id
  join
    "user" u
    on u.user_id = e.organizer_id
  order by e.participants_count desc
  limit 10
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}