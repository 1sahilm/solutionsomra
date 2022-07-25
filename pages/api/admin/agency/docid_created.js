import Product from '../../../../schema/Product';
import dbConnect from '../../../../utils/DBconnect';

const db=dbConnect()

// const handler = nc();
// // handler.user(isAuth, isAdmin);

// handler.get(async (req, res) => {
//   await db.connect();
//   const users = await User.find({});
//   await db.disconnect();
//   res.send(users);
// });

// export default handler;


export default async function handler (req, res) {
  const { method , query , body } = req
  

  await dbConnect()

  
        const {page=1,limit=200,toDate,fromDate } = query;
      try {
        const agentId = query?.agentId;
        const date=query?.date
        const products = await (await Product.find({},{name:1,date:1,inputList:1
         
          }))
        const totalDocuments=await Product.countDocuments()
        res.status(200).json({ success: true, data:products ,totalDocuments:totalDocuments})
      } catch (error) {
        res.status(400).json({ success: false }) 
     
    
  }
}