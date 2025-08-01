import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Job name is required"]
    },
    title: {
      type: String,
      required: [true, "Job title is required"]
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    Type: {
      type: String,
      required: true,
      enum: ["Remote", "Onsite", "Hybrid"]
    },
    employmentType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Contract", "Internship"]
    },
    experienceLevel: {
      type: String,
      enum: ["Internship", "Entry", "Mid", "Senior"],
      default: "Entry"
    },
    place: {
      type: String,
      required: true
    },
    salary: {
      type: Number,
      required: true
    },
    skills: {
      type: [String],
      default: []
    },
    deadline: {
      type: Date,
    //   required: true
    },
    isOpen: {
      type: Boolean,
      default: true
    },
    applyLink: {
      type: String
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    companySnapshot: {
      name: String,
      logo: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
