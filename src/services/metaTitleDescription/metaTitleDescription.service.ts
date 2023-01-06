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
import { MetaTitleDescription } from 'src/models/metaTitleDescription.schema';
import { MetaTitleDescriptionDto } from 'src/dto/metaTitleDescription/metaTitleDescription.dto';
import { CommonMethods } from 'src/utilities/common.method';
import { searchDto } from 'src/dto/search/search.dto';
@Injectable()
export class metaTitleDescriptionService {
  constructor(
    @InjectModel('MetaTitleDescription')
    private metaTitleDescriptionModel: Model<MetaTitleDescription>,
  ) {}

  /*
    Service function to create a metatitledescription
  **/
  async createMetaTitleDescription(
    res: Response,
    metaTitleDescriptionDto: MetaTitleDescriptionDto,
  ): Promise<MetaTitleDescription> {
    const newUser = new this.metaTitleDescriptionModel(metaTitleDescriptionDto);
    if (newUser) {
      await newUser.save();
      return CommonMethods.success(
        res,
        'Meta Title Description Created',
        200,
        newUser,
      );
    } else {
      return CommonMethods.error(res, 400, 'Already Exists');
    }
  }
  /*
    Service function to getall  metatitledescription
  **/
  async getAllMetaTitleDescription(
    res: Response,
    searchDto: searchDto,
    body,
  ): Promise<MetaTitleDescription> {
    const keyword = searchDto.keyword;
    const getAllCategory = await this.metaTitleDescriptionModel.find();
    if (body.keyword) {
      const searchCategory = await this.metaTitleDescriptionModel.find({
        $or: [
          { pageName: { $regex: keyword } },
          { metaTitle: { $regex: keyword } },
          { metaDescription: { $regex: keyword } },
        ],
      });
      if (searchCategory.length > 0) {
        return CommonMethods.success(
          res,
          'Meta Title Description List fetched successfully',
          200,
          searchCategory,
        );
      }
      return CommonMethods.error(res, 'data not found', 300);
    } else {
      return CommonMethods.success(
        res,
        'Meta Title Description List fetched successfully',
        200,
        getAllCategory,
      );
    }
  }

  /*
    Service function to get a metatitledescription by id
  **/
  async getMetaTitleDescriptionById(
    res: Response,
    MetaId: string,
  ): Promise<MetaTitleDescription> {
    const user = await this.metaTitleDescriptionModel.findById(MetaId).exec();
    if (user) {
      return CommonMethods.success(res, 'Success', 200, user);
    } else {
      return CommonMethods.error(
        res,
        400,
        ' Meta Title Description does not exists',
      );
    }
  }
  /*
    Service function to update a metatitledescription
  **/
  async updateMetaTitleDescription(
    res: Response,
    MetaId: string,
    metaTitleDescriptionDto: MetaTitleDescriptionDto,
  ): Promise<MetaTitleDescription> {
    const editCategory = await this.metaTitleDescriptionModel.findByIdAndUpdate(
      MetaId,
      metaTitleDescriptionDto,
      { new: true },
    );
    if (editCategory) {
      return CommonMethods.success(
        res,
        'Meta Title Description edited successfully',
        200,
        editCategory,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Meta Title Description present');
    }
  }
  /*
    Service function to delete a metatitledescription
  **/

  async deleteMetaTitleDescription(
    res: Response,
    MetaId: string,
  ): Promise<MetaTitleDescription> {
    const deleteCategory =
      await this.metaTitleDescriptionModel.findByIdAndDelete(MetaId);
    if (deleteCategory) {
      return CommonMethods.success(
        res,
        'Meta Title Description Deleted successfully',
        200,
        [],
      );
    } else {
      return CommonMethods.error(res, 400, 'No Meta Title Description present');
    }
  }
}
