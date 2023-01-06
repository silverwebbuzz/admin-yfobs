import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type packageFeaturesDocument = PackageFeatures & Document;

@Schema({ timestamps: true, collection: 'packageFeature' })
export class PackageFeatures {
  //General Settings/update settings
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  slug: string;

  @Prop({ required: false })
  basic?: string;

  @Prop({ required: false })
  standared: string;

  @Prop({ required: false })
  premium?: string;

  @Prop({ required: false })
  yearBasic?: string;

  @Prop({ required: false })
  yearStandared?: string;

  @Prop({ required: false })
  yearPremium?: string;

  @Prop({ required: false })
  type?: string;

  @Prop({ required: false })
  text?: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const PackageFeatureSchema =
  SchemaFactory.createForClass(PackageFeatures);
