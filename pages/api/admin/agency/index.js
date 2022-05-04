import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import User from '../../../../schema/User';
import Task from '../../../../schema/Task';
import Product from '../../../../schema/Product';
import timestamp from 'time-stamp';


import dbConnect from '../../../../utils/DBconnect';
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
      const {page=1,limit=50 } = query;
      
      try {
        const products = await Product.find({}).limit(limit).skip((page-1)*limit)

        const totalDocuments = await Product.countDocuments({})

        const pages = Math.ceil(totalDocuments/limit)


        res.status(200).json({ success: true, data: products ,totalPages:pages ,currentPage:page})
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      const {name,agentId, inputList,inputList1,docId,total_catalog_created,cataloge_created,total_approval_done_today
        ,My_monthly_target_approved,target_left,My_monthly_target_Total_approved,total_number_product_created_today
        ,til_date,Month_Aproved_til_Date,total_number_product_approved_today, total_no_of_calls,total_bussiness_connected, total_docs_received_today, date, images, force_replace } = req.body;
        const removDublicateDocid=inputList1[0].docId
        // const removDublicateDocid=inputList1.map(id=>id.docId)
     
        
      if (!total_no_of_calls || !total_bussiness_connected || !total_docs_received_today) {
        res.json({ success: false, data: 'Oops...Some Field Left Empty' });
        return
      }else{
        // const autocomplete = await Product.findOne({ date:date,agentId:agentId });
        
        const autocomplete = await Product.findOne({date:date,agentId:agentId}) ;
        const findByDocId=await Product.findOne({inputList1:{$elemMatch:{docId:removDublicateDocid}}})
        console.log({"test2222":findByDocId})
        
      // autocomplete ? await Products.deleteOne({ _id: autocomplete.id }) : null;
      //|| (findByDocId&&total_approval_done_today=="Yes")

      if ((autocomplete && !force_replace)||(findByDocId&&total_approval_done_today=="Yes") ) {
        res.json({ success: false, data: 'product already created' });
      } else {
        force_replace ? await Product.deleteOne({ _id: autocomplete?.id }) : null;
        const data = [
          { name:name,
            agentId:agentId,
            date:date,
            inputList:inputList,
            inputList1:inputList1,
            total_no_of_calls:total_no_of_calls,
            total_bussiness_connected:total_bussiness_connected,
            total_catalog_created:total_catalog_created,
            cataloge_created:cataloge_created,
            total_docs_received_today:total_docs_received_today,
          
            total_approval_done_today:total_approval_done_today,
            My_monthly_target_approved:My_monthly_target_approved,
            target_left:target_left,

            My_monthly_target_Total_approved:My_monthly_target_Total_approved,
            total_number_product_created_today:total_number_product_created_today,
            til_date:til_date,
            Month_Aproved_til_Date:Month_Aproved_til_Date,
            total_number_product_approved_today:total_number_product_approved_today,



            
           
           
            images: images,
            timestamp:timestamp('YYYY/MM/DDTHH:mm:ss'),
            
          },
        ];

        console.log(data);
        



        // res.status(201).json({ success: true, data: "created successfully"})

      try {
        await Product.create(data)
        res.status(201).json({ success: true, data: "created successfully"})
      } catch (error) {
        console.log(error.message)
        res.status(400).json({ success: false ,data:"Failed to Create"})
      }
    }
  }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}