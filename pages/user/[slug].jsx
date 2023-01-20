import { userAuth } from '../../lib/userAuth';

const Dashboard = ({ allRows }) => {
   return (
      <div>
         {allRows.map((e, index) => {
            return (
               <div key={`outer${typeof e}-${index}`}>
                  {e.map((e, index) => {
                     return <div key={`inner ${typeof e}-${index}`}>{e}</div>;
                  })}
               </div>
            );
         })}
      </div>
   );
};

export default Dashboard;

export async function getStaticPaths() {
   const doc = await userAuth();
   const sheet = doc.sheetsByTitle['user_info'];
   const sheetRows = await sheet.getRows();
   const paths = sheetRows.map((e) => {
      return { params: { slug: e.username } };
   });
   return {
      paths,
      fallback: false,
   };
}

export async function getStaticProps({ params }) {
   const { slug } = params;
   const doc = await userAuth();
   const sheet = doc.sheetsByTitle[slug];
   const sheetRows = await sheet.getRows();
   const allRows = sheetRows.map((e) => {
      return e._rawData;
   });
   return {
      props: { allRows },
   };
}
