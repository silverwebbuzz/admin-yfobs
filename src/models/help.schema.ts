import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type helpDocument = Help & Document;

@Schema({ timestamps: true, collection: 'help' })
export class Help {
  //General Settings/update settings
  @Prop({ required: false })
  title: string;

  @Prop({ required: false })
  category: string;

  @Prop({ required: false })
  details: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const HelpSchema = SchemaFactory.createForClass(Help);
