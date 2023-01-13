const { GoogleSpreadsheet } = require('google-spreadsheet');
export async function userAuth() {
   const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
   try {
      await doc.useServiceAccountAuth({
         client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
         private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
      });
      await doc.getInfo();
   } catch (error) {
      return error;
   }
   return doc;
}
