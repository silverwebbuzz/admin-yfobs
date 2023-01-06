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
import { Help } from 'src/models/help.schema';
import { HelpDto } from 'src/dto/help/help.dto';
import { CommonMethods } from 'src/utilities/common.method';
import { searchDto } from 'src/dto/search/search.dto';

@Injectable()
export class helpService {
  constructor(
    @InjectModel('Help')
    private helpModel: Model<Help>,
  ) {}

  /*
    Service function to create a help
  **/
  async createHelp(res: Response, helpDto: HelpDto): Promise<Help> {
    const newUser = await new this.helpModel(helpDto);
    if (newUser) {
      await newUser.save();
      return CommonMethods.success(
        res,
        'Help Created Successfully',
        200,
        newUser,
      );
    } else {
      return CommonMethods.error(res, 400, 'Already Exists');
    }
  }
  /*
    Service function to getall help
  **/
  async getAllHelp(res: Response, searchDto: searchDto, body): Promise<Help> {
    const keyword = searchDto.keyword;
    const getAllHelp = await this.helpModel.find();
    if (body.keyword) {
      const searchHelp = await this.helpModel.find({
        $or: [
          { title: { $regex: keyword } },
          { details: { $regex: keyword } },
          { category: { $regex: keyword } },
        ],
      });
      if (searchHelp.length > 0) {
        return CommonMethods.success(
          res,
          'Help Fetched Successfully',
          200,
          searchHelp,
        );
      }
      return CommonMethods.error(res, 'Data Not Found', 300);
    } else {
      return CommonMethods.success(
        res,
        'help fetched successfully',
        200,
        getAllHelp,
      );
    }
  }
  /*
    Service function to get a single help
  **/
  async getHelpById(res: Response, HelpId: string): Promise<Help> {
    const user = await this.helpModel.findById(HelpId).exec();
    if (user) {
      return CommonMethods.success(res, 'Success', 200, user);
    } else {
      return CommonMethods.error(res, 400, ' Help does not exists');
    }
  }
  /*
    Service function to update a help
  **/
  async updateHelp(
    res: Response,
    HelpId: string,
    helpDto: HelpDto,
  ): Promise<Help> {
    const editCategory = await this.helpModel.findByIdAndUpdate(
      HelpId,
      helpDto,
      { new: true },
    );
    if (editCategory) {
      return CommonMethods.success(
        res,
        'Help Edited Successfully',
        200,
        editCategory,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Help Present');
    }
  }
  /*
    Service function to delete a help
  **/
  async deleteHelp(res: Response, HelpId: string): Promise<Help> {
    const deleteHelp = await this.helpModel.findByIdAndDelete(HelpId);
    if (deleteHelp) {
      return CommonMethods.success(res, 'Help Deleted Successfully', 200, []);
    } else {
      return CommonMethods.error(res, 400, 'No Help Present');
    }
  }
}
