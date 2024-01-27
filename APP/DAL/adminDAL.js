import { Role, User } from '../utility/DbHelper.js';

export async function getAdmDetails(email, password) {
  const user = await User.findOne({
    where: { userName, password },
    include: {
      model: Role,
      where: { roleName: 'admin' },
    },
  });
  return user;
}
