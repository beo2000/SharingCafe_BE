import * as chatDAL from '../DAL/chatDAL.js';
import * as userDAL from '../DAL/userDAL.js';
import * as firebaseHelper from '../utility/FirebaseHelper.js';
import { v4 as uuidv4 } from 'uuid';

export async function saveMessage(messageData) {
  const messageId = uuidv4();
  await chatDAL.saveMessage(messageId, messageData);
  const { from, to, messageContent } = messageData;
  const [userFrom] = await userDAL.getUserInfoById(from);
  const [userTo] = await userDAL.getUserInfoById(to);
  const title = `CHAT FEATURE`;
  const body = `${messageContent} by ${userFrom.user_name}`;
  await firebaseHelper.sendNotification(userTo.token_id, title, body);
  return messageId;
}
export async function getChatHistory(userIdFrom, userIdTo, limit, offset) {
  return await chatDAL.getChatHistory(userIdFrom, userIdTo, limit, offset);
}

export async function getMessage(messageId) {
  return await chatDAL.getMessage(messageId);
}
