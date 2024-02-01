import { Controller,Request, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('findall')
  findAll() {
    return this.userService.findAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('showmeroles')
  showmeroles(@Request() req){
    return this.userService.showmeroles(req.user.userId);  
  }

  @UseGuards(JwtAuthGuard)
  @Get('findUserbyId/:id')
  findUserbyId(@Param('id') id :any) {
    return this.userService.findUserbyId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('findnameofUserbyId/:id')
  findnameofUserbyId(@Param('id') id :any) {
    return this.userService.findnameofUserbyId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  findOne(@Param('email') email :string) {
    return this.userService.findOne(email);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.userService.update(email, updateUserDto, req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':email')
  remove(@Param('email') email: string, @Request() req)
   {
    return this.userService.remove(email , req.user.userId);
  }
}
