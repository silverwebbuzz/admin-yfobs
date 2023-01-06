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
import { featuresService } from 'src/services/features/features.service';
import { featuresDto } from 'src/dto/features/features.dto';
import { searchDto } from 'src/dto/search/search.dto';
@Controller('features')
export class featuresController {
  constructor(private featuresService: featuresService) {}
  //createFeatures Controller
  @Post('/createFeatures')
  async createFeatures(@Res() res, @Body() featuresDto: featuresDto) {
    await this.featuresService.createFeatures(res, featuresDto);
  }

  @Post('uploadImage/:id')
  async uploadImage(@Res() res, @Body() body, @Param('id') id) {
    await this.featuresService.uploadFeaturesImage(res, body, id);
  }
  //getAllFeatures Controller
  @Post('/getAllFeatures')
  async getAllFeatures(@Res() res, @Body() searchDto: searchDto, @Body() body) {
    await this.featuresService.getAllFeatures(res, searchDto, body);
  }

  //getFeaturesByid Controller
  @Get('/getFeatures/:FeaturesId')
  async getFeatures(@Res() res, @Param('FeaturesId') FeaturesId) {
    await this.featuresService.getFeaturesById(res, FeaturesId);
  }
  //get image features
  @Get('/uploads/features/:filename')
  getProfileImage(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: 'uploads/features' });
  }
  //updateFeaturesByid Controller
  @Put('/updateFeatures/:id')
  async updateFeatures(
    @Res() res,
    @Param('id') id,
    @Body() featuresDto: featuresDto,
  ) {
    await this.featuresService.updateFeatures(res, id, featuresDto);
  }
  //deleteFeaturesById Controller
  @Delete('/deleteFeatures/:FeaturesId')
  async deleteFeatures(@Res() res, @Param('FeaturesId') FeaturesId) {
    await this.featuresService.deleteFeatures(res, FeaturesId);
  }
}
