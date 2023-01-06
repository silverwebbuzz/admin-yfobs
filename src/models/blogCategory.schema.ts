import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type blogCategoryDocument = BlogCategory & Document;

@Schema({ timestamps: true, collection: 'blogCategory' })
export class BlogCategory {
  //General Settings/update settings
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  slug: string;

  @Prop({ required: false })
  status: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const BlogCategorySchema = SchemaFactory.createForClass(BlogCategory);
