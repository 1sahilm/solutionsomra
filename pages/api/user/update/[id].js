import { hash } from 'bcrypt';

import  admin  from '../../../../schema/admin';

import dbConnect from '../../../../utils/DBconnect';
import { superAdmin } from '../../../../utils/middleware';

dbConnect();
export default superAdmin(async function handler(req, res) {
  if (req.method === 'PATCH') {
    var updatePayload = {};

    req.body.username ? Object.assign(updatePayload, { username: req.body.username }) : null;
    req.body.password ? Object.assign(updatePayload, { password: await hash(req.body.password, 10) }) : null;
    req.body.isSuperAdmin ? Object.assign(updatePayload, { isSuperAdmin: req.body.isSuperAdmin }) : null;
    req.body.task ? Object.assign(updatePayload, { task: parseInt(req.body.task) }) : null;

    const update = await admin.updateOne(
      
      { _id: req.query.id },
      {
        $set: updatePayload
      },
    );
 
    res.status(200).json({ success: true, data: update ,updatePayload});
  } else {
    res.status(404).json({ message: 'PATCH method missing' });
  }
});
