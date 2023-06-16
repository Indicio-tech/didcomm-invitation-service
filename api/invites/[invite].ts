import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from "@vercel/kv";
 
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  console.log(request.method)
  const { invite } = request.query;
  console.log(invite)
  console.log(request.query)

  const user = await kv.hgetall('user:me');
  console.log(user)

  switch (request.method) {
    case 'GET':
      response.status(200).json({
        body: request.body,
        query: request.query,
        cookies: request.cookies,
      });
      break;
    default:
      response.status(400).json({
        error: "invalid request method"
      })
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