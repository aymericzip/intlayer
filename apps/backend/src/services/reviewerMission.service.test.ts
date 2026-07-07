import { describe, expect, it } from 'vitest';
import { canUpdateMissionStatus } from './reviewerMission.service';

describe('canUpdateMissionStatus', () => {
  describe('reviewer transitions', () => {
    it('lets a reviewer accept or decline a pending mission', () => {
      expect(canUpdateMissionStatus('reviewer', 'pending', 'accepted')).toBe(
        true
      );
      expect(canUpdateMissionStatus('reviewer', 'pending', 'canceled')).toBe(
        true
      );
    });

    it('lets a reviewer progress an accepted mission through the workflow', () => {
      expect(
        canUpdateMissionStatus('reviewer', 'accepted', 'in_progress')
      ).toBe(true);
      expect(
        canUpdateMissionStatus('reviewer', 'in_progress', 'reviewer_review')
      ).toBe(true);
      expect(
        canUpdateMissionStatus('reviewer', 'reviewer_review', 'client_review')
      ).toBe(true);
    });

    it('forbids a reviewer from completing a mission themselves', () => {
      expect(
        canUpdateMissionStatus('reviewer', 'client_review', 'completed')
      ).toBe(false);
    });

    it('forbids a reviewer from re-opening a completed mission (stat inflation)', () => {
      expect(
        canUpdateMissionStatus('reviewer', 'completed', 'in_progress')
      ).toBe(false);
      expect(
        canUpdateMissionStatus('reviewer', 'completed', 'reviewer_review')
      ).toBe(false);
    });

    it('forbids skipping steps', () => {
      expect(canUpdateMissionStatus('reviewer', 'pending', 'completed')).toBe(
        false
      );
      expect(
        canUpdateMissionStatus('reviewer', 'accepted', 'reviewer_review')
      ).toBe(false);
    });
  });

  describe('client transitions', () => {
    it('lets a client approve or request changes during client review', () => {
      expect(
        canUpdateMissionStatus('client', 'client_review', 'completed')
      ).toBe(true);
      expect(
        canUpdateMissionStatus('client', 'client_review', 'reviewer_review')
      ).toBe(true);
    });

    it('lets a client cancel a not-yet-started mission', () => {
      expect(canUpdateMissionStatus('client', 'pending', 'canceled')).toBe(
        true
      );
      expect(canUpdateMissionStatus('client', 'accepted', 'canceled')).toBe(
        true
      );
    });

    it('forbids a client from driving the reviewer-side workflow', () => {
      expect(canUpdateMissionStatus('client', 'accepted', 'in_progress')).toBe(
        false
      );
      expect(canUpdateMissionStatus('client', 'pending', 'accepted')).toBe(
        false
      );
      expect(
        canUpdateMissionStatus('client', 'in_progress', 'reviewer_review')
      ).toBe(false);
    });

    it('forbids a client from completing a mission before client review', () => {
      expect(canUpdateMissionStatus('client', 'in_progress', 'completed')).toBe(
        false
      );
    });
  });

  it('rejects transitions from terminal states', () => {
    expect(canUpdateMissionStatus('client', 'completed', 'in_progress')).toBe(
      false
    );
    expect(canUpdateMissionStatus('reviewer', 'canceled', 'accepted')).toBe(
      false
    );
  });
});
