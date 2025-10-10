import Company from "../models/company.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Job from "../models/jobs.models.js";

const createJob = asyncHandler(async (req, res) => {
  const {
    name,
    title,
    description,
    Type,
    place,
    salary,
    employmentType,
    experienceLevel,
  } = req.body;

  if (name === "") {
    throw new ApiError(400, "name is empty");
  }
  if (title === "") {
    throw new ApiError(400, "title is empty");
  }
  if (description === "") {
    throw new ApiError(400, "description is empty");
  }
  if (Type === "") {
    throw new ApiError(400, "Type is empty");
  }
  if (place === "") {
    throw new ApiError(400, "place is empty");
  }
  if (salary === "") {
    throw new ApiError(400, "salary is empty");
  }

  const id = req.company._id

  const owner = await Company.findById(id).select(
    "-password -refreshToken"
  );

  if (!owner) {
    throw new ApiError(400, "Owner not found");
  }

  const existsamejob = await Job.findOne({
    name: name,
    title: title,
    owner: req.company._id,
  });

  if (existsamejob) {
    throw new ApiError(400, "Job already created by you");
  }

  const createJob = await Job.create({
    name:req.company?.name,
    title,
    description,
    Type,
    place,
    salary,
    owner: owner._id,
    employmentType,
    experienceLevel,
  });

  if (!createJob) {
    throw new ApiError(400, "Error while creating job");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createJob, "Job created success fully"));
});

const getallJob = asyncHandler(async (req, res) => {
  const jobs = await Job.find()

  return res.status(200)
    .json(
      new ApiResponse(
        200,
        jobs,
        "All the jobs fetched"
      )
    )
})

const getAppliedJob = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId?.trim();

  const job = await Job.findById(jobId)

  if (!job) {
    throw new ApiError(400, "Job is not available")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, job, "job fetched success fully")
    )



})

const getCompanyJobs = asyncHandler(async (req, res) => {
  const companyId = req.company?._id

  const jobs = await Job.find({ owner: companyId })
    .populate("owner", "name email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
});


export {
  createJob,
  getallJob,
  getAppliedJob,
  getCompanyJobs
};
