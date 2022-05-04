// import mongoose from 'mongoose';

// const connection = {};

// async function dbConnect() {
//   if (connection.isConnected) {
//     return;
//   }
//   const db = await mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   connection.isConnected = db.connections[0].readyState;
//   console.log(connection.isConnected);
// }
// export default dbConnect;


// async function dbConnect(){
//   if(mongoose.connections[0].readyState){
//       console.log('already connected')
//       return
//   }

//   mongoose.connect(process.env.MONGO_URI,{
//       useNewUrlParser: true,
//   })
//   mongoose.connection.on('connected',()=>{
//       console.log('connected to mongodb')
//   })
//   mongoose.connection.on('eror',(err)=>{
//       console.log('connection error',err)
//   })
// }

// export default dbConnect


//=========================================================================================================================

import mongoose from 'mongoose'

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/


const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect () {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // bufferCommands: false,
      
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect