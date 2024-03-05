import * as userService from '../Service/userService.js';
export async function getUserMatchByInterest(req, res, next) {
  try {
    const loginUser = req.loginUser;
    const limit = req.query.limit || null;
    const offset = req.query.offset || null;
    let result = null;
    if (limit !== null && offset !== null)
      result = userService.getUserMatchByInterestPaging(
        loginUser.user_id,
        limit,
        offset,
      );
    else result = userService.getUserMatchByInterest(loginUser.user_id);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
