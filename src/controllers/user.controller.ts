import { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";
import catchAsync from "../helpers/catchAsync";
import AppError from "../helpers/appError";
import jwt from "jsonwebtoken";

import User from "../models/user.model";
import Business from "../models/business.model";

class UserController {
  private signToken = (id: Types.ObjectId) => {
    if (process.env.JWT_SECRET_KEY) {
      return jwt.sign({ id: id }, process.env.JWT_SECRET_KEY);
    }
  };

  checkLogin = catchAsync(
    async (req: any, res: Response, next: NextFunction) => {
      if (
        !req.headers.authorization &&
        !req.headers.authorization?.startsWith("Bearer")
      ) {
        return next(new AppError("You must be logged in", 403));
      }
      const token = req.headers.authorization?.split("Bearer")[1].trim();
      if (process.env.JWT_SECRET_KEY && token) {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET_KEY
        ) as jwt.JwtPayload;
        const user = await User.findOne({ _id: decoded.id });
        req.user = user;
        next();
      }
    }
  );

  signUp = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, password, email } = req.body;
      const userObj = {
        userName: username,
        password: password,
        email: email,
      };
      const newUser = await User.create(userObj);
      const signToken = this.signToken(newUser._id);
      const userReturn: any = newUser;
      delete userReturn.password;
      return res.status(200).json({
        status: "Success",
        data: {
          token: signToken,
          user: newUser,
        },
      });
    }
  );
  signIn = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new AppError("Please enter a email or password", 404));
      }
      let user = await User.findOne({ email: email }).select("password"); // add password to compare hash password
      if (!user || !(await user.isCorrectPassword(password))) {
        return next(new AppError("Invalid Email or Incorrect Password", 404));
      }
      user = await User.findOne({ email: email }).select("-password");
      const signToken = this.signToken(user?._id);
      return res.status(200).json({
        status: "Success",
        data: {
          token: signToken,
          user,
        },
      });
    }
  );

  getBusinessById = catchAsync(
    async (req: any, res: Response, next: NextFunction) => {
      if (req.user) {
        const business = await Business.find({
          _id: new mongoose.Types.ObjectId(req.params.idBusiness),
        });
        return res.status(200).json({
          status: "Success",
          data: business,
        });
      }
      return res.status(404).json({
        status: "Failed",
      });
    }
  );
}

export = new UserController();
