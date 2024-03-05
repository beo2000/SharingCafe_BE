import * as userDAL from '../DAL/userDAL.js';
import { v4 as uuidv4 } from 'uuid';

export function getUserDetails(email, password) {
  return userDAL.getUserDetails(email, password);
}

export async function getUser(userId) {
  return await userDAL.getUser(userId);
}

export async function createInterest(userInterestDetails) {
  const user_interest_id = uuidv4();
  return await userDAL.createInterest(user_interest_id, userInterestDetails);
}

export async function getInterests(userId) {
  return await userDAL.getInterests(userId);
}

export async function getInterest(userInterestId) {
  return await userDAL.getInterest(userInterestId);
}

export async function updateInterest(userInterestId, userInterestDetails) {
  const userInterest = await getInterest(userInterestId);
  if (!userInterest) throw new Error('User Interest not found');
  return await userDAL.updateInterest(userInterest, userInterestDetails);
}

export async function deleteInterest(interestIds) {
  return await userDAL.deleteInterests(interestIds);
}
export async function getUserInfoById(userId) {
  const result = await userDAL.getUserDetailsById(userId);
  return result;
}

export async function getUserMatchByInterest(userId) {
  const result = await userDAL.getUserMatchByInterest(userId);
  return result;
}
export async function getUserMatchByInterestPaging(userId, limit, offset) {
  const result = await userDAL.getUserMatchByInterestPaging(
    userId,
    limit,
    offset,
  );
  const list = await userDAL.getUserMatchByInterest(userId);
  return { total: list.length, limit, offset, data: result };
}

export async function getMyEvents(userId){
  return await userDAL.getMyEvents(userId);
}

export async function getEventsByInterest(interestId){
  return await userDAL.getEventsByInterest(interestId);
}

export async function getBlogsByInterest(interestId){
  return await userDAL.getBlogsByInterest(interestId);
}

export async function getMyEvents(userId){
  return await userDAL.getMyEvents(userId);
}

export async function getEventsByInterest(interestId){
  return await userDAL.getEventsByInterest(interestId);
}

export async function getBlogsByInterest(interestId){
  return await userDAL.getBlogsByInterest(interestId);
}