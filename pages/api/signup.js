import { nanoid } from 'nanoid';
import { userAuth } from '../../lib/userAuth';
export default async function handler(req, res) {
   let { name, phone, email } = req.body;
   try {
      const doc = await userAuth();
      const sheet = doc.sheetsByTitle['user_info'];
      const sheetRows = await sheet.getRows();
      if (
         sheetRows.some((e) => {
            return e._rawData.includes(phone) || e._rawData.includes(email);
         })
      ) {
         res.status(200).json({ message: 'Already signed up with these credentials' });
      } else {
         const username = nanoid(6);
         await sheet.addRow({ username, name, phone, email });
         const user_sheet = await doc.addSheet({ title: username, headerValues: ['name', 'email'] });
         await user_sheet.addRow({ name, email });
         res.status(200).json({ message: 'user registration succeed', data: req.body });
      }
   } catch (error) {
      res.status(500).json(error);
   }
}
