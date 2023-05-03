import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common'
import { BusinessService } from './business.service'
import { Business } from './schemas/business.schema'

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get()
  async findAll(@Query() query: any): Promise<any> {
    try {
      const {page, sort, sortBy, category, name, source, status} = query
      const pageSize = 10
      const skip = page ? (page - 1) * pageSize : 0
      
      let params = {}
      if (category) {
        const categories = decodeURIComponent(category).split(',')
        params = { ...params, category: { $in: categories }}
      }
      if (name) {
        params = { ...params, name: { $regex: decodeURIComponent(name), $options: 'i' } }
      }
      if (source) {
        params = { ...params, override: source !== 'Google' }
      }
      if (status) {
        params = { ...params, displayStatus: status === 'Active' }
      }
      
      const pipeline = [];
      if (params) {
        pipeline.push({ $match: params })
      }
      
      if (sort && sortBy &&
        (sort === 'name' || sort === 'category' || sort === 'updatedDate')) {
        pipeline.push({ $sort: { [sort]: sortBy === 'asc' ? 1 : -1 } })
      } else {
        pipeline.push({ $sort: { name: 1 } })
      }

      pipeline.push({ $skip: skip })
      pipeline.push({ $limit: pageSize })
      
      const businesses = await this.businessService.findAll(params, pipeline)
      
      if (!businesses) {
        console.log("Businesses not found")
      }

      return businesses
    } catch (err) {
      console.log(err.message)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Business> {
    try {
      const business = await this.businessService.findOne(id)

      if (!business) {
        console.log("Business not found")
      }
      return business
    } catch (err) {
      console.log(err.message)
    }
  }

  @Post()
  async create(@Body() business: Business): Promise<Business> {
    try {
      const newBusiness = await this.businessService.create(business)

      if (!newBusiness) {
        console.log("Error creating business")
      }
      return newBusiness
    } catch (err) {
      console.log(err.message)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() business: Business): Promise<Business> {
    try {
      const updatedBusiness = await this.businessService.update(id, business)

      if (!updatedBusiness) {
        console.log("Business not found")
      }
      return updatedBusiness
    } catch (err) {
      console.log(err.message)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Business> {
    try {
      const business = await this.businessService.delete(id)

      if (!business) {
        console.log("Business not found")
      } else {
        return business
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  @Get('place/:id')
  async placeDataToBusiness(@Param('id') placeId: string): Promise<Business> {
    try {
      const business = await this.businessService.placeDataToBusiness(placeId)

      if (!business) {
        console.log("Error creating business object from place data")
      }
      return business
    } catch (err) {
      console.log(err.message)
    }
  }
}
