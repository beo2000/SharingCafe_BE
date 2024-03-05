import { Event, SequelizeInstance } from '../utility/DbHelper.js';
export async function getEvents() {
  const sqlQuery = `
  select 
    * 
  from
    public."event" e 
  left join 
    interest i 
    on 1=1 
    and e.interest_id = i.interest_id 
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
    * 
  from
    public."event" e 
  left join 
    interest i 
    on 1=1 
    and e.interest_id = i.interest_id
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
    location: dataObj.location,
    participants_count: dataObj.participants_count,
    is_approve: dataObj.is_approve,
    background_img: dataObj.background_img,
    interest_id: dataObj.interest_id,
  });
}
