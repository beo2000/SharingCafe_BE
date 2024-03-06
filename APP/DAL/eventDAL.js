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
export async function createEvent(eventId, dataObj) {
  return await Event.create({
    event_id: eventId,
    organizer_id: dataObj.organizer_id,
    title: dataObj.title,
    description: dataObj.description,
    time_of_event: dataObj.time_of_event,
    end_of_event: dataObj.end_of_event,
    location: dataObj.location,
    participants_count: dataObj.participants_count,
    is_approve: dataObj.is_approve,
    background_img: dataObj.background_img,
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