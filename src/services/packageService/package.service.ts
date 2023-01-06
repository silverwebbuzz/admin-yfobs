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
import { Package } from 'src/models/package.schema';
import { packageDto } from 'src/dto/packageDto/package.dto';
import { CommonMethods } from 'src/utilities/common.method';

@Injectable()
export class packageService {
  constructor(
    @InjectModel('Package')
    private packageModel: Model<Package>,
  ) {}

  /*
    Service function to create a package
  **/

  async createPackage(res: Response, packageDto: packageDto): Promise<Package> {
    const { name } = packageDto;
    const user = await this.packageModel.findOne({ name });
    const newPackage = await new this.packageModel(packageDto);
    if (!user) {
      await newPackage.save();
      return CommonMethods.success(res, 'Package Created', 200, newPackage);
    } else {
      return CommonMethods.error(res, 400, 'Package Not Created');
    }
  }
  /*
    Service function to getall package
  **/

  async getAllPackage(res: Response): Promise<Package> {
    const getAllCategory = await this.packageModel
      .find()
      .sort({ created_at: -1 })
      .exec();
    if (getAllCategory) {
      ``;
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
    Service function to get a single package
  **/

  async getPackageById(res: Response, packageId): Promise<Package> {
    const singlepackage = await this.packageModel.findById(packageId).exec();
    if (singlepackage) {
      return CommonMethods.success(res, 'Success', 200, singlepackage);
    } else {
      return CommonMethods.error(res, 400, 'Package Does Not Exists');
    }
  }
  /*
    Service function to update a package
  **/

  async updatePackage(
    res: Response,
    packageId,
    packageDto: packageDto,
  ): Promise<Package> {
    const editPackage = await this.packageModel.findByIdAndUpdate(
      packageId,
      packageDto,
      { new: true },
    );
    if (editPackage) {
      return CommonMethods.success(
        res,
        'Package Edited Successfully',
        200,
        editPackage,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Package Present');
    }
  }
  /*
    Service function to delete a package
  **/

  async deletePackage(res: Response, packageId): Promise<any> {
    const deletePackage = await this.packageModel.findByIdAndDelete(packageId);
    if (deletePackage) {
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
