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

export async function createNotification(userId, content) {
  const sqlQuery = `
        INSERT INTO public.notification (notification_id, user_id, notification_status_id, created_at, content) 
        VALUES (gen_random_uuid(), :userId, '7c29f5fb-8379-480e-87bb-78c4d1d76845'::uuid, now(), :content)
        RETURNING *;
    `;

  try {
    const result = await SequelizeInstance.query(sqlQuery, {
      replacements: { userId, content },
      type: SequelizeInstance.QueryTypes.INSERT,
    });
    return result;
  } catch (error) {
    console.error('Error in createNotification:', error);
    throw error;
  }
}
