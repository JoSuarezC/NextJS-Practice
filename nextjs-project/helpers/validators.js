export const isEmailInvalid = (email) => {
  return !email || !email.includes('@');
}