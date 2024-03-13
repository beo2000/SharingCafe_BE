import * as chatService from '../Service/chatService.js';
import { SequelizeInstance } from '../utility/DbHelper.js';

export async function viewMessage(req, res){
    try {
      const dataObj = req.body;
      const result = await chatService.viewMessage(dataObj);
      res.status(200).send(result);
    } catch (error){
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  }