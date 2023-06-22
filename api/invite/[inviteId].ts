import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from "@vercel/kv";
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
 
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try{
    console.log(request.body)
    const inviteId = request.query.inviteId as string;

    if(!inviteId){
      response.status(400).send("No inviteId provided")
    }

    if(!uuidValidate(inviteId)){
      response.status(400).send("Invalid inviteId provided, please use a valid invitation UUID")
    }

    switch (request.method) {
      case 'GET':
        const invitation = await kv.get<string>(inviteId)
        if(invitation){
          response.status(200).json(invitation);
        } else{
          response.status(404).send(`No invitation found for invite ${inviteId}`)
        }
        break;
      case 'POST':
        if(request.body){
          await kv.set(inviteId, JSON.stringify(request.body))
          response.status(200).send(`Successfully added invitation with id ${inviteId}`);
        } else{
          response.status(400).send("No invitation provided")
        }
        break;
      default:
        response.status(400).send("invalid request method")
        break;
    }
  } 
  catch (error){
    console.warn('Error Processing Message', error)
    response.status(500).end()
  }
}