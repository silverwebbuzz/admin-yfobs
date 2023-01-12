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
import { paymentDto } from 'src/dto/paymentPlan/payment.dto';
import { paymentService } from 'src/services/payment/payment.service';
import { searchDto } from 'src/dto/search/search.dto';
@Controller('Payment')
export class paymentController {
  constructor(private paymentService: paymentService) {}
  //createPages Controller
  @Post('/createPayment')
  async createPayment(@Res() res, @Body() paymentDto: paymentDto) {
    await this.paymentService.createPayment(res, paymentDto);
  }
  @Get('/getAllPages')
  async getAllPayment(@Res() res) {
    await this.paymentService.getAllPayment(res);
  }
  // //getPageById Controller
  // @Get('/getPage/:pageId')
  // async getPagesById(@Res() res, @Param('pageId') pageId) {
  //   await this.pagesService.getPagesById(res, pageId);
  // }
  // //updatePageById Controller
  // @Put('/updatePage/:pageId')
  // async updatePackageFeatures(
  //   @Res() res,
  //   @Param('pageId') pageId,
  //   @Body() PagesDto: PagesDto,
  // ) {
  //   await this.pagesService.updatePage(res, pageId, PagesDto);
  // }
  // //deletePageById Controller
  // @Delete('/deletePage/:pageId')
  // async deletePage(@Res() res, @Param('pageId') pageId) {
  //   await this.pagesService.deletePage(res, pageId);
  // }
}
