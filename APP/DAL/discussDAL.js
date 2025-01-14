import { Discuss } from '../utility/DbHelper.js'
import { Message, SequelizeInstance } from '../utility/DbHelper.js';

export async function createDiscuss(discuss) {
  return await Discuss.create(discuss)
}

export async function getDiscuss(refId, type) {
  const sqlQuery = `
  SELECT d.id, d.ref_id, d.type, d.title, d.content, d.created_by, d.like_count, d.comment_count, u.user_name, u.profile_avatar FROM public.discuss d
    JOIN public."user" u ON u.user_id = d.created_by
    WHERE d.ref_id = '${refId}' 
    AND d.type = '${type}';
    `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}
