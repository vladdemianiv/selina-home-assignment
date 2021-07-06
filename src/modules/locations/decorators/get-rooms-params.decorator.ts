import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GetRoomsParamsDto } from '../locations.dto';

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
