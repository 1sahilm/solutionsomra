

import S1Process from "../../../../../schema/S1-process";


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
        const products = await S1Process.find({})
        res.status(200).json({ success: true, data: products })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      const {agentId, process_id,process_name,brand_name,s_id,doc_id,timestamp
        ,company_name,product_url,found_on_jd,jd_productLink
        ,found_on_brandSite,brandSite_productLink,standard_product_name, remark,today_total_submission, till_date_submission, date,  force_replace } = req.body;

      if (!s_id || !doc_id ) {
        res.json({ success: false, data: 'Oops...Some Field Left Empty' });
      }else{
        const autocomplete = await S1Process.findOne({ ID: s_id});
      // autocomplete ? await Products.deleteOne({ _id: autocomplete.id }) : null;

      if (autocomplete && !force_replace) {
        res.json({ success: false, data: 'product already created' });
      } else {
        force_replace ? await Product.deleteOne({ _id: autocomplete?.id }) : null;
        const data = [
          { name:agentId,
            date:date,
            s_id:s_id,
            doc_id:doc_id,
            process_id:process_id,
            process_name:process_name,
            brand_name:brand_name,
            company_name:company_name,
            product_url:product_url,
            found_on_jd:found_on_jd,
            jd_productLink:jd_productLink,
            found_on_brandSite:found_on_brandSite,
            brandSite_productLink:brandSite_productLink,
            standard_product_name:standard_product_name,
            remark:remark,
            today_total_submission:today_total_submission,
            till_date_submission:till_date_submission,
            
           
           
           
            timestamp: timestamp,
            
          },
        ];

        console.log(data);
        





      try {
        await Product.create(data)
        res.status(201).json({ success: true, data: "created successfully"})
      } catch (error) {
        res.status(400).json({ success: false ,data:"Failed to Create"})
      }
    }}
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}