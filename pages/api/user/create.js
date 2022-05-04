import admin from '../../../schema/admin';
import { hash } from 'bcrypt';
import dbConnect from '../../../utils/DBconnect';
import { superAdmin } from '../../../utils/middleware';



dbConnect();
export default superAdmin(async function handler(req, res) {
  if (req.method === 'POST') {
    const { body } = req;
    const { name, username,phone, password, isSuperAdmin } = body;

    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }
    const user = await admin.findOne({ username:username });

    if (!user) {
      hash(password, 10, async function (err, hash) {
        if (!err) {
          await admin.create(
            { name,
              username,
              phone,
              password: hash,
              isSuperAdmin,
             
            },
            function (err, user) {
              if (err) {
                res.status(500).json({
                  success: false,
                  message: err,
                });
              } else {
                res.status(200).json({
                  success: true,
                  message: 'user created successfully',
                });
              }
            },
          );
        } else {
          res.status(200).json({ success: false, message: 'user create failed' });
        }
      });
    } else {
      res.status(200).json({ message: 'username already exist', success: false });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed', success: false });
  }
});
