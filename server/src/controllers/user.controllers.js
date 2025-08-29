import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();

    const refreshToken = user.generateRefreshToken();

    //typo user.refreshtoken->user.refreshToken
    //it was not saving the refreshToken of user
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullname, password } = req.body;

  if (username === "") {
    throw new ApiError(400, "username is empty");
  }
  if (email === "") {
    throw new ApiError(400, "username is empty");
  }
  if (fullname === "") {
    throw new ApiError(400, "username is empty");
  }
  if (password === "") {
    throw new ApiError(400, "username is empty");
  }

  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  // console.log(existUser)

  if (existUser) {
    throw new ApiError(404, "User already exist jnjn");
  }

  const user = await User.create({
    username: username,
    email,
    fullname,
    password,
  });

  const usercreate = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!usercreate) {
    throw new ApiError(500, "Something went wrong while registring the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, user, "User created successfully"));
});

const loginwithOauth = asyncHandler(async (req, res) => {

  const { userId, email, name, profilePhoto } = req.body;

  if (!userId) {
    throw new ApiError(400, "User Id is not available")
  }

  const user = await User.findOne({ email }).select("-password -refreshToken")

  if (!user) {

    console.log("User not exist")

    const user = await User.create({
      username: name,
      fullname: name,
      email,
      profilePhoto,
      provider: 'google'
    })

  }


  console.log("User already exist")
  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    user._id
  );


  const LoggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOnly: true,
    secure: true, // false for local dev
    sameSite: "none", // lax works better locally
    path: "/",
  };


  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        200,
        { LoggedInUser, accessToken, refreshToken },
        "User login successfull"
      )
    );

})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email === "") throw new ApiError(401, "Email cannot be empty");

  if (password === "") throw new ApiError(401, "Password cannot be empty");

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User not available");
  }

  const passwordcheck = await user.isPasswordCorrect(password);

  if (!passwordcheck) {
    throw new ApiError(400, "Password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    user._id
  );

  const LoggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOnly: true,
    secure: true, // false for local dev
    sameSite: "none", // lax works better locally
    path: "/",
  };


  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        200,
        { LoggedInUser, accessToken, refreshToken },
        "User login successfull"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "Unauthorized access");
  }

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: "" },
    },
    { new: true }
  );

  const option = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  };


  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  //console.log("in refreshaccesstoken");
  //replace refreshToken -> refreshToken
  const incomingAccessToken = req.cookies.refreshtoken || req.body.refreshtoken;
  //console.log("after incoming");
  //console.log("Cookies:", req.cookies.refreshtoken);
  //console.log("Body:", req.body);

  if (!incomingAccessToken) {
    throw new ApiError(400, "incomingAccessToken is not there");
  }

  try {
    const decodedToken = jwt.verify(
      incomingAccessToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    console.log(decodedToken);

    const user = await User.findById(decodedToken?._id);

    //console.log(user)

    if (!user) {
      throw new ApiError(400, "Invalid refresh token, user not available");
    }

    //console.log( user.refreshToken )

    if (incomingAccessToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or user");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accesstoken, newrefreshtoken } =
      await generateAccessandRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accesstoken)
      .cookie("refreshToken", newrefreshtoken)
      .json(
        new ApiResponse(
          200,
          { accesstoken, newrefreshtoken },
          "AccessToken refresed"
        )
      );
  } catch (err) {
    throw new ApiError(401, "Invalid refresh token");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldpassword, newpassword, confpassword } = req.body;

  if (newpassword === "")
    throw new ApiError(400, "New Password cannot be empty");
  if (oldpassword === "")
    throw new ApiError(400, "Old Password cannot be empty");
  if (confpassword === "")
    throw new ApiError(400, "confirm Password cannot be empty");

  if (newpassword !== confpassword) {
    throw new ApiError(
      400,
      "New password and confirm password are not matching"
    );
  }

  const user = await User.findById(req?.user._id);

  const ispasswordCorrect = await user.isPasswordCorrect(oldpassword);

  if (!ispasswordCorrect) throw new ApiError(400, "Password is incorrect");

  user.password = newpassword;

  user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successful"));
});

const updateUserDetail = asyncHandler(async (req, res) => {
  const { newusername, newemail, newfullname } = req.body;


  const user = await User.findByIdAndUpdate(req.body._id, {
    $set: {
      username: newusername,
      email: newemail,
      fullname: newfullname,
    },
  }).select("-password -refreshToken");

  return res.status(200).json(new ApiResponse(200, user, "Account Updated"));
});

const currentUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(400, "No User is logged in");
  }

  return res.status(200).json({
    statusCode: 200,
    data: req.user,
    message: "Current user fetched successfully",
  });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  updateUserDetail,
  currentUser,
  loginwithOauth
};
