import { createRequire } from 'node:module';
import { describe, expect, test } from 'vitest';
import { BUSINESS_TYPES, getBusinessType } from './businessTypes';
import { TEMPLATES_BY_TYPE } from './templates';

const require = createRequire(import.meta.url);
const BACKEND_TYPES = require('../../../backend/config/businessTypes.js');

// These guard against the registry, the templates and the backend drifting apart
describe('business type registry', () => {
  test('matches the backend list exactly', () => {
    expect(BUSINESS_TYPES.map((type) => type.id)).toEqual(BACKEND_TYPES);
  });

  test('every type has a template set and every template set has a type', () => {
    expect(Object.keys(TEMPLATES_BY_TYPE).sort()).toEqual(BACKEND_TYPES.slice().sort());
  });

  test.each(BUSINESS_TYPES)('$id is complete', (type) => {
    expect(type.name).toBeTruthy();
    expect(type.dashboardTitle).toBeTruthy();
    expect(type.description).toBeTruthy();
    expect(type.icon).toBeTruthy();
    expect(type.statLabels).toHaveLength(4);
    expect(type.quickActions).toHaveLength(2);
    type.quickActions.forEach((action) => {
      expect(action.label).toBeTruthy();
      expect(action.path).toMatch(/^\//);
    });
    expect(type.recentActivity).toHaveLength(4);
    type.recentActivity.forEach((entry) => expect(typeof entry).toBe('string'));
    expect(type.templates.length).toBeGreaterThan(0);
    type.templates.forEach((template) => {
      expect(template.name && template.subject && template.body && template.timing).toBeTruthy();
    });
  });

  test('getBusinessType returns undefined for unknown ids', () => {
    expect(getBusinessType('nope')).toBeUndefined();
    expect(getBusinessType(null)).toBeUndefined();
  });
});
