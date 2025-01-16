import { TYPE_COMMENT, TYPE_LIKE } from '../common/CommonEnums.js';
import { Discuss, Comment, Like } from '../utility/DbHelper.js'
import { Message, SequelizeInstance } from '../utility/DbHelper.js';

export async function createDiscuss(discuss) {
  return await Discuss.create(discuss)
}

export async function getDiscuss(refId, type, currentUserId) {
  const sqlQuery = `
  SELECT d.id, d.ref_id, d.type, d.title, d.content, d.created_by, d.like_count, d.comment_count, u.user_name, u.profile_avatar,
    (SELECT COUNT(*) > 0 FROM public."like" l WHERE '${currentUserId}' = l.user_id AND l.ref_id = d.id AND l.type = ${TYPE_LIKE.DISCUSS}) AS is_like
    FROM public.discuss d
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

export async function likeDiscuss(discussId, userId, isLike) {
  const unLikeQuery = `
    DELETE FROM public.like WHERE ref_id = '${discussId}' AND type = '${TYPE_LIKE.DISCUSS}' AND user_id = '${userId}';
  `
  const updateLikeCount = `
    UPDATE public.discuss SET like_count = like_count ${isLike ? '+' : '-'} 1 WHERE id = '${discussId}';
  `;
  isLike ? 
  Like.create({
    ref_id: discussId,
    type: TYPE_LIKE.DISCUSS,
    user_id: userId
  })
  : await SequelizeInstance.query(unLikeQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    raw: true,
  });
  await SequelizeInstance.query(updateLikeCount, {
    type: SequelizeInstance.QueryTypes.UPDATE,
    raw: true,
  });
  return {
    message: `Discuss ${isLike ? 'liked' : 'unliked'} successfully`
  };
}