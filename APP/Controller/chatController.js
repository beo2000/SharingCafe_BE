import * as chatService from '../Service/chatService.js';
import { SequelizeInstance } from '../utility/DbHelper.js';

export async function viewMessage(req, res) {
  try {
    const dataObj = req.body;
    const result = await chatService.viewMessage(dataObj);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function saveMessage(messageData) {
  const t = await SequelizeInstance.transaction();
  try {
    await chatService.saveMessage(messageData);
    t.commit();
  } catch (error) {
    console.error('Error sending message:', error);
    t.rollback();
  }
}
export async function getChatHistory(req, res) {
  try {
    const userId = req.query.userId;
    const loginUser = req.loginUser;
    const limit = req.query.limit;
    const offset = req.query.offset;
    const result = await chatService.getChatHistory(
      loginUser.userId,
      userId,
      limit,
      offset,
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
