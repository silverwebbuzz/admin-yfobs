import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type featuresDocument = features & Document;

@Schema({ timestamps: true, collection: 'features' })
export class features {
  //features Schema

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  thumb: string;

  @Prop({ required: false })
  image: string;

  @Prop({ required: false })
  order: string;

  @Prop({ required: false })
  details: string;

  @Prop({ required: false })
  homeFeatures: string;

  @Prop({ default: now() })
  createdAt: Date;

  //   @Prop({ default: now() })
  //   updatedAt: Date;
}

export const featuresSchema = SchemaFactory.createForClass(features);
