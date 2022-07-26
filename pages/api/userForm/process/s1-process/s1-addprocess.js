

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
      
      const {page=1,limit=500,toDate,fromDate } = query;

       try {
        if(toDate && fromDate){
        const products = await S1Process.find({createdAt:{
          $gte: new Date(fromDate),
          $lte: new Date(toDate),
        }}).limit(limit).skip((page-1)*limit).sort({createdAt:-1})

        const totalDocuments = await S1Process.countDocuments({createdAt:{
          $gte: new Date(fromDate),
          $lte: new Date(toDate)
        }})

        const pages = Math.ceil(totalDocuments/limit)
        res.status(200).json({ success: true, data: products ,totalPages:pages ,currentPage:page})
      }

      

      // try {
      //   if(toDate && fromDate){
      //   const products = await S1Process.find({timestamp:{
      //     $gte: new Date(fromDate),
      //     $lte: new Date(toDate),
      //   }}).limit(limit).skip((page-1)*limit).sort({timestamp:-1})

      //   const totalDocuments = await S1Process.countDocuments({timestamp:{
      //     $gte: new Date(fromDate),
      //     $lte: new Date(toDate)
      //   }})

      //   const pages = Math.ceil(totalDocuments/limit)
      //   res.status(200).json({ success: true, data: products ,totalPages:pages ,currentPage:page})
      // }
      // else{
      //   res.status(400).json({ success: false, message:"toDate and fromDate not defined"})

      // }
      } catch (error) {
        
        res.status(400).json({ success: false,error:error?.message})
      }
      break
    case 'POST':
     

      const {agentId,name, process_id,process_name,brand_name,s_id,doc_id,SID1,Lot_type,priority,Contractor_Name
        ,company_name,product_url,found_on_jd,jd_productLink
        ,found_on_brandSite,brandSite_productLink,standard_product_name, remark,today_total_submission, till_date_submission, date,  force_replace } = req.body;

      if (!s_id || !doc_id ) {
        res.json({ success: false, data: 'Oops...Some Field Left Empty' });
      }else{
        const autocomplete = await S1Process.findOne({ s_id: s_id});
      // autocomplete ? await Products.deleteOne({ _id: autocomplete.id }) : null;

      if (autocomplete && !force_replace) {
        res.json({ success: false, data: 'product already Done try with another sid' });
      } else {
        force_replace ? await S1Process.deleteOne({ _id: autocomplete?.id }) : null;
        
        const data = [
          { 
            name:name,
            agentId:agentId,
            date:date,
            s_id:s_id,
            SID1:SID1,
            Lot_type:Lot_type,
            priority:priority,
            doc_id:doc_id,
            process_id:process_id,
            process_name:process_name,
            brand_name:brand_name,
            company_name:company_name,
            product_url:product_url,
            Contractor_Name:Contractor_Name,
            found_on_jd:found_on_jd,
            jd_productLink:jd_productLink,
            found_on_brandSite:found_on_brandSite,
            brandSite_productLink:brandSite_productLink,
            standard_product_name:standard_product_name,
            remark:remark,
            today_total_submission:today_total_submission,
            till_date_submission:till_date_submission,
            
           
           
           
            // timestamp:timestamp('YYYY/MM/DDTHH:mm:ss'),
            
          },
        ];
       
        

       

      try {
        await S1Process.create(data)
        let startOfToday = new Date();
        startOfToday.setHours(0,0,0,0);
        const todaysDocumentsCount = await S1Process.countDocuments( {name:name, "createdAt": { "$gte": startOfToday } } );
        const tillDateDocumentssCount = await S1Process.countDocuments( {"name": name } );

        res.status(201).json({ success: true, data: "created successfully",todaysDocumentsCount,tillDateDocumentssCount})

      } catch (error) {
        res.status(400).json({ success: false ,data:"Failed to Create" })
      }
    }}
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}