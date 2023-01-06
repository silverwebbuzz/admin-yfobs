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
import { tax } from 'src/models/tax.schema';
import { taxDto } from 'src/dto/tax/tax.dto';
import { CommonMethods } from 'src/utilities/common.method';

@Injectable()
export class taxService {
  constructor(@InjectModel('tax') private taxModel: Model<tax>) {}

  /*
    Service function to create a Tax
  **/
  async createTax(res: Response, taxDto: taxDto): Promise<tax> {
    const newTax = await new this.taxModel(taxDto);
    if (newTax) {
      await newTax.save();
      return CommonMethods.success(res, 'Tax Created', 200, newTax);
    } else {
      return CommonMethods.error(res, 400, ' Tax Not Created');
    }
  }

  /*
    Service function to get all Tax
  **/
  async getAllTax(res: Response): Promise<tax> {
    const getAllTax = await this.taxModel
      .find()
      .sort({ created_at: -1 })
      .exec();
    if (getAllTax) {
      return CommonMethods.success(
        res,
        'Tax List Fetched Successfully',
        200,
        getAllTax,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Tax exists');
    }
  }
  /*
    Service function to get a singleTax
  **/
  async getTaxById(res: Response, taxId: string): Promise<tax> {
    const tax = await this.taxModel.findById(taxId).exec();
    if (tax) {
      return CommonMethods.success(res, 'Success', 200, tax);
    } else {
      return CommonMethods.error(res, 400, 'Tax Does Not Exists');
    }
  }
  /*
    Service function to Updated a Tax
  **/
  async updateTax(res: Response, taxId: string, taxDto: taxDto): Promise<tax> {
    const editTax = await this.taxModel.findByIdAndUpdate(taxId, taxDto, {
      new: true,
    });
    if (editTax) {
      return CommonMethods.success(
        res,
        'Tax Edited Successfully',
        200,
        editTax,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Tax present');
    }
  }
  /*
    Service function to deleted Tax
  **/
  async deleteTax(res: Response, taxId: string): Promise<any> {
    const deleteTax = await this.taxModel.findByIdAndDelete(taxId);
    if (deleteTax) {
      return CommonMethods.success(res, 'Tax Deleted Successfully', 200, []);
    } else {
      return CommonMethods.error(res, 400, 'No Tax Present');
    }
  }
}
