import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type taxDocument = tax & Document;

@Schema({ timestamps: true, collection: 'tax' })
export class tax {
  //General Settings/update settings
  @Prop({ required: false })
  userId?: string;

  @Prop({ required: false })
  businessId?: string;

  @Prop({ required: false })
  type?: string;

  @Prop({ required: false })
  taxName?: string;

  @Prop({ required: false })
  rate?: string;

  @Prop({ required: false })
  number?: string;

  @Prop({ required: false })
  details?: string;

  @Prop({ required: false })
  isInvoices?: string;

  @Prop({ required: false })
  isRecoverable?: string;

  @Prop({ required: false })
  isAdmin?: string;

  @Prop({ required: false })
  isDisplayuser?: string;

  @Prop({ required: false })
  isGrouptax?: string;

  @Prop({ required: false })
  groupTaxid?: string;

  @Prop({ required: false })
  taxwithinState?: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const taxSchema = SchemaFactory.createForClass(tax);
