import { PasswordOptions, Preset } from "@/types";

const charset = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

export function generatePassword(
  length: number,
  options: PasswordOptions,
  preset: Preset
): string {
  let characters = "";
  if (options.lowercase) characters += charset.lowercase;
  if (options.uppercase) characters += charset.uppercase;
  if (options.numbers) characters += charset.numbers;
  if (options.symbols) characters += charset.symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  if (preset === "easyToRead") {
    password = avoidAmbiguousCharacters(password, options);
  }

  return password;
}

function avoidAmbiguousCharacters(
  password: string,
  options: PasswordOptions
): string {
  const ambiguousCharacters = /[Ll1oO0]/g;
  let replacementCharacters = "";

  if (options.lowercase) {
    replacementCharacters += charset.lowercase.replace(ambiguousCharacters, "");
  }
  if (options.uppercase) {
    replacementCharacters += charset.uppercase.replace(ambiguousCharacters, "");
  }
  if (options.numbers) {
    replacementCharacters += charset.numbers.replace(ambiguousCharacters, "");
  }
  if (options.symbols) {
    replacementCharacters += charset.symbols;
  }

  return password.replace(ambiguousCharacters, () => {
    return replacementCharacters.charAt(
      Math.floor(Math.random() * replacementCharacters.length)
    );
  });
}

export function calculateComplexity(password: string): number {
  let complexity = 0;
  if (password.length > 5) complexity += 15;
  if (password.length > 10) complexity += 15;
  if (/[a-z]/.test(password)) complexity += 15;
  if (/[A-Z]/.test(password)) complexity += 15;
  if (/[0-9]/.test(password)) complexity += 15;
  if (/[^a-zA-Z0-9]/.test(password)) complexity += 25;
  return complexity;
}
