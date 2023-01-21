import Link from 'next/link';
import { userAuth } from '../lib/userAuth';
const dashboard = ({ userinfo }) => {
   return (
      <div>
         {Object.keys(userinfo).map((e, index) => {
            return (
               <div key={`${typeof e}-${index}`}>
                  <Link href={`/user/${e}`}>User{index}</Link>
                  {userinfo[e].map((e, index) => {
                     return (
                        <div key={`inner${typeof e}-${index}`}>
                           {e[0]}
                           <br />
                           {e[1]}
                        </div>
                     );
                  })}
               </div>
            );
         })}
      </div>
   );
};

export default dashboard;

export async function getServerSideProps({ req, res }) {
   const doc = await userAuth();
   const sheet = await doc.sheetsByTitle['user_info'];
   const sheetRows = await sheet.getRows();
   const usernames = sheetRows.map((e) => {
      return e.username;
   });
   let userinfo = new Object();
   for (let username of usernames) {
      let usersheet = doc.sheetsByTitle[username];
      let allRows = await usersheet.getRows();
      userinfo[username] = new Array();
      allRows.map((e) => {
         userinfo[username].push(e._rawData);
      });
   }
   return {
      props: {
         userinfo,
      },
   };
}
