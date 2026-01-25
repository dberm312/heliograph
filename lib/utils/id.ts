// ID generation utilities for Heliograph

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateId(prefix: string, length: number = 12): string {
  let result = prefix;
  for (let i = 0; i < length; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return result;
}

export const generateHeliogramId = () => generateId("hg_", 12);
export const generateResponseId = () => generateId("resp_", 12);
export const generateQuestionId = () => generateId("q_", 8);
