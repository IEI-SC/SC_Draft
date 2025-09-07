// This file contained TypeScript-specific syntax that cannot be directly converted to JSX
// Since JSX doesn't support interfaces or enums, we need to remove them
// Alternatively, we can use JSDoc comments for type documentation in JavaScript

/**
 * @typedef {Object} TeamMember
 * @property {number} id
 * @property {string} name
 * @property {string} role
 * @property {string} imageUrl
 */

/**
 * @typedef {Object} Event
 * @property {number} id
 * @property {string} title
 * @property {string} date
 * @property {string} description
 * @property {string} imageUrl
 */

// Team categories as string constants instead of enum
export const TeamCategory = {
  FACULTY: 'Faculty Coordinators',
  STUDENT: 'Student Members'
};

// Note: In JavaScript, we lose the type safety of TypeScript interfaces
// The JSDoc comments above provide documentation but aren't enforced