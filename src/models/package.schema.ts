import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type PackageDocument = Package & Document;

@Schema({ timestamps: true, collection: 'package' })
export class Package {
  //General Settings/update settings
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  slug: string;

  @Prop({ required: false })
  price: string;

  @Prop({ required: false })
  monthlyPrice: string;

  @Prop({ required: false })
  billType: string;

  @Prop({ required: false })
  discountMonth: string;

  @Prop({ required: false })
  discountYear: string;

  @Prop({ default: 0 })
  isSpecial: string;

  @Prop({ default: 0 })
  status: string;
  //   @Prop({ default: now() })
  //   createdAt: Date;

  //   @Prop({ default: now() })
  //   updatedAt: Date;
}

export const packageSchema = SchemaFactory.createForClass(Package);
