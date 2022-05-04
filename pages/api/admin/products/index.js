import nc from 'next-connect';
// import { isAdmin, isAuth } from '../../../../utils/auth';

import Product from '../../../../schema/Product'
import dbConnect from '../../../../utils/DBconnect';

const db=dbConnect();

const handler = nc();
// handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db;
  const products = await Product.find({});
  // await db.disconnect();
  // res.send(products);
  res.send("gheloo");
});

handler.post(async (req, res) => {
  await db
  const newProduct = new Product({
    name: 'sample name',
    // slug: 'sample-slug-' + Math.random(),
    // image: '/images/shirt1.jpg',
    price: 0,
    // category: 'sample category',
    // brand: 'sample brand',
    // countInStock: 0,
    // description: 'sample description',
    // rating: 0,
    // numReviews: 0,
  });

  const product = await newProduct.save();
  // await db.disconnect();
  res.send({ message: 'Product Created', product });
});

export default handler;
