import * as userService from '../Service/userService.js';
import { SequelizeInstance } from '../utility/DbHelper.js';
export async function getUserMatchByInterest(req, res, next) {
  try {
    const loginUser = req.loginUser;
    const filterByAge = req.query.filterByAge || null;
    const filterByGender = req.query.filterByGender || null;
    const filterByAddress = req.query.filterByAge || null;
    const limit = req.query.limit || null;
    const offset = req.query.offset || null;
    let result = null;
    if (limit !== null && offset !== null)
      result = await userService.getUserMatchByInterestPaging(
        loginUser.user_id,
        filterByAge,
        filterByGender,
        filterByAddress,
        limit,
        offset,
      );
    else
      result = await userService.getUserMatchByInterest(
        loginUser.user_id,
        filterByAge,
        filterByGender,
        filterByAddress,
      );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getUserMatchWithStatus(req, res, next) {
  try {
    const loginUser = req.loginUser;
    const status = req.query.status || '';
    const result = await userService.getUserMatchWithStatus(
      loginUser.user_id,
      status,
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function countUserByStatus(req, res, next) {
  try {
    const result = await userService.countUserByStatus();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getUserMatchWithPendingStatus(req, res, next) {
  try {
    const loginUser = req.loginUser;
    const result = await userService.getUserMatchWithPendingStatus(
      loginUser.user_id,
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function updateUserMatchStatus(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    const dataObj = req.body;
    const [result] = await userService.updateUserMatchStatus(
      loginUser.user_id,
      dataObj,
    );
    await t.commit();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.status(500).send({ error: error.message });
  }
}

export async function unFriendWithMatchId(req, res, next) {
  const matchedId = req.query.matchedId;
  try {
    const result = await userService.removeMatchedUser(matchedId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}