import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import User from '../../../../schema/User';


import dbConnect from '../../../../utils/DBconnect';
const db=dbConnect()

const handler = nc();
handler.user(isAuth, isAdmin);

handler.get(async (req, res) => {
  await dbConnect();
  const users = await User.find({});
  await db.disconnect();
  res.send(users);
});

export default handler;


// export default async function handler (req, res) {
//   const { method } = req

//   await dbConnect()

//   switch (method) {
//     case 'GET':
//       try {
//         const users = await User.find({})
//         res.status(200).json({ success: true, data: users })
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break
//     case 'POST':
//       try {
//         const user = await User.create(req.body)
//         res.status(201).json({ success: true, data: user })
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break
//     default:
//       res.status(400).json({ success: false })
//       break
//   }
// }