import admin from '../../../schema/admin';
import dbConnect from '../../../utils/DBconnect';
import { superAdmin } from '../../../utils/middleware';

dbConnect();
export default superAdmin(async function handler(req, res) {

    const { page = 1, limit = 5000 } = req.query;
    const { method , query , body } = req

    await dbConnect()
  
    switch (method) {
      case 'GET':
        try {
          const getAdmins = await admin
            .find({isSuperAdmin:false},{_id:1,name:1,username:1,timestamp:1 ,task:1,status:1})
            .limit(limit * 1)
            .skip((page - 1) * limit);
      
          const count = await admin.countDocuments({});
          let totalPages = 0;
      
          totalPages = count / limit;
          let totalApprox = totalPages.toFixed(0);
      
          if (totalPages > totalApprox) {
            totalPages = parseInt(totalApprox) + 1;
          } else if (parseInt(totalPages) < parseInt(totalApprox)) {
            totalPages = totalApprox;
          }
      
          res.status(200).json({ totalPages: totalPages, data: getAdmins });
        } catch (err) {
          res.json({ success: false, data: err.message });
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
          const product = await admin.findOne({_id:id})
          product.status = isActive
          await product.save()
  
          res.status(201).json({ success: true, data: product,lol :isActive?" true":" false" })
        } catch (error) {
          res.status(400).json({ success: false , error:error?.message })
        }
        break
      default:
        res.status(400).json({ success: false })
        break
    }
  
});
