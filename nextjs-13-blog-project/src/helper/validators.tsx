export const isEmailInvalid = (email: string) => {
  return !email || !email.includes('@');
}

export const isTextInvalid = (text: string) => {
  return !text || text.trim() === '';
}

