import mongoose from "mongoose";

const S1ProcessSchema = mongoose.Schema(
  {
    // name is agentId
    name: { type: String },
    //agentId is name here
    agentId: { type: String },
    process_id: { type: Array, required: false },
    process_name: { type: Array, required: false },
    date: { type: Array, required: false },
    brand_name: { type: String, required: false },
    s_id: { type: String, required: false ,unique: true},

    SID1: { type: String, required: false },
    Contractor_Name: { type: String, required: false },
    priority: { type: String, required: false },
    Lot_type: { type: String, required: false },

    doc_id: { type: String, required: false },
    company_name: { type: String, required: false },
    product_url: { type: String, required: false },
    found_on_jd: { type: String, required: false },
    jd_productLink: { type: String, required: false },
    found_on_brandSite: { type: String, required: false },
    brandSite_productLink: { type: String, required: false },
    standard_product_name: { type: String, required: false },
    remark: { type: String, required: false },
    today_total_submission: { type: Number, required: false },
    till_date_submission: { type: Number, required: false },

    type: { type: String, required: false },
    timestamp: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

S1ProcessSchema.index({
  createdAt: 1,
});
const S1Process =
  mongoose?.models?.s1process || mongoose.model("s1process", S1ProcessSchema);
export default S1Process;
