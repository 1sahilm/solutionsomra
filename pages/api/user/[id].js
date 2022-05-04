import admin from '../../../schema/admin';
import dbConnect from '../../../utils/DBconnect';
import { superAdmin } from '../../../utils/middleware';

dbConnect();
export default superAdmin(async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await admin.findById(req.query.id);

      res.status(200).json({ data });
    } catch (err) {
      res.json({ success: false, data: 'Server Error' });
    }
  } else {
    res.json({ success: false, data: 'Method not allowed' });
  }
});
