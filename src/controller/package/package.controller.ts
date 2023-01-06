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

import { packageService } from 'src/services/packageService/package.service';

import { packageDto } from 'src/dto/packageDto/package.dto';
@Controller('package')
export class packageController {
  constructor(private packageService: packageService) {}
  //createPackage Controller
  @Post('/createPackage')
  async createPackage(@Res() res, @Body() packageDto: packageDto) {
    await this.packageService.createPackage(res, packageDto);
  }
  //getAllPackage Controller
  @Get('/getAllPackage')
  async getAllCategory(@Res() res) {
    await this.packageService.getAllPackage(res);
  }
  //getCategoryById Controller
  @Get('/getCategory/:packageId')
  async getCategoryById(@Res() res, @Param('packageId') packageId) {
    await this.packageService.getPackageById(res, packageId);
  }
  //updatePackageById Controller
  @Put('/updatePackage/:packageId')
  async updateCategory(
    @Res() res,
    @Param('packageId') packageId,
    @Body() packageDto: packageDto,
  ) {
    await this.packageService.updatePackage(res, packageId, packageDto);
  }
  //deletePackage Controller
  @Delete('/deletePackage/:packageId')
  async deleteCategory(@Res() res, @Param('packageId') packageId) {
    await this.packageService.deletePackage(res, packageId);
  }
}
