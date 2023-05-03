import { Test, TestingModule } from '@nestjs/testing'
import { BusinessUpdateService } from './business-update.service'
import { GooglePlacesService } from '../google-places/google-places.service'
import { BusinessService } from '../business/business.service'

describe('BusinessUpdateService', () => {
  let service: BusinessUpdateService
  let googlePlacesService: GooglePlacesService
  let businessService: BusinessService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessUpdateService, GooglePlacesService, BusinessService],
    }).compile()

    service = module.get<BusinessUpdateService>(BusinessUpdateService)
    googlePlacesService = module.get<GooglePlacesService>(GooglePlacesService)
    businessService = module.get<BusinessService>(BusinessService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(googlePlacesService).toBeDefined()
    expect(businessService).toBeDefined()
  })
})
