//DELETING PRODUCTS BY ID
import Admin from '../../../../schema/admin';


import dbConnect from '../../../../utils/DBconnect';
import { superAdmin } from '../../../../utils/middleware';

// import timestamp from 'time-stamp';

dbConnect();
export default superAdmin(async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const remove = await Admin.deleteOne({ _id: req.query.id });
      res.status(200).json({ success: true, data: remove });
    } catch (err) {
      res.json({ success: false, data: err.message });
    }
  } else {
    res.status(404).json({ error: 'This Method is not allowed' });
  }
});
