import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../common/dto/user.dto';
import { User } from '../common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from '../common/interceptors/undefinedToNull.interceptor';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { TransactionInterceptor } from '../common/interceptors/transaction.interceptor';
import { TransactionManager } from '../common/decorators/transaction.decorator';
import { EntityManager } from 'typeorm';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    type: UserDto,
  })
  @ApiOperation({ summary: '내 정보 조회' })
  @Get()
  getUsers(@User() user) {
    return user || false;
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })

  // 회원 가입 하는 정보
  // @UseGuards(new NotLoggedInGuard())
  @ApiOperation({ summary: '회원가입' })
  @Post()
  // @UseInterceptors(TransactionInterceptor)
  async join(
    @Body() data: JoinRequestDto,
    // @TransactionManager() queryRunnerManager: EntityManager,
  ) {
    // data를 service에 넘겨준다.
    await this.usersService.join(
      data.email,
      data.nickname,
      data.password,
      // queryRunnerManager,
    );
  }
  // 회원 가입 하는 정보
  // @UseGuards(new NotLoggedInGuard())
  // @ApiOperation({ summary: '회원가입' })
  // @Post()
  // @UseInterceptors(TransactionInterceptor)
  // async join(
  //   @Body() data: JoinRequestDto,
  //   // @TransactionManager() queryRunnerManager: EntityManager,
  // ) {
  //   // data를 service에 넘겨준다.
  //   await this.usersService.join(
  //     data.email,
  //     data.nickname,
  //     data.password,
  //     // queryRunnerManager,
  //   );
  // }

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@User() user) {
    return user;
  }
  // 인터셉터를 쓰면 { data: user } 로 가공 가능
  // 에러가 난 경우, exception filter를 사용

  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
