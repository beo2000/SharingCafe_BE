import { Event } from '../utility/DbHelper.js';
export async function getEvents() {
  const result = await Event.findAll();
  return result;
}

export async function getEvent(eventId) {
  const result = await Event.findByPk(eventId);
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
  });
}
