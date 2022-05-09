


import S1Process from "../../../../../schema/S1-process";


import dbConnect from "../../../../../utils/DBconnect";
const db=dbConnect()

export default async function handler(req,res){
    const {method}=req
    await dbConnect()
    //,{name:1,agentId:1,date:1
    //find({}).select({name:1,agentId:1,date:1})
    switch(method){
        case 'GET':
            try{
                // const s1process=await (await S1Process.find({},{name:1,date:1}))
                const s1process=await S1Process.aggregate([
                    // {
                    //   $group: {
                    //     // Each `_id` must be unique, so if there are multiple
                    //     // documents with the same age, MongoDB will increment `count`.
                    //     _id: '$date',
                    //     count: { $sum: 1 }
                        
                    //   }
                    // },

//                     { $unwind: '$data' },
//   { $group: { _id: '$_id', data: { $addToSet: '$data' } } },

                    { $unwind: '$agentId' },
  { $group: { _id: '$date', data: { $addToSet: '$agentId' } } }
  ,
//   {
//     $match: {
//         count: {
//             sum:1,
//             "$gt": 1
//         }
//     }
// }

// {
//     $group: {
//         _id: {
//             date: "$date"
//         },
//         dups: {
//             "$addToSet": "$_id"
//         },
//         count: {
//             "$sum": 1
//         }
//     }
// }, {
//     $match: {
//         count: {
//             "$gt": 1
//         }
//     }
// }
                  ])
                // const s1process=await S1Process.aggregate().sortByCount({ $mergeObjects: [ "$date", "$agentId" ] })
                const uniquebyDate=[...new Set(s1process)]
                res.status(200).json({sucess:true,data:s1process})

            }
            catch(error){
                res.status(400).json({sucess:false})

            }
            break;

        case 'POST':
            try{
                const s1process=await S1Process.create(req.body)
                res.status(201).json({sucess:true,data:s1process})
            }catch(error){
                res.status(400).json({sucess:false})

            }
            break;

        
        default:
            res.status(400).json({sucess:false})
        }
    
}

