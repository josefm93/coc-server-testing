import { Test, TestingModule } from '@nestjs/testing'
import { BusinessUpdateController } from './business-update.controller'

describe('BusinessUpdateController', () => {
  let controller: BusinessUpdateController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessUpdateController],
    }).compile()

    controller = module.get<BusinessUpdateController>(BusinessUpdateController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
