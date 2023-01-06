import {
  Body,
  Controller,
  Post,
  Res,
  Param,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { packageFeaturesService } from 'src/services/packageFeatures/packageFeatures.service';
import { PackageFeaturesDto } from 'src/dto/packageFeatures/packageFeatures.dto';
@Controller('PackageFeatures')
export class PackageFeaturesController {
  constructor(private packageFeaturesService: packageFeaturesService) {}
  //createPackageFeatures Controller
  @Post('/createPackageFeatures')
  async createPackageFeatures(
    @Res() res,
    @Body() packageFeaturesDto: PackageFeaturesDto,
  ) {
    await this.packageFeaturesService.createPackageFeatures(
      res,
      packageFeaturesDto,
    );
  }
  //getAllPackageFeatures Controller
  @Get('/getAllPackageFeatures')
  async getAllPackageFeatures(@Res() res) {
    await this.packageFeaturesService.getAllPackageFeatures(res);
  }
  //getPackageFeaturesById Controller
  @Get('/getPackageFeatures/:PackageId')
  async getPackageFeaturesById(@Res() res, @Param('PackageId') PackageId) {
    await this.packageFeaturesService.getPackageFeaturesById(res, PackageId);
  }
  //updatePackageFeaturesById Controller
  @Put('/updatePackageFeatures/:PackageId')
  async updatePackageFeatures(
    @Res() res,
    @Param('PackageId') PackageId,
    @Body() packageFeaturesDto: PackageFeaturesDto,
  ) {
    await this.packageFeaturesService.updatePackageFeatures(
      res,
      PackageId,
      packageFeaturesDto,
    );
  }
  //deletePackageFeatures Controller
  @Delete('/deletePackageFeatures/:PackageId')
  async deletePackageFeatures(@Res() res, @Param('PackageId') PackageId) {
    await this.packageFeaturesService.deletePackageFeatures(res, PackageId);
  }
}
