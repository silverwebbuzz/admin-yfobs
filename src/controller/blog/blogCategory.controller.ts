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
import { blogCategoryService } from 'src/services/blog/blogCategory.service';
import { BlogCategoryDto } from 'src/dto/blog/blogCategory.dto';
@Controller('blogCategory')
export class blogCategoryController {
  constructor(private blogCategoryService: blogCategoryService) {}

  @Post('/createBlogCategory')
  async createBlogCategory(
    @Res() res,
    @Body() blogCategoryDto: BlogCategoryDto,
  ) {
    await this.blogCategoryService.createBlogCategory(res, blogCategoryDto);
  }

  @Get('/getAllBlogCategory')
  async getAllBlogCategory(@Res() res) {
    await this.blogCategoryService.getAllBlogCategory(res);
  }

  @Get('/getBlogCategory/:BlogCategoryId')
  async getBlogCategoryById(
    @Res() res,
    @Param('BlogCategoryId') BlogCategoryId,
  ) {
    await this.blogCategoryService.getBlogCategoryById(res, BlogCategoryId);
  }

  @Put('/updateBlogCategory/:BlogCategoryId')
  async updateBlogCategory(
    @Res() res,
    @Param('BlogCategoryId') BlogCategoryID,
    @Body() blogCategoryDto: BlogCategoryDto,
  ) {
    await this.blogCategoryService.updateBlogCategory(
      res,
      BlogCategoryID,
      blogCategoryDto,
    );
  }

  @Delete('/deleteBlogCategory/:BlogCategoryId')
  async deleteBlogCategory(
    @Res() res,
    @Param('BlogCategoryId') BlogCategoryId,
  ) {
    await this.blogCategoryService.deleteBlogCategory(res, BlogCategoryId);
  }
}
