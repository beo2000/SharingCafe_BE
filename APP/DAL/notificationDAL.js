import { SequelizeInstance } from '../utility/DbHelper.js';

export async function getNotificationHistoryByUserId(userId) {
  const sqlQuery = `
  select * from notification n
inner join notification_status ns 
on 1=1
and n.notification_status_id = ns.notification_status_id 
where user_id = ${userId}
order by n.created_at DESC
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}
