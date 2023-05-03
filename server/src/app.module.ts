import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FirebaseModule } from './firebase/firebase.module'
import { BusinessModule } from './business/business.module'
import { GooglePlacesModule } from './google-places/google-places.module'
import { BusinessUpdateModule } from './business-update/business-update.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONN_URL),
    FirebaseModule,
    BusinessModule,
    GooglePlacesModule,
    BusinessUpdateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
