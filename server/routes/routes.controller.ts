import { Controller, Get, Request } from '@nestjs/common';
import { Router, Request as ExpressRequest } from 'express';
import { RoutesService } from './routes.service';

@Controller()
export class RoutesController {
  constructor(private routesService: RoutesService) {}

  @Get()
  listRoutes(@Request() req: ExpressRequest) {
    const router = req.app._router as Router;
    const routes = this.routesService.listRoutes(router);
    return { routes };
  }
}
