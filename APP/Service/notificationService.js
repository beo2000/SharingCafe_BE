import * as notificationDAL from '../DAL/notificationDAL.js';

export async function getNotificationHistoryByUserId(userId) {
  return await notificationDAL.getNotificationHistoryByUserId(userId);
}
