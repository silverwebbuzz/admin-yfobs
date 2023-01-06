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
import { BusinessCategory } from 'src/models/businessCategory.schema';
import { BusinessCategoryDto } from 'src/dto/businessCategory/businessCategory.dto';
import { searchDto } from 'src/dto/search/search.dto';
import { CommonMethods } from 'src/utilities/common.method';

@Injectable()
export class businessCategoryService {
  constructor(
    @InjectModel('BusinessCategory')
    private businessCategoryModel: Model<BusinessCategory>,
  ) {}

  /*
    Service function to create a category
  **/
  async createBusinessCategory(
    res: Response,
    businessCategoryDto: BusinessCategoryDto,
  ): Promise<BusinessCategory> {
    const { name } = businessCategoryDto;
    const user = await this.businessCategoryModel.findOne({ name });
    const newUser = await new this.businessCategoryModel(businessCategoryDto);
    if (!user) {
      await newUser.save();
      return CommonMethods.success(
        res,
        'Business-Category Created Successfully',
        200,
        newUser,
      );
    } else {
      return CommonMethods.error(res, 400, 'Already Exists');
    }
  }

  /*
    Service function to getall category
  **/
  async getAllBusinessCategory(
    res: Response,
    searchDto: searchDto,
    body,
  ): Promise<BusinessCategory> {
    const keyword = searchDto.keyword;
    const getAllCategory = await this.businessCategoryModel.find();
    if (body.keyword) {
      const getAllCategory = await this.businessCategoryModel.find({
        $or: [{ name: { $regex: keyword } }],
      });
      if (getAllCategory.length > 0) {
        return CommonMethods.success(
          res,
          'BusinessCategory List Fetched Successfully',
          200,
          getAllCategory,
        );
      }
      return CommonMethods.error(res, 'Data Not Found', 300);
    } else {
      return CommonMethods.success(
        res,
        'BusinessCategory List fetched successfully',
        200,
        getAllCategory,
      );
    }
  }

  /*
    Service function to get a single category
  **/
  async getCategoryById(
    res: Response,
    categoryId: string,
  ): Promise<BusinessCategory> {
    const user = await this.businessCategoryModel.findById(categoryId).exec();
    if (user) {
      return CommonMethods.success(res, 'Success', 200, user);
    } else {
      return CommonMethods.error(res, 400, 'Category Does Not Exists');
    }
  }

  /*
    Service function to update a category
  **/
  async updateCategory(
    res: Response,
    categoryId: string,
    businessCategoryDto: BusinessCategoryDto,
  ): Promise<BusinessCategory> {
    const editCategory = await this.businessCategoryModel.findByIdAndUpdate(
      categoryId,
      businessCategoryDto,
      { new: true },
    );
    if (editCategory) {
      return CommonMethods.success(
        res,
        'Category Edited Successfully',
        200,
        editCategory,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Category present');
    }
  }

  /*
    Service function to delete a category
  **/
  async deleteCategory(res: Response, categoryId: string): Promise<any> {
    const deleteCategory = await this.businessCategoryModel.findByIdAndDelete(
      categoryId,
    );
    if (deleteCategory) {
      return CommonMethods.success(
        res,
        'Category Deleted successfully',
        200,
        [],
      );
    } else {
      return CommonMethods.error(res, 400, 'No Category present');
    }
  }
}
