import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Business, BusinessSchema } from './schemas/business.schema'
import { BusinessController } from './business.controller'
import { BusinessService } from './business.service'
import { GooglePlacesModule } from 'src/google-places/google-places.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Business.name, schema: BusinessSchema }]),
    GooglePlacesModule
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
  exports: [BusinessService]
})
export class BusinessModule {}
