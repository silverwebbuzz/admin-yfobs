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
import { faqsService } from 'src/services/faqs/faqs.service';
import { FaqsDto } from 'src/dto/faqs/faqs.dto';
@Controller('faqs')
export class faqsController {
  constructor(private faqsService: faqsService) {}
  //createFaqs Controller
  @Post('/createFaqs')
  async createFaqs(@Res() res, @Body() faqsDto: FaqsDto) {
    await this.faqsService.createFaqs(res, faqsDto);
  }
  //getAllFaqs Controller
  @Get('/getAllFaqs')
  async getAllFaqs(@Res() res) {
    await this.faqsService.getAllFaqs(res);
  }
  //getFaqs Controller
  @Get('/getFaqs/:FaqsId')
  async getFaqsById(@Res() res, @Param('FaqsId') FaqsId) {
    await this.faqsService.getFaqsById(res, FaqsId);
  }
  //updateFaqs Controller
  @Put('/updateFaqs/:FaqsId')
  async updateFaqs(
    @Res() res,
    @Param('FaqsId') FaqsId,
    @Body() faqsDto: FaqsDto,
  ) {
    await this.faqsService.updateFaqs(res, FaqsId, faqsDto);
  }
  //deleteFaqs Controller
  @Delete('/deleteFaqs/:FaqsId')
  async deleteFaqs(@Res() res, @Param('FaqsId') FaqsId) {
    await this.faqsService.deleteFaqs(res, FaqsId);
  }
}
