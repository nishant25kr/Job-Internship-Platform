import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicantDetail: {
      type: mongoose.Schema.Types.Mixed, 
      default: null,
      required: true,
    },
    companyDetail:{
      type: mongoose.Schema.Types.Mixed, 
      default: null,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
