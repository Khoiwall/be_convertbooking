import { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";
import catchAsync from "../helpers/catchAsync";
import AppError from "../helpers/appError";

import User from "../models/user.model";
import Video from "../models/video.model";
import Business from "../models/business.model";
import Product from "../models/product.model";
import Customer from "../models/customer.model";

class VideoController {
  //GET
  getVideoById = catchAsync(
    async (req: any, res: Response, next: NextFunction) => {
      const video = await Video.findOne({
        _id: new mongoose.Types.ObjectId(req.params.idVideo),
      });
      const product = await Product.findOne({
        idProduct: new mongoose.Types.ObjectId(req.params.idProduct),
      });
      return res.status(200).send({
        status: "Success",
        data: { video, product },
      });
    }
  );
  getVideoByIdBusiness = catchAsync(
    async (req: any, res: Response, next: NextFunction) => {
      const videos = await Video.find({
        idBusiness: new mongoose.Types.ObjectId(req.params.idBusiness),
      });
      return res.status(200).send({
        status: "Success",
        data: videos,
      });
    }
  );
  //POST
  submitVideo = catchAsync(
    async (req: any, res: Response, next: NextFunction) => {
      const newVideo = {
        urlVideo: req.body.videoObj.url,
        idCustomer: req.body.videoObj.idCustomer,
        idBusiness: req.body.videoObj.idBusiness,
      };
      await Video.create(newVideo);
      return res.status(200).send({
        status: "Success",
      });
    }
  );
}

export = new VideoController();
