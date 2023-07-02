const { normalizeInput, getCaretOffset, validateInput } = require('./app');

describe('normalizeInput', () => {
  it('should return an empty string for an empty value', () => {
    expect(normalizeInput('', '')).toBe('');
  });

  it('should correctly normalize a valid value', () => {
    expect(normalizeInput('5551234567', '')).toBe('(555) 123-4567');
  });

  it('should remove special characters and normalize the value', () => {
    expect(normalizeInput('5-5_5 1(23)456 7', '')).toBe('(555) 123-4567');
  });

  it('should keep the normalized digits when removing characters', () => {
    expect(normalizeInput('(555) 123-', '(555) 123-4567')).toBe('(555) 123');
  });
});

describe('getCaretOffset', () => {
  it('should adjust the caret when removing digits at the end', () => {
    expect(getCaretOffset('(555) 123-45', '(555) 123-4567', 11)).toBe(10);
  });

  it('should adjust the caret when removing digits from the middle', () => {
    expect(getCaretOffset('(555) 1234-', '(555) 123-4567', 9)).toBe(10);
  });

  it('should not adjust the caret when removing digits at the beginning', () => {
    expect(getCaretOffset('(555) 123-456', '(555) 123-4567', 5)).toBe(5);
  });

  it('should keep the caret position when removing digits from the middle', () => {
    expect(getCaretOffset('(555) 1-456', '(555) 123-4567', 6)).toBe(6);
  });
});

describe('validateInput', () => {
  it('should return an error message for an empty value', () => {
    expect(validateInput('')).toBe('Phone number is required!');
  });

  it('should return an empty string for a valid phone number', () => {
    expect(validateInput('(555) 123-4567')).toBe('');
  });

  it('should return an error message for an invalid phone number', () => {
    expect(validateInput('(555) 1234-567')).toBe('Invalid phone number format. Example: (555) 555-5555');
  });
});
