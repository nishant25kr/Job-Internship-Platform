import Application from "../models/application.models.js";
import jobsModels from "../models/jobs.models.js";
import User from "../models/User.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createApplication = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    const jobId = req.params.jobId?.trim();

    const jobToApply = await jobsModels.findById(jobId);

    if (!jobToApply) {
        throw new ApiError(400, "Invalid Job Id");
    }

    if (!jobId) {
        throw new ApiError(400, "No job ID provided");
    }

    const existApplication = await Application.findOne({
        jobId: jobId,
        applicationId: user._id,
    });

    if (existApplication) {
        throw new ApiError(400, "You have already applied for this job");
    }

    const application = await Application.create({
        jobId: jobId,
        applicationId: user._id,
    });

    if (!application) {
        throw new ApiError(400, "Error while creating application");
    }

    const createdApplication = await Application.findById(application._id);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                createdApplication,
                "Application created successfully"
            )
        );
});

const deleteApplication = asyncHandler(async (req, res) => {
    const applicationId = req.params.applicationId?.trim();

    if (!applicationId) {
        throw new ApiError(400, "Invalid application ID");
    }

    const application = await Application.findById(applicationId);

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    await application.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Application deleted successfully"));
});

export { 
    createApplication, 
    deleteApplication 
};
