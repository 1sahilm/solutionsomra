

import S1Process from "../../../../schema/s1JsonData";
import dbConnect from "../../../../utils/DBconnect";
const db=dbConnect()

export default async function handler(req,res){
    const {method}=req
    await dbConnect()
    switch(method){
        case 'GET':
            const {query} = req.query;
            try{
                const process= await S1Process.find({
                    $or: [{ SID: { $regex: query, $options: "i" } }],
                  },).limit(10)
                res.status(200).json({sucess:true,data:process})

            }
            catch(error){
                res.status(400).json({sucess:false})

            }
            break;

        case 'POST':
            try{
                const process=await S1Process.create(req.body)
                res.status(201).json({sucess:true,data:process})
            }catch(error){
                res.status(400).json({sucess:false})

            }
            break;

        
        default:
            res.status(400).json({sucess:false})
        }
    
}