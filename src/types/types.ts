import { ObjectId, Types } from "mongoose";
interface IUser {
  userName: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  image: string;
  business?: string[];
}

interface IBusiness {
  idUser: string[];
  companyOrOrganization: string;
  webUrl: string;
  address: string;
  city: string;
  country: string;
  timeZone: string;
  career: string;
  interests: string[];
  subscribers: boolean;
  toolSub?: {
    news: string;
    numberSub: string;
    collectSub: string[];
  };
  tool: {
    emailMarketing: boolean;
    platformEmailMarketing?: string;
    digitalProduct: boolean;
    platformDigitalProduct?: string;
    webBuilder: boolean;
    platformWebBuilder?: string;
  };
  plan: string;
}
interface IVideo {
  urlVideo: string;
  idCustomer: string | undefined;
  idBusiness: string | undefined;
  upload: Date;
}

interface ICustomer {
  email: string;
  userName: string;
  idBusiness: string | undefined;
  subscribed: Date;
}

interface IMember {
  email: string;
  userName: string;
  password: string;
  idBusiness: string[];
  createAccount: Date;
  avatar: string;
  numberPhone?: string;
  tiktok?: string;
  facebook?: string;
}
interface IProduct {
  nameProduct: string;
  images: string[];
  IdBusiness: string | undefined;
  price: number;
  // status: boolean;
  createDate: Date;
}
export { IUser, IBusiness, IVideo, ICustomer, IProduct, IMember };
