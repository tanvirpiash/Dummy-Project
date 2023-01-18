import { setCookie } from 'cookies-next';
import { userAuth } from '../../lib/userAuth';
export default async function handler(req, res) {
   let { phone, email } = req.body;
   try {
      const doc = await userAuth();
      const sheet = doc.sheetsByTitle['user_info'];
      const sheetRows = await sheet.getRows();
      if (
         sheetRows.some((e) => {
            return e._rawData.includes(phone) && e._rawData.includes(email);
         })
      ) {
         const profile = sheetRows.find((e) => {
            return e._rawData.includes(phone) && e._rawData.includes(email);
         });
         setCookie('user_name', profile._rawData[0], { req, res, httpOnly: true });
         res.status(200).json({ status: 'ok', message: 'user signed in succeed', data: req.body });
      } else {
         res.status(200).json({ message: 'please sign up before login' });
      }
   } catch (error) {
      res.status(500).json(error);
   }
}
