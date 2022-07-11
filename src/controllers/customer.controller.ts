import { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";

import catchAsync from "../helpers/catchAsync";
import AppError from "../helpers/appError";
import nodemailer from "nodemailer";

import User from "../models/user.model";
import Video from "../models/video.model";
import Business from "../models/business.model";
import Product from "../models/product.model";
import Customer from "../models/customer.model";

class CustomerController {
  //Midellware
  checkCustomerExitBusiness = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const customer = await Customer.findOne({
        email: req.body.customer.email,
        idBusiness: new mongoose.Types.ObjectId(req.body.idBusiness),
      });
      if (customer === null) {
        next();
      } else {
        return res.status(200).send({
          status: "Failed",
        });
      }
    }
  );
  //GET
  getCustomerById = catchAsync(
    async (req: any, res: Response, next: NextFunction) => {
      const customer = await Customer.findOne({
        _id: new mongoose.Types.ObjectId(req.params.idCustomer),
      });
      return res.status(200).send({
        status: "Success",
        data: customer,
      });
    }
  );
  getCustomerByIdBusiness = catchAsync(
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
  sendEmailRequestVideo = catchAsync(
    async (req: any, res: Response, next: NextFunction) => {
      const business = await Business.find({
        _id: new mongoose.Types.ObjectId(req.params.idBusiness),
      });
      const customer = await Customer.find({
        _id: new mongoose.Types.ObjectId(req.params.idCustomer),
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
        to: customer[0].email, // list of receivers
        subject: "Invite to marketing",
        text: "That was easy!",
        html: `<b>Chào bạn ${customer[0].userName} mình đến từ doanh nghiệp ${business[0].companyOrOrganization}</b>
                 <br>Doanh nghiệp bên mình muốn mời bạn làm về video marketing<br/>
                <br>Nếu bạn muốn tham gia hay ấn vào link: <a href="http://localhost:3000/record-video/${req.params.idCustomer}/${req.params.idBusiness}">http://localhost:3000/record-video/${req.params.idCustomer}/${req.params.idBusiness}</a></br> `,
      };
      transporter.sendMail(mailData, function (err, info) {
        if (err) {
          return res.status(200).send({
            status: "Failed",
          });
        } else {
          return res.status(200).send({
            status: "Success",
          });
        }
      });
    }
  );
  //POST
  createCustomerToBusiness = catchAsync(
    async (req: any, res: Response, next: NextFunction) => {
      const newCustomer = {
        email: req.body.customer.email,
        userName: req.body.customer.yourName,
        idBusiness: req.body.idBusiness,
      };
      await Customer.create(newCustomer);
      return res.status(200).send({
        status: "Success",
      });
    }
  );
}

export = new CustomerController();
