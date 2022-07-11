import Customer from "../models/customer.model";
import Business from "../models/business.model";
import Video from "../models/video.model";
import Product from "../models/product.model";
import nodemailer from "nodemailer";

import { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";
import catchAsync from "../helpers/catchAsync";
import AppError from "../helpers/appError";

class BusinessContrller {
  checkCustomerExitBusiness = catchAsync(
    async (req: any, res: Response, next: NextFunction) => {
      const customers = await Customer.findOne({
        email: req.body.email,
        business: {
          $elemMatch: {
            id: new mongoose.Types.ObjectId(req.params.idBusiness),
          },
        },
      });
      if (customers === null) {
        next();
      } else {
        return res.status(200).send({
          status: "Failed",
          data: "Customer Exited",
        });
      }
    }
  );

  getCustomerByBusiness = catchAsync(
    async (req: any, res: Response, next: NextFunction) => {
      const customers = await Customer.find({
        idBusiness: new mongoose.Types.ObjectId(req.params.idBusiness),
      });
      return res.status(200).send({
        status: "Success",
        data: customers,
      });
    }
  );
  sendEmailInviteMarking = catchAsync(
    async (req: any, res: Response, next: NextFunction) => {
      const business = await Business.find({
        _id: new mongoose.Types.ObjectId(req.params.idBusiness),
      });
      const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: "khoitr180@gmail.com",
          pass: process.env.PASSWORD_EMAIL,
        },
      });
      const mailData = {
        from: "khoitr180@gmail.com", // sender address
        to: req.params.email, // list of receivers
        subject: "Invite to marketing",
        text: "That was easy!",
        html: `<b>Chào bạn mình đến từ doanh nghiệp ${business[0].companyOrOrganization}</b>
                 <br>Doanh nghiệp bên mình muốn mời bạn làm về video marketing<br/>
                <br>Nếu bạn muốn tham gia hay ấn vào link: <a href="http://localhost:3000/record-video/${req.params.idCustomer}/${req.params.idBusiness}">http://localhost:3000/record-video/${req.params.idCustomer}/${req.params.idBusiness}</a></br> `,
      };
      transporter.sendMail(mailData, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
      });
    }
  );
  //   createCustomer = catchAsync(
  //     async (req: any, res: Response, next: NextFunction) => {
  //       const customer = await Customer.find({
  //         email: req.body.email,
  //       });
  //       if (customer.length === 0) {
  //         const customerObj = {
  //           email: req.body.email,
  //           business: [
  //             {
  //               status: false,
  //               id: req.params.idBusiness,
  //             },
  //           ],
  //           status: false,
  //         };
  //         console.log(customerObj);
  //         await Customer.create(customerObj);
  //         return res.status(200).send({
  //           status: "Success",
  //           data: "Add Customer Success",
  //         });
  //       } else {
  //         await Customer.updateOne(
  //           { email: req.body.email },
  //           {
  //             $addToSet: {
  //               business: { status: false, id: req.params.idBusiness },
  //             },
  //           }
  //         );
  //         return res.status(200).send({
  //           status: "Success",
  //           data: "Add Customer Success",
  //         });
  //       }
  //     }
  //   );
  submitVideo = catchAsync(
    async (req: any, res: Response, next: NextFunction) => {
      console.log(req.body);
      const video = await Video.findOne({
        idProduct: new mongoose.Types.ObjectId(req.body.customerObj.idProduct),
        idCustomer: new mongoose.Types.ObjectId(
          req.body.customerObj.idCustomer
        ),
        idBusiness: new mongoose.Types.ObjectId(
          req.body.customerObj.idBusiness
        ),
      });
      if (video === null) {
        const newVideo = {
          urlVideo: req.body.customerObj.url,
          idProduct: req.body.customerObj.idProduct,
          idCustomer: req.body.customerObj.idCustomer,
          idBusiness: req.body.customerObj.idBusiness,
        };
        await Video.create(newVideo);
        return res.status(200).send({
          status: "Success",
          data: "Successfully Upload Video",
        });
      } else {
        return res.status(200).send({
          status: "Failed",
          data: "Video exits",
        });
      }
    }
  );
  getVideoByIdBusiness = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    const videos = await Video.find();
    const customers = await Customer.find({
      idBusiness: new mongoose.Types.ObjectId(req.params.idBusiness),
    });
    return res.status(200).send({
      status: "Success",
      data: {
        videos,
        customers,
      },
    });
  };
  getProductByBusiness = catchAsync(
    async (req: any, res: Response, next: NextFunction) => {
      const products = await Product.find({
        idBusiness: new mongoose.Types.ObjectId(req.params.idBusiness),
      });
      return res.status(200).send({
        status: "Success",
        data: products,
      });
    }
  );
}

export = new BusinessContrller();
