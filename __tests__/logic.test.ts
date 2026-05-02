import { describe, it, expect } from 'vitest';
import { validatePinCode, getVoterCategory } from '../src/lib/logic';

describe('Voter Logic Decision Tree', () => {
  it('should validate PIN codes correctly based on state zones', () => {
    expect(validatePinCode('110001', 'Delhi')).toBe(true);
    expect(validatePinCode('400001', 'Maharashtra')).toBe(true);
    expect(validatePinCode('560001', 'Karnataka')).toBe(true);
    expect(validatePinCode('110001', 'Karnataka')).toBe(false);
  });

  it('should determine voter category correctly based on age and citizenship', () => {
    expect(getVoterCategory(25, true)).toBe('General Elector');
    expect(getVoterCategory(16, true)).toBe('Future Voter (Pre-registration available at 17)');
    expect(getVoterCategory(25, false)).toBe('Non-Eligible (Citizenship Required)');
  });
});
