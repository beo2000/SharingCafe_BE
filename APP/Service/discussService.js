import * as Discuss from '../DAL/discussDAL.js'

export async function createDiscuss(discuss, user) {
  discuss.created_by = user.user_id
  return await Discuss.createDiscuss(discuss)
}

export async function getDiscuss(query) {
  var refId = query.ref_id;
  var type = query.type;
  return await Discuss.getDiscuss(refId, type);
}

export async function commentDiscussion(discussId, content, user) {
  return await Discuss.commentDiscussion(discussId, content, user.user_id);
}

export async function getComments(discussId) {
  return await Discuss.getComments(discussId);
}