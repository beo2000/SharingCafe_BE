import * as chatDAL from '../DAL/chatDAL.js';
import { v4 as uuidv4 } from 'uuid';

export async function viewMessage(dataObj) {
    return await chatDAL.viewMessage(dataObj);
  }