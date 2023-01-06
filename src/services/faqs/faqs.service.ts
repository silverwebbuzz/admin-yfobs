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
import { Faqs } from 'src/models/faqs.schema';
import { FaqsDto } from 'src/dto/faqs/faqs.dto';
import { CommonMethods } from 'src/utilities/common.method';

@Injectable()
export class faqsService {
  constructor(
    @InjectModel('Faqs')
    private faqsModel: Model<Faqs>,
  ) {}

  /*
    Service function to create a faqs
  **/
  async createFaqs(res: Response, faqsDto: FaqsDto): Promise<Faqs> {
    const newUser = new this.faqsModel(faqsDto);
    if (newUser) {
      await newUser.save();
      return CommonMethods.success(res, 'Faqs Created', 200, newUser);
    } else {
      return CommonMethods.error(res, 400, 'Already Exists');
    }
  }

  /*
    Service function to getall a faqs
  **/
  async getAllFaqs(res: Response): Promise<Faqs> {
    const getAllCategory = await this.faqsModel
      .find()
      .sort({ created_at: -1 })
      .exec();
    if (getAllCategory) {
      return CommonMethods.success(
        res,
        'Faqs List Fetched Successfully',
        200,
        getAllCategory,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Faqs exists');
    }
  }
  /*
    Service function to get a single faq
  **/
  async getFaqsById(res: Response, FaqsId: string): Promise<Faqs> {
    const user = await this.faqsModel.findById(FaqsId).exec();
    if (user) {
      return CommonMethods.success(res, 'Success', 200, user);
    } else {
      return CommonMethods.error(res, 400, 'Faqs Does Not Exists');
    }
  }

  /*
    Service function to update faqs
  **/
  async updateFaqs(
    res: Response,
    FaqsId: string,
    faqsDto: FaqsDto,
  ): Promise<Faqs> {
    const editCategory = await this.faqsModel.findByIdAndUpdate(
      FaqsId,
      faqsDto,
      { new: true },
    );
    if (editCategory) {
      return CommonMethods.success(
        res,
        'Faqs Edited Successfully',
        200,
        editCategory,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Faqs present');
    }
  }
  /*
    Service function to delete faqs
  **/
  async deleteFaqs(res: Response, FaqsId: string): Promise<Faqs> {
    const deleteFaqs = await this.faqsModel.findByIdAndDelete(FaqsId);
    if (deleteFaqs) {
      return CommonMethods.success(res, 'Faqs Deleted successfully', 200, []);
    } else {
      return CommonMethods.error(res, 400, 'No Faqs present');
    }
  }
}
