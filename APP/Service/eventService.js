import * as eventDAL from '../DAL/eventDAL.js';
import { v4 as uuidv4 } from 'uuid';
export async function getEvents() {
  return await eventDAL.getEvents();
}

export async function getEvent(eventId) {
  return await eventDAL.getEvent(eventId);
}
export async function createEvent(dataObj) {
  const event_id = uuidv4();
  return await eventDAL.createEvent(event_id, dataObj);
}
