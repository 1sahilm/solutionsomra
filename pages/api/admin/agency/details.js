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
      try {
        const agentId = query?.agentId;
        const date=query?.date
        const target_left=query?.target_left
       /// const todaysDocumentsCount = await S1Process.countDocuments( {"name": id , "createdAt": { "$gte": startOfToday } } );
       //const tillDateDocumentssCount = await S1Process.countDocuments( {"name": id } );
        const products = await Product.find({},{ agentId:1,date:1,target_left:1 })
        res.status(200).json({ success: true, data:products })
      } catch (error) {
        res.status(400).json({ success: false }) 
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
      
      console.log("id"+id)

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