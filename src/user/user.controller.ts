import { Controller,Request, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

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
  @Get('finduserbyemail:email')
  findOne(@Param('email') email :string) {
    return this.userService.findOne(email);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('changePassword/:id')
  async changePassword(
    @Param('id') userId: string,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.userService.changePassword(userId, changePasswordDto.currentPassword, changePasswordDto.newPassword);
  }
}
