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
import { testimonialDto } from 'src/dto/testimonials/testimonial.dto';
import { testimonialService } from 'src/services/testimonials/testimonial.service';
@Controller('testimonials')
export class testimonialController {
  constructor(private testimonialService: testimonialService) {}
  //createTestimonials Controller
  @Post('/createTestimonials')
  async createTestimonials(@Res() res, @Body() testimonialDto: testimonialDto) {
    await this.testimonialService.createTestimonials(res, testimonialDto);
  }
  //get image Testimonials
  @Get('/uploads/testimonials/:filename')
  getProfileImage(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: 'uploads/testimonials' });
  }
  //getAllTestimonials Controller
  @Get('/getAllTestimonials')
  async getAllTestimonials(@Res() res) {
    await this.testimonialService.getAllTestimonials(res);
  }
  //getFaqs Controller
  @Get('/getTestimonial/:TestimonialId')
  async getTestimonialsById(@Res() res, @Param('TestimonialId') TestimonialId) {
    await this.testimonialService.getTestimonialsById(res, TestimonialId);
  }
  //updateFaqs Controller
  @Put('/updateTestimonials/:TestimonialId')
  async updateTestimonials(
    @Res() res,
    @Param('TestimonialId') TestimonialId,
    @Body() testimonialDto: testimonialDto,
  ) {
    await this.testimonialService.updateTestimonials(
      res,
      TestimonialId,
      testimonialDto,
    );
  }
  //DeleteTestimonialID Controller
  @Delete('/deleteTestimonial/:TestimonialId')
  async deleteTestimonial(@Res() res, @Param('TestimonialId') TestimonialId) {
    await this.testimonialService.deleteTestimonial(res, TestimonialId);
  }
}
