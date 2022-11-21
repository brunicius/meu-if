import "colors";

const PREFIXES = {
  log: "[*]".blue,
  warn: "[!]".yellow,
  error: "[!!]".red,
  success: "[✓]".green,
};

function parseArguments(args: string[]) {
  let result = "";
  for (let i = 0; i <= args.length; i++) {
    if (i === 0) {
      result += `${args[i]}`;
      continue;
    }
    result += ` | ${args[i]}`;
  }
  return result;
}

export const clear = () => console.clear();

export const log = (message: string) =>
  console.log(`${PREFIXES.log} ${message}`.reset);

export const success = (message: string) =>
  console.log(`${PREFIXES.success} ${message}`.reset);

export const error = (message: string) =>
  console.log(`${PREFIXES.error} ${message}`);

export const warn = (message: string) => {
  console.log(`${PREFIXES.warn} ${message}`);
};

