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
import { helpService } from 'src/services/help/help.service';
import { HelpDto } from 'src/dto/help/help.dto';
import { searchDto } from 'src/dto/search/search.dto';
@Controller('help')
export class helpController {
  constructor(private helpService: helpService) {}
  //createHelp Controller
  @Post('/createHelp')
  async createPackageFeatures(@Res() res, @Body() helpDto: HelpDto) {
    await this.helpService.createHelp(res, helpDto);
  }
  //getAllHelp Controller
  @Post('/getAllHelp')
  async getAllHelp(@Res() res, @Body() searchDto: searchDto, @Body() body) {
    await this.helpService.getAllHelp(res, searchDto, body);
  }
  //getHelpById Controller
  @Get('/getHelp/:HelpId')
  async getPackageFeaturesById(@Res() res, @Param('HelpId') HelpId) {
    await this.helpService.getHelpById(res, HelpId);
  }
  //updateHelpById Controller
  @Put('/updateHelp/:HelpId')
  async updatePackageFeatures(
    @Res() res,
    @Param('HelpId') HelpId,
    @Body() helpDto: HelpDto,
  ) {
    await this.helpService.updateHelp(res, HelpId, helpDto);
  }
  //deleteHelpById Controller
  @Delete('/deleteHelp/:HelpId')
  async deletePackageFeatures(@Res() res, @Param('HelpId') HelpId) {
    await this.helpService.deleteHelp(res, HelpId);
  }
}
