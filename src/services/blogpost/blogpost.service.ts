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
import { blogPost } from 'src/models/blogPost.schema';
import { BlogpostDto } from 'src/dto/blogpost/blogpost.dto';
import { CommonMethods } from 'src/utilities/common.method';
const base64ToImage = require('base64-to-image');
@Injectable()
export class blogpostService {
  constructor(
    @InjectModel('Blogpost')
    private blogpostModel: Model<blogPost>,
  ) {}

  /*
    Service function to create blogpost 
  **/
  async createBlogpost(res: Response, blogpostDto: BlogpostDto) {
    const base64Str = blogpostDto.image;
    const path = './uploads/blogpost/';
    const optionalObj = {
      fileName: '',
      type: base64Str.split(';')[0].split('/')[1],
    };
    const imageInfo = base64ToImage(base64Str, path, optionalObj);

    const filePath = `http://${process.env.HOST}:${process.env.PORT}/blogpost/uploads/blogpost/${imageInfo.fileName}`;
    const newBlogpost = new this.blogpostModel(blogpostDto).$set({
      image: filePath,
    });
    if (newBlogpost) {
      await newBlogpost.save();
      return CommonMethods.success(res, 'Blogpost Created', 200, newBlogpost);
    } else {
      return CommonMethods.error(res, 400, 'Already Exists');
    }
  }
  /*
    Service function to update a blogpost
  **/
  async updateBlogpost(res: Response, id: string, blogpostDto: BlogpostDto) {
    const base64Str = blogpostDto.image;
    const path = './uploads/features/';
    const optionalObj = {
      fileName: '',
      type: base64Str.split(';')[0].split('/')[1],
    };
    const imageInfo = base64ToImage(base64Str, path, optionalObj);
    const {
      title,
      slug,
      details,
      status,
      thumb,
      hit,
      isHome,
      isFeatured,
      categoryId,
    } = blogpostDto;
    const filePath = `http://${process.env.HOST}:${process.env.PORT}/features/uploads/features/${imageInfo.fileName}`;
    const newBlog = await this.blogpostModel.findByIdAndUpdate(
      id,
      {
        image: filePath,
        title,
        slug,
        details,
        status,
        thumb,
        hit,
        isHome,
        isFeatured,
        categoryId,
      },
      { new: true },
    );
    if (newBlog) {
      return CommonMethods.success(
        res,
        'Blog Updated Successfully',
        200,
        newBlog,
      );
    } else {
      return CommonMethods.error(res, 400, 'Already Exists');
    }
  }
  /*
    Service function to GetAll blogpost
  **/
  async getallBlogpost(res: Response): Promise<blogPost> {
    const getallBlogpost = await this.blogpostModel
      .find()
      .sort({ created_at: -1 })
      .exec();
    if (getallBlogpost) {
      return CommonMethods.success(
        res,
        'Blogpost List Fetched Successfully',
        200,
        getallBlogpost,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Blogpost Exists');
    }
  }
  /*
    Service function to Get a blogpost by Id
  **/
  async getBlogpostById(res: Response, blogId: string): Promise<blogPost> {
    const user = await this.blogpostModel.findById(blogId).exec();
    if (user) {
      return CommonMethods.success(res, 'Get Blogpost Success', 200, user);
    } else {
      return CommonMethods.error(res, 400, 'Blog does not Exists');
    }
  }
  /*
    Service function to Delete a blogpost
  **/
  async deleteBlogpost(res: Response, blogId: string): Promise<any> {
    const deleteBlogpost = await this.blogpostModel.findByIdAndDelete(blogId);
    if (deleteBlogpost) {
      return CommonMethods.success(
        res,
        'Blogpost Deleted Successfully',
        200,
        [],
      );
    } else {
      return CommonMethods.error(res, 400, 'No Blogpost Present');
    }
  }
}
