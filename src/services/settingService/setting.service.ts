import {
  Body,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting } from 'src/models/adminsetting.schema';
import { GeneralSettingDto } from 'src/dto/adminsetting/generalSetting.dto';

import { socialSettingDto } from 'src/dto/adminsetting/socialSetting.dto';
import { MailsettingDto } from 'src/dto/adminsetting/mailSetting.dto';
import { PreferencesDto } from 'src/dto/adminsetting/preferences.dto';
import { TermsandserviceDto } from 'src/dto/adminsetting/termsandService.dto';
import { CommonMethods } from 'src/utilities/common.method';
import { Response } from 'express';
const base64ToImage = require('base64-to-image');
@Injectable()
export class settingService {
  constructor(@InjectModel('Setting') private settingModel: Model<Setting>) {}

  /*
    Service function to upload logo 
  **/

  public async uploadLogo(res: Response, body, id: string) {
    if (body.file) {
      const base64Str = body.file;
      const path = './uploads/setting/';
      const optionalObj = {
        fileName: '',
        type: base64Str.split(';')[0].split('/')[1],
      };

      const imageInfo = base64ToImage(base64Str, path, optionalObj);

      const filePath = `http://${process.env.HOST}:${process.env.PORT}/setting/uploads/setting/logo/${imageInfo.fileName}`;

      const newLogo = await this.settingModel.findByIdAndUpdate(
        id,
        { logo: filePath },
        {
          new: true,
        },
      );

      return CommonMethods.success(
        res,
        'Image uploaded successfully',
        200,
        newLogo,
      );
    } else {
      return CommonMethods.error(res, 400, 'Image Not Uploaded');
    }
  }

  /*
    Service function to  upload favicon 
  **/
  public async uploadFavicon(res: Response, body, id: string) {
    if (body.file) {
      const base64Str = body.file;
      const path = './uploads/setting/';
      const optionalObj = {
        fileName: '',
        type: base64Str.split(';')[0].split('/')[1],
      };

      const imageInfo = base64ToImage(base64Str, path, optionalObj);

      const filePath = `http://${process.env.HOST}:${process.env.PORT}/setting/uploads/setting/favicon/${imageInfo.fileName}`;

      const newLogo = await this.settingModel.findByIdAndUpdate(
        id,
        { favicon: filePath },
        {
          new: true,
        },
      );

      return CommonMethods.success(
        res,
        'Image Uploaded Successfully',
        200,
        newLogo,
      );
    } else {
      return CommonMethods.error(res, 400, 'Image Not Uploaded');
    }
  }

  /*
    Service function to  upload hero-image
  **/
  public async uploadHeroImage(res: Response, body, id: string) {
    if (body.file) {
      const base64Str = body.file;
      const path = './uploads/setting/';
      const optionalObj = {
        fileName: '',
        type: base64Str.split(';')[0].split('/')[1],
      };

      const imageInfo = base64ToImage(base64Str, path, optionalObj);

      const filePath = `http://${process.env.HOST}:${process.env.PORT}/setting/uploads/setting/heroImage/${imageInfo.fileName}`;

      const newLogo = await this.settingModel.findByIdAndUpdate(
        id,
        { heroImage: filePath },
        {
          new: true,
        },
      );

      return CommonMethods.success(
        res,
        'Image Uploaded Successfully',
        200,
        newLogo,
      );
    } else {
      return CommonMethods.error(res, 400, 'Image Not Uploaded');
    }
  }

  /*
    Service function to General-Setting
  **/
  public async generalSetting(
    res: Response,
    adminId: string,
    generalSettingDto: GeneralSettingDto,
  ): Promise<Setting> {
    const Update = await this.settingModel.findByIdAndUpdate(
      adminId,
      generalSettingDto,
      { new: true },
    );
    if (Update) {
      return CommonMethods.success(res, 'Success', 200, Update);
    } else {
      return CommonMethods.error(res, 400, 'AdminId Not Found');
    }
  }

  /*






  
    Service function to  GetallGeneralSetting
  **/
  async getallGeneralSetting(res: Response): Promise<Setting> {
    const getallGeneralSetting = await this.settingModel
      .find()
      .sort({ created_at: -1 })
      .exec();
    if (getallGeneralSetting) {
      return CommonMethods.success(
        res,
        'GeneralSetting fetched successfully',
        200,
        getallGeneralSetting,
      );
    } else {
      return CommonMethods.error(res, 400, 'No GeneralSetting exists');
    }
  }
  /*
    Service function to generalSetting
  **/

  async getGeneralSettingById(
    res: Response,
    adminId: string,
  ): Promise<Setting> {
    const generalSetting = await this.settingModel.findById(adminId).exec();
    if (generalSetting) {
      return CommonMethods.success(res, 'Success', 200, generalSetting);
    } else {
      return CommonMethods.error(res, 400, 'generalSetting does not exists');
    }
  }

  /*
    Service function to social setting
  **/
  public async socialSetting(
    res: Response,
    adminId: string,
    socialSettingDto: socialSettingDto,
  ): Promise<Setting> {
    const Updated = await this.settingModel.findByIdAndUpdate(
      adminId,
      socialSettingDto,
      { new: true },
    );

    if (Updated) {
      return CommonMethods.success(res, 'Success', 200, Updated);
    } else {
      return CommonMethods.error(res, 400, 'AdminId Not Found');
    }
  }

  /*
    Service function to mail setting
  **/
  public async mailSetting(
    res: Response,
    adminId: string,
    mailsettingDto: MailsettingDto,
  ): Promise<Setting> {
    const Update = await this.settingModel.findByIdAndUpdate(
      adminId,
      mailsettingDto,
      { new: true },
    );

    if (Update) {
      return CommonMethods.success(res, 'Success', 200, Update);
    } else {
      return CommonMethods.error(res, 400, 'AdminId Not Found');
    }
  }
  /*
    Service function to updated preference
  **/
  async updatePreferences(
    res: Response,
    adminId: string,
    PreferencesDto: PreferencesDto,
  ): Promise<Setting> {
    const editPreferences = await this.settingModel.findByIdAndUpdate(
      adminId,
      PreferencesDto,
      { new: true },
    );
    if (editPreferences) {
      return CommonMethods.success(
        res,
        'Preferences Edited Successfully',
        200,
        editPreferences,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Preferences present');
    }
  }

  /*
    Service function to terms and service
  **/
  public async termsandservice(
    res: Response,
    adminId: string,
    termsandserviceDto: TermsandserviceDto,
  ): Promise<Setting> {
    const Update = await this.settingModel.findByIdAndUpdate(
      adminId,
      termsandserviceDto,
      { new: true },
    );

    if (Update) {
      return CommonMethods.success(
        res,
        'TermsAndServices Updated Successfully',
        200,
        Update,
      );
    } else {
      return CommonMethods.error(res, 400, 'AdminId Not Found');
    }
  }
}
