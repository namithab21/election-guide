import { describe, it, expect } from 'vitest';
import { validatePinCode, getVoterCategory, calculateElectionPhase } from '../src/lib/logic';

describe('CivicPulse Core Logic Suite', () => {
  describe('Voter Eligibility Functions', () => {
    it('should validate PIN codes based on regional mapping', () => {
      expect(validatePinCode('110001', 'Delhi')).toBe(true);
      expect(validatePinCode('400001', 'Maharashtra')).toBe(true);
      expect(validatePinCode('110001', 'Karnataka')).toBe(false);
      expect(validatePinCode('560001', 'Karnataka')).toBe(true);
    });

    it('should classify voters based on age and legal status', () => {
      expect(getVoterCategory(25, true)).toBe('General Elector');
      expect(getVoterCategory(17, true)).toBe('Future Voter (Pre-registration available at 17)');
      expect(getVoterCategory(25, false)).toBe('Non-Eligible (Citizenship Required)');
    });
  });

  describe('Election Timeline Logic', () => {
    it('should correctly identify critical phases based on date proximity', () => {
      const farDate = new Date('2028-01-01');
      const nearDate = new Date('2029-05-01');
      const immediateDate = new Date('2029-05-14');
      
      expect(calculateElectionPhase(farDate)).toBe('Standard Preparation Phase');
      expect(calculateElectionPhase(nearDate)).toBe('Critical: Phase 1 Commences');
      expect(calculateElectionPhase(immediateDate)).toBe('Critical: Phase 1 Commences');
    });

    it('should handle post-election dates', () => {
      const futureDate = new Date('2030-01-01');
      expect(calculateElectionPhase(futureDate)).toBe('Post-Election');
    });
  });
});
