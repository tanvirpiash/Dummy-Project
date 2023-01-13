import { checkReg } from '../../lib/checkReg';
import { userAuth } from '../../lib/userAuth';
export default async function handler(req, res) {
   let { name, phone, email } = req.body;
   try {
      const doc = await userAuth();
      const sheet = doc.sheetsByTitle['user_info'];
      const sheetRows = await sheet.getRows();
      if (checkReg(sheetRows, Object.values(req.body))) {
         res.status(200).json({ message: 'Already signed up with these credentials' });
      } else {
         await sheet.addRow({ name, phone, email });
         await doc.addSheet({ title: `${phone}` });
         res.status(200).json({ message: 'user registration succeed', data: req.body });
      }
   } catch (error) {
      res.status(500).json(error);
   }
}
