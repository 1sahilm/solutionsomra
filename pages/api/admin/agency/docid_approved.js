import Product from '../../../../schema/Product';
import dbConnect from '../../../../utils/DBconnect';

const db = dbConnect();

// const handler = nc();
// // handler.user(isAuth, isAdmin);

// handler.get(async (req, res) => {
//   await db.connect();
//   const users = await User.find({});
//   await db.disconnect();
//   res.send(users);
// });

// export default handler;

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

//   const { page = 1, limit = 100, toDate, fromDate } = query;
//   try {
//     const agentId = query?.agentId;
//     const date = query?.createdAt;
//     const products = await (await Product.find({},{name:1,date:1,inputList1:1
         
//     }))

//   const totalDocuments=await Product.countDocuments()
//   res.status(200).json({ success: true, data:products ,totalDocuments:totalDocuments})
//   } catch (error) {
//     res.status(400).json({ success: false });
//   }


const {page=1,limit=500,toDate,fromDate } = query;

try {
 if(toDate && fromDate){
 const products = await Product.find({date:{
   $gte: new Date(fromDate),
   $lte: new Date(toDate),
 }}).limit(limit).skip((page-1)*limit).sort({date:-1})

 console.log({"hbhghg":products})

 const totalDocuments = await Product.countDocuments({date:{
   $gte: new Date(fromDate),
   $lte: new Date(toDate)
 }})

 const pages = Math.ceil(totalDocuments/limit)
 res.status(200).json({ success: true, data: products ,totalPages:pages ,currentPage:page})
}



} catch (error) {
 console.log(error?.message)
 res.status(400).json({ success: false,error:error?.message})
}
}

