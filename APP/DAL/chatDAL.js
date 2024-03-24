import { Message, SequelizeInstance } from '../utility/DbHelper.js';

export async function viewMessage(dataObj) {
  const sender = dataObj.sender_id;
  const receiver = dataObj.receiver_id;
  const sqlQuery = `
    
    `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function saveMessage(messageId, messageData) {
  const { from, to, message, timestamp } = messageData;

  const savedMessage = await Message.create({
    message_id: messageId,
    sender_id: from,
    receiver_id: to,
    content: message,
    created_at: timestamp,
    is_read: false,
  });

  return savedMessage;
}
export async function getChatHistory(userIdFrom, userIdTo, limit, offset) {
  const sqlQuery = `
    SELECT message_id, sender_id, receiver_id, "content", created_at, is_read FROM public.message
    WHERE 1 = 0
    or sender_id = ${userIdFrom}
    or sender_id = ${userIdFrom}
    or receiver_id = ${userIdTo}
    or receiver_id = ${userIdTo}
    LIMIT ${limit}
    OFFSET ${offset}
    `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}
