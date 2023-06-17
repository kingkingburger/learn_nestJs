import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Req() req) {
    return req.user;
  }

  // 회원 가입 하는 정보
  @Post()
  postUsers(@Body() data: JoinRequestDto) {
    // data를 service에 넘겨준다.
    this.usersService.postUsers(data.email, data.nickname, data.password);
  }

  @Post('login')
  login(@Req() req) {
    return req.user;
  }

  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
