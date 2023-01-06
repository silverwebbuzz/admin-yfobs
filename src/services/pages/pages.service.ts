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
import { pages } from 'src/models/pages.schema';
import { PagesDto } from 'src/dto/pages/pages.dto';
import { CommonMethods } from 'src/utilities/common.method';
import { searchDto } from 'src/dto/search/search.dto';

@Injectable()
export class pagesService {
  constructor(@InjectModel('pages') private pagesModel: Model<pages>) {}
  /*
    Service function to create a pages
  **/
  async createPages(res: Response, PagesDto: PagesDto): Promise<pages> {
    const newPages = await new this.pagesModel(PagesDto);
    if (newPages) {
      await newPages.save();
      return CommonMethods.success(res, 'Page Created', 200, newPages);
    } else {
      return CommonMethods.error(res, 400, ' Page Not Created');
    }
  }
  /*
    Service function to get all pages
  **/
  async getAllPages(res: Response, searchDto: searchDto, body): Promise<pages> {
    const keyword = searchDto.keyword;
    const getAllPage = await this.pagesModel.find();
    if (body.keyword) {
      const searchPage = await this.pagesModel.find({
        $or: [{ title: { $regex: keyword } }, { details: { $regex: keyword } }],
      });
      if (searchPage.length > 0) {
        return CommonMethods.success(
          res,
          'PagesList Fetched Successfully',
          200,
          searchPage,
        );
      }
      return CommonMethods.error(res, 'Data Not Found', 300);
    } else {
      return CommonMethods.success(
        res,
        'Pages Fetched Successfully',
        200,
        getAllPage,
      );
    }
  }
  /*
    Service function to create a single pages
  **/
  async getPagesById(res: Response, pageId: string): Promise<pages> {
    const page = await this.pagesModel.findById(pageId).exec();
    if (page) {
      return CommonMethods.success(res, 'Success', 200, page);
    } else {
      return CommonMethods.error(res, 400, 'Pages Does Not Exists');
    }
  }
  /*
    Service function to update a pages
  **/
  async updatePage(
    res: Response,
    pageId: string,
    PagesDto: PagesDto,
  ): Promise<pages> {
    const editPages = await this.pagesModel.findByIdAndUpdate(
      pageId,
      PagesDto,
      { new: true },
    );
    if (editPages) {
      return CommonMethods.success(
        res,
        'Pages Edited Successfully',
        200,
        editPages,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Pages Present');
    }
  }
  /*
    Service function to delete a pages
  **/
  async deletePage(res: Response, pageId: string): Promise<any> {
    const deletePages = await this.pagesModel.findByIdAndDelete(pageId);
    if (deletePages) {
      return CommonMethods.success(res, 'Pages Deleted Successfully', 200, []);
    } else {
      return CommonMethods.error(res, 400, 'No Pages Present');
    }
  }
}
