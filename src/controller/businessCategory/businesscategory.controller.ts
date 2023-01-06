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
import { businessCategoryService } from 'src/services/businessCategory/businessCategory.Service';
import { BusinessCategoryDto } from 'src/dto/businessCategory/businessCategory.dto';
import { searchDto } from 'src/dto/search/search.dto';
@Controller('businessCategory')
export class businessCategoryController {
  constructor(private businessCategoryService: businessCategoryService) {}
  //createBusinessCategory Controller
  @Post('/createBusinessCategory')
  async createBusinessCategory(
    @Res() res,
    @Body() businessCategoryDto: BusinessCategoryDto,
  ) {
    await this.businessCategoryService.createBusinessCategory(
      res,
      businessCategoryDto,
    );
  }
  //  getAllCategory Controller
  @Post('/getAllCategory')
  async getAllCategory(@Res() res, @Body() searchDto: searchDto, @Body() body) {
    await this.businessCategoryService.getAllBusinessCategory(
      res,
      searchDto,
      body,
    );
  }
  //getCategorybyid Controller
  @Get('/getCategory/:categoryId')
  async getCategoryById(@Res() res, @Param('categoryId') categoryId) {
    await this.businessCategoryService.getCategoryById(res, categoryId);
  }
  //updateCategory Controller
  @Put('/updateCategory/:categoryId')
  async updateCategory(
    @Res() res,
    @Param('categoryId') categoryId,
    @Body() businessCategoryDto: BusinessCategoryDto,
  ) {
    await this.businessCategoryService.updateCategory(
      res,
      categoryId,
      businessCategoryDto,
    );
  }
  //deleteCategory Controller
  @Delete('/deleteCategory/:categoryId')
  async deleteCategory(@Res() res, @Param('categoryId') categoryId) {
    await this.businessCategoryService.deleteCategory(res, categoryId);
  }
}
