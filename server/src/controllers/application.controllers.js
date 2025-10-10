import Application from "../models/application.models.js";
import companyModels from "../models/company.models.js";
import jobsModels from "../models/jobs.models.js";
import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createApplication = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);

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

    const company = await companyModels.findById(jobToApply.owner).select("name")

    const userDetail = await User.findById(user)
    console.log("User Details", userDetail)
    const existApplication = await Application.findOne({
        jobId: jobId,
        applicantId: user._id,
    });

    if (existApplication) {
        return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {},
                    "You have already applied for this job"
                )
            );
    }

    const application = await Application.create({
        jobId: jobId,
        applicantId: user._id,
        companyDetail: {
            name: company.name,
            Type: jobToApply.Type,
            employmentType: jobToApply.employmentType,
            experienceLevel: jobToApply.experienceLevel,
            place: jobToApply.place,
            salary: jobToApply.salary,
        },
        applicantDetail: {
            email: userDetail.email,
            fullname: userDetail.fullname,
            resumeUrl: ""
        }
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

const getApplication = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "User is not logged in"); // 401 is more correct than 404
    }

    const applications = await Application.find({ applicantId: req.user._id });

    console.log(applications)

    if (!applications || applications.length === 0) {
        throw new ApiError(404, "No applications found");
    }

    return res.status(200).json(
        new ApiResponse(200, applications, "Applications fetched successfully")
    );
});

const getAllApplicants = asyncHandler(async (req, res) => {
    const { jobid } = req.params

    if (!jobid) {
        throw new ApiError(400, "Invalid job ID");
    }

    const applications = await Application.find({ jobId: jobid })

    if (!applications) {
        throw new ApiError(400, "Error while creating application")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, applications, "Applications fetched successfully")
        )

})

export {
    createApplication,
    deleteApplication,
    getApplication,
    getAllApplicants
};
