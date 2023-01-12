import {
  Body,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { payment } from 'src/models/payment.schema';
import { paymentDto } from 'src/dto/paymentPlan/payment.dto';
import { CommonMethods } from 'src/utilities/common.method';
import { searchDto } from 'src/dto/search/search.dto';

@Injectable()
export class paymentService {
  constructor(@InjectModel('Payment') private paymentModel: Model<payment>) {}
  /*
      Service function to create a Payment
    **/
  async createPayment(res: Response, paymentDto: paymentDto): Promise<payment> {
    const val = Math.floor(100000 + Math.random() * 900000);
    const newPages = await new this.paymentModel(paymentDto);
    if (newPages) {
      await newPages.$set({ paymentUniqId: val }).save();
      return CommonMethods.success(
        res,
        'Payment Add Successfully',
        200,
        newPages,
      );
    } else {
      return CommonMethods.error(res, 400, ' Payment Not Add');
    }
  }
  /*
      Service function to get all pages
    **/
  async getAllPayment(res: Response): Promise<payment> {
    const getAllPayment = await this.paymentModel.find();
    if (getAllPayment) {
      return CommonMethods.success(
        res,
        'Payment Fetched Successfully',
        200,
        getAllPayment,
      );
    } else {
      return CommonMethods.error(res, 400, 'Payment Does Not Exists');
    }
  }
  // /*
  //   Service function to create a single pages
  // **/
  // async getPagesById(res: Response, pageId: string): Promise<pages> {
  //   const page = await this.pagesModel.findById(pageId).exec();
  //   if (page) {
  //     return CommonMethods.success(res, 'Success', 200, page);
  //   } else {
  //     return CommonMethods.error(res, 400, 'Pages Does Not Exists');
  //   }
  // }
  // /*
  //   Service function to update a pages
  // **/
  // async updatePage(
  //   res: Response,
  //   pageId: string,
  //   PagesDto: PagesDto,
  // ): Promise<pages> {
  //   const editPages = await this.pagesModel.findByIdAndUpdate(
  //     pageId,
  //     PagesDto,
  //     { new: true },
  //   );
  //   if (editPages) {
  //     return CommonMethods.success(
  //       res,
  //       'Pages Edited Successfully',
  //       200,
  //       editPages,
  //     );
  //   } else {
  //     return CommonMethods.error(res, 400, 'No Pages Present');
  //   }
  // }
  // /*
  //   Service function to delete a pages
  // **/
  // async deletePage(res: Response, pageId: string): Promise<any> {
  //   const deletePages = await this.pagesModel.findByIdAndDelete(pageId);
  //   if (deletePages) {
  //     return CommonMethods.success(res, 'Pages Deleted Successfully', 200, []);
  //   } else {
  //     return CommonMethods.error(res, 400, 'No Pages Present');
  //   }
  // }
}
