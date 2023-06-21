import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'dnjs@gamil.com',
    description: '이메일',
    required: true,
  })
  public email: string;
  @ApiProperty({
    example: 'min',
    description: '이름',
    required: true,
  })
  public nickname: string;
  @ApiProperty({
    example: '1234',
    description: '비밀번호',
    required: true,
  })
  public password: string;
}
