import * as eventDAL from '../DAL/eventDAL.js';
import { v4 as uuidv4 } from 'uuid';

export async function getEvents(title, date, page) {
  return await eventDAL.getEvents(title, date, page);
}

export async function getEvent(eventId) {
  return await eventDAL.getEvent(eventId);
}
export async function createEvent(dataObj) {
  const event_id = uuidv4();
  return await eventDAL.createEvent(event_id, dataObj);
}

export async function updateEvent(eventId, eventDetails) {
  const event = await getEvent(eventId);
  if (!event) throw new Error('Event Not Found !!!');
  return await eventDAL.updateEvent(eventId, eventDetails);
}

export async function deleteEvent(eventId) {
  const event = await getEvent(eventId);
  if (!event) throw new Error('Event not found !!!');
  return await eventDAL.deleteEvent(eventId);
}

export async function getNewEvents() {
  return await eventDAL.getNewEvents();
}

export async function getEventsByDate(date) {
  return await eventDAL.getEventsByDate(date);
}

export async function getEventsByName(dataObj) {
  return await eventDAL.getEventsByName(dataObj);
}

export async function getPopularEvents() {
  return await eventDAL.getPopularEvents();
}

export async function updateImage(fileData){
  return await eventDAL.updateImage(fileData);
}

export async function getEventUrl(event_id){
  const event = await getEvent(event_id);
  if (!event) throw new Error('Event not found !!!');
  return {url: `https://sharing-coffee-be-capstone-com.onrender.com/api/event/${event_id}`};
}

export async function getUserEvent(title, date, page){
  return await eventDAL.getUserEvent(title, date, page);
}