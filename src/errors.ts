export class FilloutError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'FilloutError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = 'Invalid API key provided') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export function handleFilloutError(error: any): never {
  if (error.response?.data?.message) {
    throw new FilloutError(
      error.response.data.message,
      error.response.status,
      error.response.data.code
    );
  }

  if (error.response?.status === 401) {
    throw new AuthenticationError();
  }

  throw new FilloutError(
    error.message || 'An unexpected error occurred',
    error.response?.status
  );
}