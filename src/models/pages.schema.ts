import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type pagesDocument = pages & Document;

@Schema({ timestamps: true, collection: 'pages' })
export class pages {
  //General Settings/update settings
  @Prop({ required: false })
  title: string;

  @Prop({ required: false })
  slug: string;

  @Prop({ required: false })
  details?: string;

  @Prop({ required: false })
  status: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const pagesSchema = SchemaFactory.createForClass(pages);
