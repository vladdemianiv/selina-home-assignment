import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CreateRoomBookingDto, GetRoomsParamsDto } from '../locations.dto';

export const GetRoomsParamsDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): GetRoomsParamsDto => {
    const request = ctx.switchToHttp().getRequest();
    return {
      to: request.query.to,
      from: request.query.from,
      locationId: request.params.id,
    };
  },
);

export const CreateRoomBookingDataDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CreateRoomBookingDto => {
    const request = ctx.switchToHttp().getRequest();
    return {
      to: request.body.to,
      from: request.body.from,
      locationId: request.params.id,
      roomType: request.params.type,
    };
  },
);
