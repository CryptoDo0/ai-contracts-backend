import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
    private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])

            if (!requiredRoles) {
                return true;
            }

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedException({message: 'User not authorization'});
            }

            const baererHeaderData = authHeader.split(" ");
            const baerer = baererHeaderData[0];
            const token = baererHeaderData[1];
            if (baerer != 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'User not authorization'});
            }

            const user = this.jwtService.verify(token);
            const isAccess = user.roles.some(role => requiredRoles.includes(role.value));
            if (!isAccess) {
                throw new HttpException({message: 'Access denied'}, HttpStatus.FORBIDDEN);
            }

            return isAccess;
        } catch (e) {
            console.log(e);
            throw new HttpException({message: 'Access denied'}, HttpStatus.FORBIDDEN);
        }
  }
}