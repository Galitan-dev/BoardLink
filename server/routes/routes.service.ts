import { Injectable } from '@nestjs/common';
import { Router } from 'express';

@Injectable()
export class RoutesService {
  listRoutes(router: Router) {
    return router.stack
      .map(function (layer) {
        if (!layer.route) return undefined;
        const path = layer.route?.path;
        const method = layer.route?.stack[0].method;
        return `${method.toUpperCase()} ${path}`;
      })
      .filter((item) => item !== undefined);
  }
}
