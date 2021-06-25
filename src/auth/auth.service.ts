import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterInput } from './dto/auth-register.input';
import { AuthLoginInput } from './dto/auth-login.input';
import { User, UserDocument } from './models/user.model';
import { JwtPayload } from './jwt-payload.interface';
import { Errors } from '../common/errors';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(input: AuthRegisterInput): Promise<User> {
    const { email, password } = input;

    if (await this.userModel.findOne({ email })) {
      throw new ConflictException(Errors.USER_ALREADY_EXISTS);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new this.userModel({
      email,
      password: hashedPassword,
    });

    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async login(
    input: AuthLoginInput,
  ): Promise<{ accessToken: string; user: User }> {
    const { email, password } = input;

    const user: User = await this.userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { _id: user._id, email: user.email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken, user };
    } else {
      throw new UnauthorizedException(Errors.CHECK_LOGIN_CREDENTIALS);
    }
  }
}
