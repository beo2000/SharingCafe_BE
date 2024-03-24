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
    const messageId = await chatService.saveMessage(messageData);
    t.commit();
    return messageId;
  } catch (error) {
    console.error('Error sending message:', error);
    t.rollback();
  }
}
export async function getMessage(messageId) {
  try {
    const [message] = await chatService.getMessage(messageId);
    return message;
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
export async function getChatHistory(req, res) {
  try {
    const userId = req.query.userId;
    const loginUser = req.loginUser;
    const limit = req.query.limit;
    const offset = req.query.offset;
    console.log(loginUser);
    const result = await chatService.getChatHistory(
      loginUser.user_id,
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
