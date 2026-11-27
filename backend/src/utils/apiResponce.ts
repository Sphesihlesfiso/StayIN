
/**
 * Functions for succsess/Error responces and validation
 * @param data -Data that gave an error
 * @param message:string-The error or succsecc message
 */

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