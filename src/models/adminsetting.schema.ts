import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

export type UserDocument = Setting & Document;

@Schema({ timestamps: true, collection: 'setting' })
export class Setting {
  @Prop({ required: false })
  siteName: string;
  @Prop({ required: false })
  siteTitle: string;

  @Prop({ required: false })
  favicon?: string;

  @Prop({ required: false })
  logo: string;

  @Prop({ required: false })
  heroImage?: string;

  @Prop({ required: false })
  keywords?: string[];

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  termsAndService?: string;

  @Prop({ required: false })
  footerAbout?: string;

  @Prop({ required: false })
  adminEmail?: string;

  @Prop({ required: false })
  mobile?: string;

  @Prop({ required: false })
  copyright?: string;
  //
  @Prop()
  paginationLimit?: string;
  //social settings/update settings

  @Prop({ required: false })
  facebook?: string;

  @Prop({ required: false })
  instagram: string;

  @Prop({ required: false })
  twitter?: string;

  @Prop({ required: false })
  linkedin?: string;

  @Prop({ required: false })
  googleAnalytics: string;

  //Terms of service//update

  @Prop({ required: false })
  siteColor?: string;

  @Prop({ required: false })
  siteFont?: string;

  @Prop({ required: false })
  layout?: string;

  @Prop({ required: false })
  siteInfo?: string;

  @Prop({ required: false })
  indCode?: string;

  @Prop({ required: false })
  purchaseCode?: string;

  //Preferences
  @Prop({ required: false })
  enableCaptcha?: string;

  @Prop({ required: false })
  enableRegistration?: string;

  @Prop({ required: false })
  enableEmailverify: string;

  @Prop({ required: false })
  enablePayment?: string;

  @Prop({ required: false })
  enableDeleteinvoice?: string;

  @Prop({ required: false })
  enableMultilingual: string;

  @Prop({ required: false })
  enableDiscount?: string;

  @Prop({ required: false })
  enableBlog?: string;

  @Prop({ required: false })
  enableFaq?: string;

  @Prop({ required: false })
  captchaSitekey?: string;

  @Prop({ required: false })
  captchaSecretkey?: string;

  @Prop({ required: false })
  paypalEmail?: string;

  @Prop({ required: false })
  paypalMode?: string;

  @Prop({ required: false })
  paypalPayment?: string;

  @Prop({ required: false })
  stripePayment?: string;

  @Prop({ required: false })
  publishKey: string;

  @Prop({ required: false })
  secretKey?: string;

  //Mail settings/update mail

  @Prop({ required: false })
  mailProtocol?: string;

  @Prop({ required: false })
  mailHost: string;

  @Prop({ required: false })
  mailPort?: string;

  @Prop({ required: false })
  mailUsername?: string;

  @Prop({ required: false })
  mailPassword?: string;

  @Prop({ required: false })
  mailTitle?: string;

  @Prop({ required: false })
  currency?: string;

  @Prop({ required: false })
  trialDays?: string;

  @Prop({ required: false })
  lang?: string;

  @Prop({ required: false })
  version?: string;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
