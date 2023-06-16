import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from "@vercel/kv";
import { createId } from '@paralleldrive/cuid2';
 
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try{
    console.log(request.body)
    const invite = request.query.invite as string;
    console.log(invite)
    console.log(request.query)

    const user = await kv.hgetall('user:me');
    console.log(user)

    switch (request.method) {
      case 'GET':
        if(invite){
          const shortInvite = await kv.get(invite)
          response.status(200).json({
            shortenedUrl: shortInvite
          });
        } else{
          response.status(400).send("No invite provided")
        }
        break;
      case 'POST':
        if(request.body.oob){
          const oob = request.body.oob

          const shortInvite = createId()
          await kv.set(shortInvite, oob)
          response.status(200).json({
            shortenedUrl: shortInvite
          });
        } else{
          response.status(400).send("No invite provided")
        }
        break;
      default:
        response.status(400).send("invalid request method")
        break;
    }
    // console.log(JSON.stringify(request.query))
    // console.log('body', request.body)
    // response.status(200).json({
    //   body: request.body,
    //   query: request.query,
    //   cookies: request.cookies,
    // });
  } 
  catch (error){
    console.warn('Error Processing Message', error)
    response.status(500).end()
  }
}