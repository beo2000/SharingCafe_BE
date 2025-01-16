import { TYPE_COMMENT } from '../common/CommonEnums.js';
import { Discuss, Comment } from '../utility/DbHelper.js'
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

export async function commentDiscussion(discussId, content, createdBy) {
  var comment = {
    blog_id: discussId,
    user_id: createdBy,
    content: content,
    parent_comment_id: null,
    ref_id: discussId,
    type: TYPE_COMMENT.DISCUSS
  }
  return await Comment.create(comment);
}

export async function getComments(discussId) {
  const sqlQuery = `
  SELECT c.comment_id, c.content, c.user_id, c.created_at, u.user_name, u.profile_avatar FROM public.comment c
    JOIN public."user" u ON u.user_id = c.user_id
    WHERE c.ref_id = '${discussId}' 
    AND c.type = '${TYPE_COMMENT.DISCUSS}';
    `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}