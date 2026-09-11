import { describe, expect, it } from 'vitest';
import { cx } from '../utils/cx';

describe('cx', () => {
  it('склеивает строки через пробел', () => {
    expect(cx('a', 'b', 'c')).toBe('a b c');
  });

  it('отбрасывает false, null, undefined и пустые строки', () => {
    expect(cx('a', false, null, undefined, '', 'b')).toBe('a b');
  });

  it('возвращает пустую строку без аргументов', () => {
    expect(cx()).toBe('');
  });

  it('возвращает пустую строку, если все аргументы ложные', () => {
    expect(cx(false, null, undefined, '')).toBe('');
  });

  it('возвращает единственный класс без изменений', () => {
    expect(cx('only')).toBe('only');
  });

  it('сохраняет порядок аргументов', () => {
    expect(cx('z', 'a', 'm')).toBe('z a m');
  });
});
