import { setCookie } from 'cookies-next';
import { checkReg } from '../../lib/checkReg';
import { userAuth } from '../../lib/userAuth';
export default async function handler(req, res) {
   try {
      const doc = await userAuth();
      const sheet = doc.sheetsByTitle['user_info'];
      const sheetRows = await sheet.getRows();
      if (checkReg(sheetRows, Object.values(req.body))) {
         setCookie('loggedIn', true, { req, res, maxAge: 60 * 60 * 24 });
         setCookie('user', req.body.email, { req, res, maxAge: 60 * 60 * 24 });
         res.status(200).json({ status: 'ok', message: 'user signed in succeed', data: req.body });
      } else {
         res.status(200).json({ message: 'please sign up before login' });
      }
   } catch (error) {
      res.status(500).json(error);
   }
}
