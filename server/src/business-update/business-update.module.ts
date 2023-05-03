import { Module } from '@nestjs/common'
import { BusinessUpdateController } from './business-update.controller'
import { BusinessUpdateService } from './business-update.service'
import { BusinessModule } from '../business/business.module'
import { GooglePlacesModule } from '../google-places/google-places.module'

@Module({
  imports: [BusinessModule, GooglePlacesModule],
  controllers: [BusinessUpdateController],
  providers: [BusinessUpdateService],
})
export class BusinessUpdateModule {}
