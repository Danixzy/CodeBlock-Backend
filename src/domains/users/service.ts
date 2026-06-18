import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { User, UserRole, AccountType } from './model';
import { env } from '../../config/env';
import {
  UserAvatarTooLargeError,
  UserCurrentPasswordRequiredError,
  UserEmailConflictError,
  UserInvalidAvatarTypeError,
  UserInvalidCredentialsError,
  UserInvalidCurrentPasswordError,
  UserNotFoundError,
} from './errors';
import { LocalStorageService } from '../../storage/localStorage';

const localStorageService = new LocalStorageService();

type UpdateUserData = Partial<{
  name: string;
  email: string;
  password: string;
  currentPassword: string;
  newPassword: string;
}>;

type UpdateProfileData = Partial<{
  name: string;
  email: string;
  bio: string;
  location: string;
  accountType: AccountType;
  currentPassword: string;
  newPassword: string;
}>;

export class UserService {
  async create(data: { name: string; email: string; password: string; role?: UserRole }) {
    const existingUser = await User.query().findOne({ email: data.email });

    if (existingUser) {
      throw new UserEmailConflictError();
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.query().insert({
      ...data,
      password: hashedPassword,
      role: data.role || 'client', // Default to client
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(email: string, password: string) {
    const user = await User.query().findOne({ email });

    if (!user) {
      throw new UserInvalidCredentialsError();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UserInvalidCredentialsError();
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, accountType: user.accountType },
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
      throw new UserNotFoundError();
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll() {
    const users = await User.query();
    return users.map(({ password, ...user }) => user);
  }

  async update(id: number, data: UpdateUserData) {
    const user = await User.query().findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await User.query().findOne({ email: data.email });
      if (existingUser) {
        throw new UserEmailConflictError();
      }
    }

    const updateData: Partial<{ name: string; email: string; password: string }> = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    if (data.newPassword) {
      if (!data.currentPassword) {
        throw new UserCurrentPasswordRequiredError();
      }

      const isCurrentPasswordValid = await bcrypt.compare(data.currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        throw new UserInvalidCurrentPasswordError();
      }

      updateData.password = data.newPassword;
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.query().patchAndFetchById(id, updateData);
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async delete(id: number) {
    const user = await User.query().findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    await User.query().deleteById(id);
  }

  async getMe(userId: number) {
    return this.findById(userId);
  }

  async updateMe(userId: number, data: UpdateProfileData) {
    const user = await User.query().findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (data.email && data.email !== user.email) {
      const existing = await User.query().findOne({ email: data.email });
      if (existing) throw new UserEmailConflictError();
    }

    const updateData: Partial<{ name: string; email: string; bio: string; location: string; accountType: AccountType; password: string }> = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.location !== undefined) updateData.location = data.location;
    if (data.accountType !== undefined) updateData.accountType = data.accountType;

    if (data.newPassword) {
      if (!data.currentPassword) {
        throw new UserCurrentPasswordRequiredError();
      }
      const isValid = await bcrypt.compare(data.currentPassword, user.password);
      if (!isValid) throw new UserInvalidCurrentPasswordError();
      updateData.password = await bcrypt.hash(data.newPassword, 10);
    }

    if (Object.keys(updateData).length === 0) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    const updated = await User.query().patchAndFetchById(userId, updateData);
    const { password, ...userWithoutPassword } = updated;
    return userWithoutPassword;
  }

  async updateAvatar(userId: number, file: Express.Multer.File) {
    const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];
    const MAX_SIZE = 2 * 1024 * 1024;

    if (!ALLOWED_MIME.includes(file.mimetype)) {
      throw new UserInvalidAvatarTypeError();
    }
    if (file.size > MAX_SIZE) {
      throw new UserAvatarTooLargeError();
    }

    const user = await User.query().findById(userId);
    if (!user) throw new UserNotFoundError();

    const currentAvatarUrl = user.avatar_url;

    if (currentAvatarUrl) {
      const oldFilename = path.basename(currentAvatarUrl);
      await localStorageService.deleteFile(oldFilename);
    }

    const ext = file.mimetype.split('/')[1];
    const filename = `avatar-${userId}-${Date.now()}.${ext}`;
    await localStorageService.saveFile(file.buffer, filename);

    const updated = await User.query().patchAndFetchById(userId, {
      avatar_url: `/uploads/${filename}`,
    });

    const { password, ...userWithoutPassword } = updated;
    return userWithoutPassword;
  }
}
