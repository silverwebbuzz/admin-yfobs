import { Body, Controller, Post, Res, Param, Get, Put } from '@nestjs/common';
import { settingService } from 'src/services/settingService/setting.service';
// import { AdminettingDto } from 'src/dto/adminsetting/adminSetting.dto';
import { GeneralSettingDto } from 'src/dto/adminsetting/generalSetting.dto';
import { socialSettingDto } from 'src/dto/adminsetting/socialSetting.dto';
import { MailsettingDto } from 'src/dto/adminsetting/mailSetting.dto';
import { PreferencesDto } from 'src/dto/adminsetting/preferences.dto';
import { TermsandserviceDto } from 'src/dto/adminsetting/termsandService.dto';
import { reCaptchaDto } from 'src/dto/adminsetting/reCaptcha.dto';
@Controller('setting')
export class settingController {
  constructor(private settingService: settingService) {}

  @Put('/updatePreferences/:adminId')
  async updatePreferences(
    @Res() res,
    @Param('adminId') adminId,
    @Body() PreferencesDto: PreferencesDto,
  ) {
    await this.settingService.updatePreferences(res, adminId, PreferencesDto);
  }

  //upload Logo
  @Post('upload_logo/:id')
  async uploadLogo(@Res() res, @Body() body, @Param('id') id) {
    await this.settingService.uploadLogo(res, body, id);
  }

  //upload Favicon Image
  @Post('upload_favicon/:id')
  async uploadFavicon(@Res() res, @Body() body, @Param('id') id) {
    await this.settingService.uploadFavicon(res, body, id);
  }
  //upload Hero Image
  @Post('upload_heroimage/:id')
  async uploadHeroimage(@Res() res, @Body() body, @Param('id') id) {
    await this.settingService.uploadHeroImage(res, body, id);
  }
  // get image
  @Get('uploads/setting/logo/:filename')
  getProfileImage(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: 'uploads/setting' });
  }
  @Get('uploads/setting/favicon/:filename')
  getFaviconImage(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: 'uploads/setting' });
  }
  @Get('uploads/setting/heroImage/:filename')
  getHeroImage(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: 'uploads/setting' });
  }

  //generalsetting update Controller
  @Post('/generalsetting/:adminId')
  public async generalSetting(
    @Res() res,
    @Param('adminId') adminId,
    @Body() generalSettingDto: GeneralSettingDto,
  ) {
    return await this.settingService.generalSetting(
      res,
      adminId,
      generalSettingDto,
    );
  }

  @Get('/getAllgenralsetting')
  async getAllgenralsetting(@Res() res) {
    await this.settingService.getallGeneralSetting(res);
  }
  //getgenralsetting Controller
  @Get('/getgenralsetting/:adminId')
  async getgenralsettingById(@Res() res, @Param('adminId') adminId) {
    await this.settingService.getGeneralSettingById(res, adminId);
  }
  //socialsetting Controller
  @Post('/socialsetting/:adminId')
  public async socialsetting(
    @Res() res,
    @Param('adminId') adminId,
    @Body() socialSettingDto: socialSettingDto,
  ) {
    return await this.settingService.socialSetting(
      res,
      adminId,
      socialSettingDto,
    );
  }
  //mailsetting Controller
  @Post('/mailsetting/:adminId')
  public async mailSetting(
    @Res() res,
    @Param('adminId') adminId,
    @Body() mailsettingDto: MailsettingDto,
  ) {
    return await this.settingService.mailSetting(res, adminId, mailsettingDto);
  }

  //terms and updated successfully
  @Post('/termsandservice/:adminId')
  public async termsandservice(
    @Res() res,
    @Param('adminId') adminId,
    @Body() termsandserviceDto: TermsandserviceDto,
  ) {
    return await this.settingService.termsandservice(
      res,
      adminId,
      termsandserviceDto,
    );
  }
  //reCaptcha updated
  @Post('/reCaptcha/:adminId')
  public async reCaptcha(
    @Res() res,
    @Param('adminId') adminId,
    @Body() reCaptchaDto: reCaptchaDto,
  ) {
    return await this.settingService.reCaptcha(res, adminId, reCaptchaDto);
  }
}
