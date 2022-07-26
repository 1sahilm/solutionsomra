import Message from '../../../../schema/AddMessage';
// import dbConnect from "../../../utils/dbConnect";
import dbConnect from '../../../../utils/DBconnect';

const db=dbConnect()

export default async function handler(req,res){
    const {method}=req
    await dbConnect()
    switch(method){
        case 'GET':
            try{
                const message=await Message.find({})
                res.status(200).json({sucess:true,data:message})

            }
            catch(error){
                res.status(400).json({sucess:false})

            }
            break;

        case 'POST':
            try{
                const message=await Message.create(req.body)
                res.status(201).json({sucess:true,data:message})
            }catch(error){
                res.status(400).json({sucess:false})

            }
            break;

        
        default:
            res.status(400).json({sucess:false})
        }
    
}

