import {
	BadRequestError,
	ConflictError,
	NotFoundError,
	UnauthorizedError,
} from '../../errors';

export class UserNotFoundError extends NotFoundError {
	constructor(message = 'User not found') {
		super(message);
		this.name = 'UserNotFoundError';
	}
}

export class UserEmailConflictError extends ConflictError {
	constructor(message = 'Email already in use') {
		super(message);
		this.name = 'UserEmailConflictError';
	}
}

export class UserInvalidCredentialsError extends UnauthorizedError {
	constructor(message = 'Invalid credentials') {
		super(message);
		this.name = 'UserInvalidCredentialsError';
	}
}

export class UserInvalidCurrentPasswordError extends UnauthorizedError {
	constructor(message = 'Current password is invalid') {
		super(message);
		this.name = 'UserInvalidCurrentPasswordError';
	}
}

export class UserCurrentPasswordRequiredError extends BadRequestError {
	constructor(message = 'Current password is required to set a new password') {
		super(message);
		this.name = 'UserCurrentPasswordRequiredError';
	}
}

export class UserInvalidAvatarTypeError extends BadRequestError {
	constructor(message = 'File type not allowed. Use JPEG, PNG or WEBP.') {
		super(message);
		this.name = 'UserInvalidAvatarTypeError';
	}
}

export class UserAvatarTooLargeError extends BadRequestError {
	constructor(message = 'File too large. Max size is 2MB.') {
		super(message);
		this.name = 'UserAvatarTooLargeError';
	}
}
