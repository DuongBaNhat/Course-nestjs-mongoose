import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpCategoryDto, UpdateCategoryDto } from '../../database/dto/category.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchFilter } from 'src/common/util/search.util';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query() filter: SearchFilter) {
    return this.categoryService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

  @Patch('up/:id')
  up(@Param('id') id: string) {
    return this.categoryService.up(id);
  }

  @Patch('down/:id')
  down(@Param('id') id: string) {
    return this.categoryService.down(id);
  }

}
