import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Company from "../models/company.models.js";

const generateAccessandRefreshToken = async (userId) => {
  try {
    const company = await Company.findById(userId);

    const accessToken = company.generateAccessToken();

    const refreshToken = company.generateRefreshToken();

    company.refreshToken = refreshToken;
    await company.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerCompany = asyncHandler(async (req,res) => {
  const { name, email, phone, password } = req.body;

  if (name === "") {
    throw new ApiError(400, "name is empty");
  }
  if (email === "") {
    throw new ApiError(400, "username is empty");
  }
  if (phone === "") {
    throw new ApiError(400, "phone is empty");
  }
  if (password === "") {
    throw new ApiError(400, "username is empty");
  }

  const existcompany = await Company.findOne({
    $or: [{ name }, { email }],
  });

  if (existcompany) {
    throw new ApiError(400, "Company already exist");
  }

  const company = await Company.create({
    name,
    email,
    phone,
    password,
  });

  const createdCompany = await Company.findById(company?._id).select(
    "-password"
  );

  if (!createdCompany) {
    throw new ApiError(400, "Error while creating company in database");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdCompany, "Companay created successfully")
    );
});

const loginCompany = asyncHandler(async (req,res) => {
  const { email, password } = req.body;

  if (email === "") throw new ApiError(400, "Email is empty");
  if (password === "") throw new ApiError(400, "password is empty");

  const company = await Company.findOne({email});

  if (!company) {
    throw new ApiError(400, "Company is not registered");
  }

  const passwordcheck = await company.isPasswordCorrect(password)

  if (!passwordcheck) {
    throw new ApiError(400, "Password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    company._id
  );

  const loggedInCompany = await Company.findById(company?._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(200, loggedInCompany, "Company logged in successfully")
    );
});

const logoutCompany = asyncHandler(async(req,res)=>{

    if(!req.company || !req.company._id){
        throw new ApiError(400,"Unauthorized access")
    }

    const company = await Company.findByIdAndUpdate(
        req.company._id,
        {
            $unset:{refreshToken: ""}
        },
        { new: true }
    )

    if(!company){
      throw new ApiError(400,"Not able to find company")
    }

    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    };

    return res.status(200)
    .clearCookie("accessToken",option)
    .clearCookie("refreshToken",option)
    .json(new ApiResponse(200,{},"Company logged out"))

})

const currentCompany = asyncHandler(async (req,res) => {
  if (!req.company) {
    throw new ApiError(400, "No Company is logged in");
  }
  return res.status(200).json({
    statusCode: 200,
    data: req.user,
    message: "Current Company fetched successfully",
  });
});

export { 
    registerCompany,
    loginCompany,
    logoutCompany,
    currentCompany
};