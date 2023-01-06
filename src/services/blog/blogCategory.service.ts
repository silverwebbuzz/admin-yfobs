import { Body, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogCategory } from 'src/models/blogCategory.schema';
import { BlogCategoryDto } from 'src/dto/blog/blogCategory.dto';
import { CommonMethods } from 'src/utilities/common.method';

@Injectable()
export class blogCategoryService {
  constructor(
    @InjectModel('blogCategory')
    private blogCategoryModel: Model<BlogCategory>,
  ) {}

  //genral setting Api
  async createBlogCategory(
    @Res() res,
    @Body() blogCategoryDto: BlogCategoryDto,
  ): Promise<BlogCategory> {
    const newUser = await new this.blogCategoryModel(blogCategoryDto);
    if (newUser) {
      await newUser.save();
      return CommonMethods.success(
        res,
        'Blog Updated Successfully',
        200,
        newUser,
      );
    } else {
      return CommonMethods.error(res, 400, 'Already Exists');
    }
  }

  async getAllBlogCategory(res: Response): Promise<BlogCategory> {
    const getAllCategory = await this.blogCategoryModel
      .find()
      .sort({ created_at: -1 })
      .exec();
    if (getAllCategory) {
      return CommonMethods.success(
        res,
        'Blog Updated Successfully',
        200,
        getAllCategory,
      );
    } else {
      return CommonMethods.error(res, 400, 'Already Exists');
    }
  }
  // Get a single user
  async getBlogCategoryById(
    res: Response,
    BlogCategoryId: string,
  ): Promise<BlogCategory> {
    const user = await this.blogCategoryModel.findById(BlogCategoryId).exec();
    if (user) {
      return CommonMethods.success(res, 'Blog Updated Successfully', 200, user);
    } else {
      return CommonMethods.error(res, 400, 'Already Exists');
    }
  }

  async updateBlogCategory(
    res: Response,
    BlogCategoryId: string,
    blogCategoryDto: BlogCategoryDto,
  ): Promise<BlogCategory> {
    const editCategory = await this.blogCategoryModel.findByIdAndUpdate(
      BlogCategoryId,
      blogCategoryDto,
      { new: true },
    );
    if (editCategory) {
      return CommonMethods.success(
        res,
        'Blog Updated Successfully',
        200,
        editCategory,
      );
    } else {
      return CommonMethods.error(res, 400, 'Already Exists');
    }
  }

  async deleteBlogCategory(
    res: Response,
    BlogCategoryId: string,
  ): Promise<BlogCategory> {
    const deleteCategory = await this.blogCategoryModel.findByIdAndDelete(
      BlogCategoryId,
    );
    if (deleteCategory) {
      return CommonMethods.success(res, 'Blog Deleted Successfully', 200, []);
    } else {
      return CommonMethods.error(res, 400, 'Blog Id not Exists');
    }
  }
}
