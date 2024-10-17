"use server"
/*import * as dns from "dns";

export async function validateEmailDomain(email: string) {
    const domain = email.split("@")[1];
    return new Promise((resolve, reject) => {
      dns.resolveMx(domain, (error, addresses) => {
        if (error || addresses.length === 0) {
          reject(new Error("Dominio no válido"));
        } else {
          resolve(true);
        }
      });
    });
  }*/
  
  export async function extractNumbers(str: string) {
    // Usamos una expresión regular para encontrar todos los dígitos en la cadena
    const numbers = str.match(/\d+/g);
    
    // Si hay números encontrados, los unimos en una cadena
    return numbers ? numbers.join('') : '';
  }
  