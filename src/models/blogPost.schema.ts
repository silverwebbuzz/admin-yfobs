import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type blogPostDocument = blogPost & Document;

@Schema({ timestamps: true, collection: 'blogpost' })
export class blogPost {
  //General Settings/update settings
  @Prop({ required: false })
  title: string;

  @Prop({ required: false })
  slug: string;

  @Prop({ required: false })
  details: string;

  @Prop({ required: false })
  image: string;

  @Prop({ required: false })
  thumb: string;

  @Prop({ required: false })
  status: string;

  @Prop({ required: false })
  hit: string;

  @Prop({ default: '0', required: false })
  isHome: string;

  @Prop({ required: false })
  isFeatured: string;

  @Prop({ required: false })
  categoryId: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const blogPostSchema = SchemaFactory.createForClass(blogPost);
