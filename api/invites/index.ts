import type { VercelRequest, VercelResponse } from '@vercel/node';
 
export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  console.log("Handled by /invites/")
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}