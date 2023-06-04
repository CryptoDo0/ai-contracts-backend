import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const baererHeaderData = authHeader.split(" ");
            const baerer = baererHeaderData[0];
            const token = baererHeaderData[1];
            if (baerer != 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'User not authorization'});
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            return true;
        } catch (e) {
            console.error(e);
            throw new UnauthorizedException({message: 'User not authorization'});
        }
  }
}