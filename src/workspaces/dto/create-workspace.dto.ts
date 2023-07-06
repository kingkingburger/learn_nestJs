import { ApiProperty, PickType } from '@nestjs/swagger';
import { Workspaces } from '../../entities/Workspaces';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '슬리엑트',
    description: '워크스페이스명',
  })
  public workspace: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'sleact',
    description: 'url 주소',
  })
  public url: string;
}
