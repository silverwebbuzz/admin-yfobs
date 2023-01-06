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
import { PackageFeatures } from 'src/models/packageFeatures.schema';
import { PackageFeaturesDto } from 'src/dto/packageFeatures/packageFeatures.dto';
import { CommonMethods } from 'src/utilities/common.method';

@Injectable()
export class packageFeaturesService {
  constructor(
    @InjectModel('PackageFeatures')
    private packageFeaturesModel: Model<PackageFeatures>,
  ) {}

  /*
    Service function to create packageFeatures
  **/
  async createPackageFeatures(
    res: Response,
    packageFeaturesDto: PackageFeaturesDto,
  ): Promise<PackageFeatures> {
    const newUser = await new this.packageFeaturesModel(packageFeaturesDto);
    if (newUser) {
      await newUser.save();
      return CommonMethods.success(res, 'Package Created', 200, newUser);
    } else {
      return CommonMethods.error(res, 400, 'Already Exists');
    }
  }
  /*
    Service function to getall packageFeatures
  **/
  async getAllPackageFeatures(res: Response): Promise<PackageFeatures> {
    const getAllCategory = await this.packageFeaturesModel
      .find()
      .sort({ created_at: -1 })
      .exec();
    if (getAllCategory) {
      return CommonMethods.success(
        res,
        'Package List Fetched Successfully',
        200,
        getAllCategory,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Package Exists');
    }
  }
  /*
    Service function to package a packageFeatures
  **/
  async getPackageFeaturesById(
    res: Response,
    PackageId: string,
  ): Promise<PackageFeatures> {
    const user = await this.packageFeaturesModel.findById(PackageId).exec();
    if (user) {
      return CommonMethods.success(res, 'Success', 200, user);
    } else {
      return CommonMethods.error(res, 400, 'Package PDoes Not Exists');
    }
  }
  /*
    Service function to update a packageFeatures
  **/
  async updatePackageFeatures(
    res: Response,
    PackageId: string,
    packageFeaturesDto: PackageFeaturesDto,
  ): Promise<PackageFeatures> {
    const editCategory = await this.packageFeaturesModel.findByIdAndUpdate(
      PackageId,
      packageFeaturesDto,
      { new: true },
    );
    if (editCategory) {
      return CommonMethods.success(
        res,
        'Package Edited Successfully',
        200,
        editCategory,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Package Present');
    }
  }
  /*
    Service function to delete a packageFeatures
  **/
  async deletePackageFeatures(
    res: Response,
    PackageId: string,
  ): Promise<PackageFeatures> {
    const deleteCategory = await this.packageFeaturesModel.findByIdAndDelete(
      PackageId,
    );
    if (deleteCategory) {
      return CommonMethods.success(
        res,
        'Package Deleted Successfully',
        200,
        [],
      );
    } else {
      return CommonMethods.error(res, 400, 'No Package Present');
    }
  }
}
