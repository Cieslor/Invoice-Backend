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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(input: AuthRegisterInput) {
    const { email, password } = input;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new this.userModel({
      email,
      password: hashedPassword,
    });

    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        //duplicate email
        throw new ConflictException(`User with email: ${email} already exists`);
      } else {
        throw new InternalServerErrorException();
      }
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
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
