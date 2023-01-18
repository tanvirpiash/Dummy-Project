import { getCookies } from 'cookies-next';
import { userAuth } from '../lib/userAuth';
const dashboard = ({ name, email }) => {
   return (
      <div>
         welcome {name} <br /> Email {email}
      </div>
   );
};

export default dashboard;

export async function getServerSideProps({ req, res }) {
   const { user_name } = getCookies({ req, res });
   const doc = await userAuth();
   const sheet = doc.sheetsByTitle[user_name];
   const sheetRows = await sheet.getRows();
   return {
      props: {
         name: sheetRows[0]._rawData[0],
         email: sheetRows[0]._rawData[1],
      },
   };
}
