import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingSchema } from './models/adminsetting.schema';
import { settingService } from './services/settingService/setting.service';
import { settingController } from './controller/Adminsetting/Adminsetting.controller';
import { businessCategoryService } from './services/businessCategory/businessCategory.Service';
import { businessCategoryController } from './controller/businessCategory/businesscategory.controller';
import { BusinessCategorySchema } from './models/businessCategory.schema';
import { PackageFeatureSchema } from './models/packageFeatures.schema';
import { packageFeaturesService } from './services/packageFeatures/packageFeatures.service';
import { PackageFeaturesController } from './controller/packageFeatures/packagefeatures.controller';
import { MetaTitleDescriptionSchema } from './models/metaTitleDescription.schema';
import { metaTitleDescriptionService } from './services/metaTitleDescription/metaTitleDescription.service';
import { metaTitleDescriptionController } from './controller/metaTitleDescription/metatitledescription.controller';
import { packageSchema } from './models/package.schema';
import { featuresSchema } from './models/features.schema';
import { packageController } from './controller/package/package.controller';
import { featuresController } from './controller/features/features.controller';
import { packageService } from './services/packageService/package.service';
import { featuresService } from './services/features/features.service';
import { pagesSchema } from './models/pages.schema';
import { pagesController } from './controller/pages/pages.controller';
import { pagesService } from './services/pages/pages.service';
import { FaqsSchema } from './models/faqs.schema';
import { faqsService } from './services/faqs/faqs.service';
import { faqsController } from './controller/faqs/faqs.controller';
import { HelpSchema } from './models/help.schema';
import { helpService } from './services/help/help.service';
import { helpController } from './controller/help/help.controller';
import { blogPostSchema } from './models/blogPost.schema';
import { blogpostController } from './controller/blogpost/blogpost.controller';
import { blogpostService } from './services/blogpost/blogpost.service';
import { testimonialSchema } from './models/testimonials.schema';
import { testimonialController } from './controller/testimonials/testimonial.controller';
import { testimonialService } from './services/testimonials/testimonial.service';
import { taxSchema } from './models/tax.schema';
import { taxController } from './controller/tax/tax.controller';
import { taxService } from './services/tax/tax.service';
import { BlogCategorySchema } from './models/blogCategory.schema';
import { blogCategoryController } from './controller/blog/blogCategory.controller';

import { ConfigModule } from '@nestjs/config';
import { blogCategoryService } from './services/blog/blogCategory.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{ name: 'Setting', schema: SettingSchema }]),
    MongooseModule.forFeature([
      { name: 'BusinessCategory', schema: BusinessCategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: 'PackageFeatures', schema: PackageFeatureSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'MetaTitleDescription', schema: MetaTitleDescriptionSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Package', schema: packageSchema }]),
    MongooseModule.forFeature([{ name: 'features', schema: featuresSchema }]),
    MongooseModule.forFeature([{ name: 'pages', schema: pagesSchema }]),
    MongooseModule.forFeature([{ name: 'Faqs', schema: FaqsSchema }]),
    MongooseModule.forFeature([{ name: 'Help', schema: HelpSchema }]),
    MongooseModule.forFeature([{ name: 'Blogpost', schema: blogPostSchema }]),
    MongooseModule.forFeature([
      { name: 'testimonials', schema: testimonialSchema },
    ]),
    MongooseModule.forFeature([{ name: 'tax', schema: taxSchema }]),
    MongooseModule.forFeature([
      { name: 'blogCategory', schema: BlogCategorySchema },
    ]),
  ],
  controllers: [
    AppController,
    settingController,
    businessCategoryController,
    PackageFeaturesController,
    metaTitleDescriptionController,
    packageController,
    featuresController,
    pagesController,
    faqsController,
    helpController,
    blogpostController,
    testimonialController,
    taxController,
    blogCategoryController,
  ],
  providers: [
    AppService,
    settingService,
    businessCategoryService,
    packageFeaturesService,
    metaTitleDescriptionService,
    packageService,
    featuresService,
    pagesService,
    faqsService,
    helpService,
    blogpostService,
    testimonialService,
    taxService,
    blogCategoryService,
  ],
})
export class AppModule {}
