export const cx = (...args: Array<string | false | null | undefined>): string =>
  args.filter(Boolean).join(' ');
