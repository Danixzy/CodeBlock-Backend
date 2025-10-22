import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './model';
import { env } from '../../config/env';
import { ConflictError, UnauthorizedError, NotFoundError } from '../../errors';

export class UserService {
  async create(data: { name: string; email: string; password: string }) {
    const existingUser = await User.query().findOne({ email: data.email });

    if (existingUser) {
      throw new ConflictError('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.query().insert({
      ...data,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(email: string, password: string) {
    const user = await User.query().findOne({ email });

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      env.jwt.secret as jwt.Secret,
      { expiresIn: env.jwt.expiresIn as string | number } as jwt.SignOptions
    );

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async findById(id: number) {
    const user = await User.query().findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll() {
    const users = await User.query();
    return users.map(({ password, ...user }) => user);
  }

  async update(id: number, data: Partial<{ name: string; email: string; password: string }>) {
    const user = await User.query().findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await User.query().findOne({ email: data.email });
      if (existingUser) {
        throw new ConflictError('Email already in use');
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await User.query().patchAndFetchById(id, data);
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async delete(id: number) {
    const user = await User.query().findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await User.query().deleteById(id);
  }
}
