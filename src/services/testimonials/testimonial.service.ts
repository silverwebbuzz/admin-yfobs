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
import { testimonialDto } from 'src/dto/testimonials/testimonial.dto';
import { testimonials } from 'src/models/testimonials.schema';
import { CommonMethods } from 'src/utilities/common.method';
const base64ToImage = require('base64-to-image');
@Injectable()
export class testimonialService {
  constructor(
    @InjectModel('testimonials')
    private testimonialsModel: Model<testimonials>,
  ) {}

  /*
    Service function to created Testimonial
  **/
  async createTestimonials(
    res: Response,
    testimonialDto: testimonialDto,
  ): Promise<testimonials> {
    const base64Str = testimonialDto.image;
    const path = './uploads/testimonials/';
    const optionalObj = {
      fileName: '',
      type: base64Str.split(';')[0].split('/')[1],
    };
    const imageInfo = base64ToImage(base64Str, path, optionalObj);

    const filePath = `http://${process.env.HOST}:${process.env.PORT}/testimonials/uploads/testimonials/${imageInfo.fileName}`;
    const newTestimonials = new this.testimonialsModel(testimonialDto).$set({
      image: filePath,
    });
    if (newTestimonials) {
      await newTestimonials.save();
      return CommonMethods.success(
        res,
        'Testimonials Created',
        200,
        newTestimonials,
      );
    } else {
      return CommonMethods.error(res, 400, 'Already Exists');
    }
  }

  /*
    Service function to get all Testimonial
  **/
  async getAllTestimonials(res: Response): Promise<testimonials> {
    const getTestimonials = await this.testimonialsModel
      .find()
      .sort({ created_at: -1 })
      .exec();
    if (getTestimonials) {
      return CommonMethods.success(
        res,
        'Testimonials List fetched successfully',
        200,
        getTestimonials,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Testimonials exists');
    }
  }
  /*
    Service function to get by id Testimonial
  **/
  async getTestimonialsById(
    res: Response,
    TestimonialId: string,
  ): Promise<testimonials> {
    const Testimonials = await this.testimonialsModel
      .findById(TestimonialId)
      .exec();
    if (Testimonials) {
      return CommonMethods.success(res, 'Success', 200, Testimonials);
    } else {
      return CommonMethods.error(res, 400, 'Testimonials Does Not Exists');
    }
  }

  /*
    Service function to updated Testimonial
  **/
  async updateTestimonials(
    res: Response,
    TestimonialId: string,
    testimonialDto: testimonialDto,
  ): Promise<testimonials> {
    const base64Str = testimonialDto.image;
    const path = './uploads/testimonials/';
    const optionalObj = {
      fileName: '',
      type: base64Str.split(';')[0].split('/')[1],
    };
    const imageInfo = base64ToImage(base64Str, path, optionalObj);
    const { name, designation, feedback } = testimonialDto;
    const filePath = `http://${process.env.HOST}:${process.env.PORT}/testimonials/uploads/testimonials/${imageInfo.fileName}`;
    const editTestimonial = await this.testimonialsModel.findByIdAndUpdate(
      TestimonialId,
      { image: filePath, name, designation, feedback },
      { new: true },
    );
    if (editTestimonial) {
      return CommonMethods.success(
        res,
        'Testimonial Edited Successfully',
        200,
        editTestimonial,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Testimonial Present');
    }
  }
  /*
    Service function to deleted Testimonial
  **/
  async deleteTestimonial(
    res: Response,
    TestimonialId: string,
  ): Promise<testimonials> {
    const deleteTestimonials = await this.testimonialsModel.findByIdAndDelete(
      TestimonialId,
    );
    if (deleteTestimonials) {
      return CommonMethods.success(
        res,
        'Testimonials Deleted Successfully',
        200,
        [],
      );
    } else {
      return CommonMethods.error(res, 400, 'No Testimonials present');
    }
  }
}
