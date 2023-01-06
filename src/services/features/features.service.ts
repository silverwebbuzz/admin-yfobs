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
import { features } from 'src/models/features.schema';
import { featuresDto } from 'src/dto/features/features.dto';
import { searchDto } from 'src/dto/search/search.dto';
import { CommonMethods } from 'src/utilities/common.method';
const base64ToImage = require('base64-to-image');
@Injectable()
export class featuresService {
  constructor(
    @InjectModel('features')
    private featuresModel: Model<features>,
  ) {}

  /*
    Service function to create a features
  **/
  async createFeatures(res: Response, featuresDto: featuresDto) {
    const base64Str = featuresDto.image;
    const path = './uploads/features/';
    const optionalObj = {
      fileName: '',
      type: base64Str.split(';')[0].split('/')[1],
    };
    const imageInfo = base64ToImage(base64Str, path, optionalObj);

    const filePath = `http://${process.env.HOST}:${process.env.PORT}/features/uploads/features/${imageInfo.fileName}`;
    const newFeatures = new this.featuresModel(featuresDto).$set({
      image: filePath,
    });
    if (newFeatures) {
      await newFeatures.save();
      return CommonMethods.success(res, 'Features Created', 200, newFeatures);
    } else {
      return CommonMethods.error(res, 400, 'Already Exists');
    }
  }
  /*
    Service function to update a features
  **/
  async updateFeatures(res: Response, id: string, featuresDto: featuresDto) {
    const base64Str = featuresDto.image;
    const path = './uploads/features/';
    const optionalObj = {
      fileName: '',
      type: base64Str.split(';')[0].split('/')[1],
    };
    const imageInfo = base64ToImage(base64Str, path, optionalObj);
    const { name, order, details, homeFeatures } = featuresDto;

    const filePath = `http://${process.env.HOST}:${process.env.PORT}/features/uploads/features/${imageInfo.fileName}`;

    const newFeatures = await this.featuresModel.findByIdAndUpdate(
      id,
      {
        image: filePath,
        name,
        order,
        details,
        homeFeatures,
      },
      { new: true },
    );
    if (newFeatures) {
      return CommonMethods.success(res, 'Features updated', 200, newFeatures);
    } else {
      return CommonMethods.error(res, 400, 'Already Exists');
    }
  }
  /*
    Service function to getall a features with search functionality 
  **/
  async getAllFeatures(
    res: Response,
    searchDto: searchDto,
    body,
  ): Promise<features> {
    const keyword = searchDto.keyword;
    const getAllFeatures = await this.featuresModel.find();
    if (body.keyword) {
      const getAllFeatures = await this.featuresModel.find({
        $or: [
          { name: { $regex: keyword } },
          { order: { $regex: keyword } },
          { details: { $regex: keyword } },
          { homeFeatures: { $regex: keyword } },
        ],
      });
      if (getAllFeatures.length > 0) {
        return CommonMethods.success(
          res,
          'Features List fetched successfully',
          200,
          getAllFeatures,
        );
      }
      return CommonMethods.error(res, 'Data Not Found', 300);
    } else {
      return CommonMethods.success(
        res,
        'Features List fetched successfully',
        200,
        getAllFeatures,
      );
    }
  }
  /*
    Service function to get a single features
  **/
  async getFeaturesById(res: Response, FeaturesId: string): Promise<features> {
    const user = await this.featuresModel.findById(FeaturesId).exec();
    if (user) {
      return CommonMethods.success(res, 'Success', 200, user);
    } else {
      return CommonMethods.error(res, 400, 'features does not exists');
    }
  }
  /*
    Service function to delete a features
  **/
  async deleteFeatures(res: Response, FeaturesId: string): Promise<any> {
    const deleteFeatures = await this.featuresModel.findByIdAndDelete(
      FeaturesId,
    );
    if (deleteFeatures) {
      return CommonMethods.success(
        res,
        'Features Deleted successfully',
        200,
        [],
      );
    } else {
      return CommonMethods.error(res, 400, 'No Features present');
    }
  }
}
