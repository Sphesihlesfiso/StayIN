export const successResponse = (data: unknown, message = "Success") => ({
  success: true,
  message,
  data,
});

export const errorResponse = (message: string) => ({
  success: false,
  message,
  data: null,
});
export const validationError = (errors: object) => ({
  success: false,
  message:"Input validation Failed",
  errors,
  data: null,
});