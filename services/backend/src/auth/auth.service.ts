import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { User } from "src/users/user.model";

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {
  }

  async login(userDto: CreateUserDto) {
      const user = await this.validateUser(userDto);
      return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException("User with email already exist.", HttpStatus.BAD_GATEWAY);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });
    return this.generateToken(user);
  }

  private generateToken(user: User) {
      const payload = {email: user.email, id: user.id, roles: user.roles}
      return {
          token: this.jwtService.sign(payload)
      }
   }

  private async validateUser(userDto: CreateUserDto) {
      const user = await this.userService.getUserByEmail(userDto.email);
      if (!user) {
          throw new UnauthorizedException({message: 'email or password not correct'});
      }

      const passwordEquals = await bcrypt.compare(userDto.password, user.password);
      if (passwordEquals) {
          return user;
      }

      throw new UnauthorizedException({message: 'email or password not correct'});
  }
}
