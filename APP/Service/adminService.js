import * as adminDAL from '../DAL/adminDAL.js';
export function getAdmDetails(email, password) {
  return adminDAL.getAdmDetails(email, password);
}
