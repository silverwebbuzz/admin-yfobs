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
import { taxDto } from 'src/dto/tax/tax.dto';
import { taxService } from 'src/services/tax/tax.service';
@Controller('tax')
export class taxController {
  constructor(private taxService: taxService) {}
  //createTax Controller
  @Post('/createTax')
  async createTax(@Res() res, @Body() taxDto: taxDto) {
    await this.taxService.createTax(res, taxDto);
  }
  //getAllTax Controller
  @Get('/getAllTax')
  async getAllTax(@Res() res) {
    await this.taxService.getAllTax(res);
  }
  //getTaxBY ID Controller
  @Get('/getTax/:taxId')
  async getTaxById(@Res() res, @Param('taxId') taxId) {
    await this.taxService.getTaxById(res, taxId);
  }
  //updateTax Controller
  @Put('/updateTax/:taxId')
  async updateTax(@Res() res, @Param('taxId') taxId, @Body() taxDto: taxDto) {
    await this.taxService.updateTax(res, taxId, taxDto);
  }
  //deleteTax Controller
  @Delete('/deleteTax/:taxId')
  async deleteTax(@Res() res, @Param('taxId') taxId) {
    await this.taxService.deleteTax(res, taxId);
  }
}
