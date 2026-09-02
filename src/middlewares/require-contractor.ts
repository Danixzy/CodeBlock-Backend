import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { ForbiddenError } from '../errors';
import { User } from '../domains/users/model';

export const requireContractor = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authUserId = Number(req.user?.id);

    if (!Number.isInteger(authUserId) || authUserId <= 0) {
      next(new ForbiddenError('Only contractor accounts can perform this action'));
      return;
    }

    const tokenAccountType = req.user?.accountType ?? req.user?.account_type;

    // Fast path when token already has the right claim.
    if (tokenAccountType === 'contractor') {
      next();
      return;
    }

    // Fallback for stale/old tokens: validate account type from database.
    const user = await User.query().findById(authUserId).select('id', 'account_type');
    if (user?.accountType !== 'contractor') {
      next(new ForbiddenError('Only contractor accounts can perform this action'));
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};
