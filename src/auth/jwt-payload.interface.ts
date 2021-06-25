import { Schema as MongooseSchema } from 'mongoose';

export interface JwtPayload {
  _id: MongooseSchema.Types.ObjectId;
  email: string;
}
