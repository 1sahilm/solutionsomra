
import Process from "../../../schema/Process";
import dbConnect from "../../../utils/DBconnect";
const db=dbConnect()

export default async function handler(req,res){
    const {method}=req
    await dbConnect()
    switch(method){
        case 'GET':
            try{
                const process=await Process.find({})
                res.status(200).json({sucess:true,data:process})

            }
            catch(error){
                res.status(400).json({sucess:false})

            }
            break;

        case 'POST':
            try{
                const process=await Process.create(req.body)
                res.status(201).json({sucess:true,data:process})
            }catch(error){
                res.status(400).json({sucess:false})

            }
            break;

        
        default:
            res.status(400).json({sucess:false})
        }
    
}

