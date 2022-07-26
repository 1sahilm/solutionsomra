import S1Process from "../../../../../schema/S1-process";
import timestamp from "time-stamp";

import dbConnect from "../../../../../utils/DBconnect";
import fs from "fs";
import path from "path";
const json2xls = require("json2xls");
const db = dbConnect();

export default (async function handler(req, res) {
  const { method, query } = req;
  const { type } = query;
  await dbConnect();

  let days = 1;

  if (type == "daily") {
    days = 1;
  }
   else if (type == "weekly") {
    days = 6;
  } else if (type == "monthly") {
    days = 30;
  } else if (type == "yesterday") {
    days = 2;
  } else {
    days = 1;
  }

  let today = new Date(); 
  today.setHours(0,0,0,0);


  switch (method) {
    case "GET":
      try {
        const products = await S1Process.find(
          //days * 60 * 60 * 24 * 1000
          {
            createdAt: {
               $gte: days==1 ? today :new Date(new Date() - days * 60 * 60 *24 * 1000),
            },
            // date: {
            //   $gte: new Date(new Date().getDate() - days),
            // },
            //  date: {
            //   $gte: new Date().toISOString().slice(0,10)
            // },
           
          },
          {
            _id: 1,
            
            name: 1,
            agentId: 1,
            brand_name: 1,
            s_id: 1,
            SID1: 1,
            Contractor_Name: 1,
            priority: 1,
            Lot_type: 1,
            doc_id: 1,
            company_name: 1,
            product_url: 1,
            found_on_jd: 1,
            found_on_brandSite: 1,
            jd_productLink: 1,
            brandSite_productLink: 1,
            standard_product_name: 1,
            remark: 1,
            today_total_submission: 1,
            till_date_submission: 1,
            createdAt: 1,
          }
        ).lean();

       
        if(products.length> 0 ){
        const excel = json2xls(products, {
          fields: [
            "_id",
            "name",
            "agentId",
            
            "brand_name",
            "s_id",
            "SID1",
            "Contractor_Name",
            "priority",
            "Lot_type",
            "doc_id",
            "company_name",
            "product_url",
            "found_on_jd",
            "found_on_brandSite",
            "jd_productLink",
            "brandSite_productLink",
            "standard_product_name",
            "remark",
            "today_total_submission",
            "till_date_submission",
            "createdAt",
          ],
        });

       
        await fs.writeFileSync("./public/manifest.xlsx", excel, "binary");
        const filePath = path.join(process.cwd(), "/public/manifest.xlsx");
        const manifestBuffer = fs.createReadStream(filePath);

        await new Promise(function (resolve) {
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=manifest.xlsx"
          );
          res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
          res.setHeader("Content-Length", `${manifestBuffer.size}`);
          manifestBuffer.pipe(res);
          manifestBuffer.on("end", resolve);
          manifestBuffer.on("error", function (err) {
            if (err.code === "ENOENT") {
              res.status(400).json({
                error: "error",
                error: "Sorry we could not find the file you requested!",
              });
              res.end();
            } else {
              res.status(500).json({
                error: "error",
                message: "Sorry, something went wrong!",
              });
              res.end();
            }
          });
        });

      }else{
        res.json({ message: "no docs found" });

      }
        

      } catch (error) {
        
        res.status(400).json({ success: false, error: error?.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
});
