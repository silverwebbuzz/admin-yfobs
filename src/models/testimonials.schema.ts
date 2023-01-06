import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type testimonialDocument = testimonials & Document;

@Schema({ timestamps: true, collection: 'testimonials' })
export class testimonials {
  //General Settings/update settings
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  designation: string;

  @Prop({ required: false })
  feedback?: string;

  @Prop({ required: false })
  image: string;

  @Prop({ required: false })
  thumb: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const testimonialSchema = SchemaFactory.createForClass(testimonials);
