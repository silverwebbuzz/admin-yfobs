import {
  Body,
  Controller,
  Post,
  Res,
  Param,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { BlogpostDto } from 'src/dto/blogpost/blogpost.dto';
import { blogpostService } from 'src/services/blogpost/blogpost.service';
@Controller('Blogpost')
export class blogpostController {
  constructor(private blogpostService: blogpostService) {}
  //createBlogpost Controller
  @Post('/createBlogpost')
  async createBlogpost(@Res() res, @Body() blogpostDto: BlogpostDto) {
    await this.blogpostService.createBlogpost(res, blogpostDto);
  }
  //getAllBlogpost Controller
  @Get('/getallBlogpost')
  async getallBlogpost(@Res() res) {
    await this.blogpostService.getallBlogpost(res);
  }
  //get image blogpost
  @Get('/uploads/blogpost/:filename')
  getProfileImage(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: 'uploads/blogpost' });
  }
  //getBlogpost Controller
  @Get('/getBlogpost/:blogId')
  async getBlogpost(@Res() res, @Param('blogId') blogId) {
    await this.blogpostService.getBlogpostById(res, blogId);
  }
  //updateBlogpost Controller
  @Put('/updateBlogpost/:id')
  async updateBlogpost(
    @Res() res,
    @Param('id') id,
    @Body() blogpostDto: BlogpostDto,
  ) {
    await this.blogpostService.updateBlogpost(res, id, blogpostDto);
  }
  //deleteBlogpost Controller
  @Delete('/deleteBlogpost/:blogId')
  async deleteBlogpost(@Res() res, @Param('blogId') blogId) {
    await this.blogpostService.deleteBlogpost(res, blogId);
  }
}
