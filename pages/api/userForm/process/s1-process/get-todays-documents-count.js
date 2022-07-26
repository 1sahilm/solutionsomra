


import S1Process from "../../../../../schema/S1-process";
import timestamp from "time-stamp"



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

    const id = query?.id;

   
      
        try {
            let startOfToday = new Date();
            startOfToday.setHours(0,0,0,0);
            const todaysDocumentsCount = await S1Process.countDocuments( {"name": id , "createdAt": { "$gte": startOfToday } } );
            const tillDateDocumentssCount = await S1Process.countDocuments( {"name": id } );
            res.status(201).json({ success: true, todaysDocumentsCount,tillDateDocumentssCount})
          } catch (error) {
            res.status(400).json({ success: false ,data: error?.message })
          }
      break
   
    default:
      res.status(400).json({ success: false })
      break
  }
}