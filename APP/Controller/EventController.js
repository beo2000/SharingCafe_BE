import * as eventService from '../Service/eventService.js';
import { SequelizeInstance } from '../utility/DbHelper.js';
export async function getEvents(req, res) {
  try {
    const result = await eventService.getEvents();
    res.status(200).send(result);
    // response code ???
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getEvent(req, res) {
  try {
    const eventId = req.params.eventId;
    const result = await eventService.getEvent(eventId);
    res.status(200).send(result);
    // response code ???
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function createEvent(req, res) {
  const t = await SequelizeInstance.transaction();
  try {
    const dataObj = req.body;
    const result = await eventService.createEvent(dataObj);
    res.status(200).send(result);
    t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}
