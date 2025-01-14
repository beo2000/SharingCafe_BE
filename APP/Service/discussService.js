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
