import {
    Message,
    SequelizeInstance
  } from '../utility/DbHelper.js';

  export async function viewMessage(dataObj) {
    const sender = dataObj.sender_id;
    const receiver = dataObj.receiver_id;
    const sqlQuery = `
    
    `;
    const result = await SequelizeInstance.query(sqlQuery, {
      type: SequelizeInstance.QueryTypes.SELECT,
      raw: true,
    });
    return result;
  }