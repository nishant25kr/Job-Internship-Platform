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

  const owner = await Company.findById(req.user._id).select(
    "-password -refreshToken"
  );

  if (!owner) {
    throw new ApiError(400, "Owner not found");
  }

  const existsamejob = await Job.findOne({
    name:name,
    title: title,
    owner: req.user._id,
  });

  if (existsamejob) {
    throw new ApiError(400, "Job already created by you");
  }

  const createJob = await Job.create({
    name,
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

const getallJob = asyncHandler(async(req,res)=>{
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

export {
    createJob,
    getallJob,
};
