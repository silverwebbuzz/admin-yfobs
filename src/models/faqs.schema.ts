import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type faqsDocument = Faqs & Document;

@Schema({ timestamps: true, collection: 'faqs' })
export class Faqs {
  //General Settings/update settings
  @Prop({ required: false })
  title: string;

  @Prop({ required: false })
  details: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const FaqsSchema = SchemaFactory.createForClass(Faqs);
