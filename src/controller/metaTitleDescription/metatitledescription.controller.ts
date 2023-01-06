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
import { metaTitleDescriptionService } from 'src/services/metaTitleDescription/metaTitleDescription.service';
import { MetaTitleDescriptionDto } from 'src/dto/metaTitleDescription/metaTitleDescription.dto';
import { searchDto } from 'src/dto/search/search.dto';
@Controller('MetaTitleDescription')
export class metaTitleDescriptionController {
  constructor(
    private metaTitleDescriptionService: metaTitleDescriptionService,
  ) {}
  //createMetaTitleDescription Controller
  @Post('/createMetaTitleDescription')
  async createPackageFeatures(
    @Res() res,
    @Body() metaTitleDescriptionDto: MetaTitleDescriptionDto,
  ) {
    await this.metaTitleDescriptionService.createMetaTitleDescription(
      res,
      metaTitleDescriptionDto,
    );
  }
  //getAllMetaTitleDescription Controller
  @Post('/getAllMetaTitleDescription')
  async getAllPackageFeatures(
    @Res() res,
    @Body() searchDto: searchDto,
    @Body() body,
  ) {
    await this.metaTitleDescriptionService.getAllMetaTitleDescription(
      res,
      searchDto,
      body,
    );
  }
  //getMetaTitleDescriptionById Controller
  @Get('/getMetaTitleDescription/:MetaId')
  async getPackageFeaturesById(@Res() res, @Param('MetaId') MetaId) {
    await this.metaTitleDescriptionService.getMetaTitleDescriptionById(
      res,
      MetaId,
    );
  }
  //updateMetaTitleDescriptionById Controller
  @Put('/updateMetaTitleDescription/:MetaId')
  async updatePackageFeatures(
    @Res() res,
    @Param('MetaId') MetaId,
    @Body() metaTitleDescriptionDto: MetaTitleDescriptionDto,
  ) {
    await this.metaTitleDescriptionService.updateMetaTitleDescription(
      res,
      MetaId,
      metaTitleDescriptionDto,
    );
  }
  //deleteMetaTitleDescription Controller
  @Delete('/deleteMetaTitleDescription/:MetaId')
  async deletePackageFeatures(@Res() res, @Param('MetaId') MetaId) {
    await this.metaTitleDescriptionService.deleteMetaTitleDescription(
      res,
      MetaId,
    );
  }
}
