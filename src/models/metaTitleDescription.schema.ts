import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type metaTitleDescriptionDocument = MetaTitleDescription & Document;

@Schema({ timestamps: true, collection: 'metaTitleDescription' })
export class MetaTitleDescription {
  //General Settings/update settings
  @Prop({ required: false })
  pageName: string;

  @Prop({ required: false })
  metaTitle: string;

  @Prop({ required: false })
  metaDescription?: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const MetaTitleDescriptionSchema =
  SchemaFactory.createForClass(MetaTitleDescription);
