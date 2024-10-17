export function toUpperCase(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function isEmailValid(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export function validatePassword(password: string) {
  const issues = [];

  // Comprobar longitud
  if (password.length < 8 || password.length > 16) {
    issues.push("La contraseña debe tener entre 8 y 16 caracteres.");
  }

  // Comprobar si tiene al menos una mayúscula
  if (!/[A-Z]/.test(password)) {
    issues.push("La contraseña debe contener al menos una letra mayúscula.");
  }

  // Comprobar si tiene al menos una minúscula
  if (!/[a-z]/.test(password)) {
    issues.push("La contraseña debe contener al menos una letra minúscula.");
  }

  // Comprobar si tiene al menos un número
  if (!/[0-9]/.test(password)) {
    issues.push("La contraseña debe contener al menos un número.");
  }

  return issues;
}
