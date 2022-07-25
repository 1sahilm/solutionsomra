import { hash } from 'bcrypt';

import Message from '../../../../../schema/AddMessage';

// import dbConnect from '../../../../utils/DBconnect';
import dbConnect from '../../../../../utils/DBconnect';
// import { superAdmin } from '../../../../utils/middleware';
import { superAdmin} from '../../../../../utils/middleware';

dbConnect();
export default superAdmin(async function handler(req, res) {
  if (req.method === 'PATCH') {
    var updatePayload = {};

    req.body.message ? Object.assign(updatePayload, { message: req.body.message }) : null;
    // req.body.process_name? Object.assign(updatePayload, { password: await hash(req.body.password, 10) }) : null;
    // req.body.process_name ? Object.assign(updatePayload, { process_name: req.body.process_name}) : null;
    // req.body.task ? Object.assign(updatePayload, { task: parseInt(req.body.task) }) : null;

    const update = await Message.updateOne(
      
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
