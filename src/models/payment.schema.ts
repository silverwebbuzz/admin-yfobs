import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

export type pagesDocument = payment & Document;

@Schema({ timestamps: true, collection: 'payment' })
export class payment {
  @Prop()
  userId?: string;

  @Prop()
  paymentUniqId?: string;

  @Prop()
  package?: string;

  @Prop()
  billingType?: string;

  @Prop()
  paymentType?: string;

  @Prop()
  texId?: string;

  @Prop({ default: null })
  amount?: string;

  @Prop()
  paymentStatus?: string;

  @Prop({ default: now() })
  expireOn?: string;

  @Prop({ default: now() })
  createdAt: string;

  @Prop({ default: now() })
  updatedAt: string;
}

export const paymentSchema = SchemaFactory.createForClass(payment);
