import * as userDAL from '../DAL/userDAL.js';
export function getUserDetails(email, password) {
  return userDAL.getUserDetails(email, password);
}

export async function getInterest(userInterestId){
  return await userDAL.getInterest(userInterestId);
}

export async function updateInterest(userInterestId, userInterestDetails){
  const userInterest = await getInterest(userInterestId);
  if (!userInterest) throw new Error ('User Interest not found')
  return await userDAL.updateInterest(userInterest, userInterestDetails);
}
