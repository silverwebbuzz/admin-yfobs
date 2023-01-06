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
import { PagesDto } from 'src/dto/pages/pages.dto';
import { pagesService } from 'src/services/pages/pages.service';
import { searchDto } from 'src/dto/search/search.dto';
@Controller('pages')
export class pagesController {
  constructor(private pagesService: pagesService) {}
  //createPages Controller
  @Post('/createPages')
  async createPackageFeatures(@Res() res, @Body() PagesDto: PagesDto) {
    await this.pagesService.createPages(res, PagesDto);
  }
  @Post('/getAllPages')
  async getAllPages(@Res() res, @Body() searchDto: searchDto, @Body() body) {
    await this.pagesService.getAllPages(res, searchDto, body);
  }
  //getPageById Controller
  @Get('/getPage/:pageId')
  async getPagesById(@Res() res, @Param('pageId') pageId) {
    await this.pagesService.getPagesById(res, pageId);
  }
  //updatePageById Controller
  @Put('/updatePage/:pageId')
  async updatePackageFeatures(
    @Res() res,
    @Param('pageId') pageId,
    @Body() PagesDto: PagesDto,
  ) {
    await this.pagesService.updatePage(res, pageId, PagesDto);
  }
  //deletePageById Controller
  @Delete('/deletePage/:pageId')
  async deletePage(@Res() res, @Param('pageId') pageId) {
    await this.pagesService.deletePage(res, pageId);
  }
}
