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

  switch (method) {
    case 'GET':
       
const {page=1,limit=500,toDate,fromDate } = query;

try {
 if(toDate && fromDate){
 const products = await Product.find({date:{
   $gte: new Date(fromDate),
   $lte: new Date(toDate),
 }}).limit(limit).skip((page-1)*limit).sort({date:-1})



 const totalDocuments = await Product.countDocuments({date:{
   $gte: new Date(fromDate),
   $lte: new Date(toDate)
 }})

 const pages = Math.ceil(totalDocuments/limit)
 res.status(200).json({ success: true, data: products ,totalPages:pages ,currentPage:page,count:totalDocuments})
}



} catch (error) {
 
 res.status(400).json({ success: false,error:error?.message})
}

      break
    case 'POST':
      try {
        const product = await Product.create(req.body)
        res.status(201).json({ success: true, data: product })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PATCH':
      const {isActive} = body;
      const {id} = body;
      
      

      if(!id) {
        res.status(400).json({ success: false,message:"id is required" })
        return
      }

      try {
        const product = await Product.findOne({_id:id})
        product.status = isActive
        await product.save()

        res.status(201).json({ success: true, data: product })
      } catch (error) {
        res.status(400).json({ success: false , error:error?.message })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}