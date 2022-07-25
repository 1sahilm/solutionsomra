

// import S1Process from "../../../../../schema/S1-process";
import S1Process  from "../../../../../schema/s1JsonData";


import dbConnect from "../../../../../utils/DBconnect";
const db=dbConnect()

// const handler = nc();
// handler.user(isAuth, isAdmin);

// handler.get(async (req, res) => {
//   await db.connect();
//   const users = await User.find({});
//   await db.disconnect();
//   res.send(users);
// });

// export default handler;


export default async function handler (req, res) {
  const { method,query } = req
  

 

  await dbConnect()

  switch (method) {
    
    case 'GET':
      
      try {
        const name = query?.username;
        const date=query?.date
        const products = await S1Process.find({},{SID:1,lot_type
            :1})
        // const jdata=await S1JsonData.find({},{SID1:{$exists:true}})
        // const s2=await S1Process.find({},{s_id:1}) 
    
        res.status(200).json({ success: true, data: products })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    
    default:
      res.status(400).json({ success: false })
      break
  }
}