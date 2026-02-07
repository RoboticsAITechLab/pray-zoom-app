/**
 * Exam Mode Lockdown Feature - UI Layer Only.
 *
 * Utility functions for exam mode.
 */

/**
 * Checks if exam mode is enabled.
 *
 * @param {Object} state - The Redux state.
 * @returns {boolean} - True if exam mode is enabled.
 */
export function isExamModeEnabled(state: any): boolean {
    return state['features/examMode']?.enabled || false;
}

/**
 * Gets the current exam mode restrictions.
 *
 * @param {Object} state - The Redux state.
 * @returns {Object} - The exam mode restrictions.
 */
export function getExamModeRestrictions(state: any) {
    return state['features/examMode']?.restrictions || {};
}

/**
 * Gets the exam mode warning count.
 *
 * @param {Object} state - The Redux state.
 * @returns {number} - The warning count.
 */
export function getExamModeWarnings(state: any): number {
    return state['features/examMode']?.warnings || 0;
}

/**
 * Checks if the local participant can control exam mode.
 *
 * @param {Object} state - The Redux state.
 * @returns {boolean} - True if the local participant can control exam mode.
 */
export function canControlExamMode(state: any): boolean {
    const localParticipant = state['features/base/participants'].local;

    return localParticipant?.role === 'moderator' || localParticipant?.role === 'owner';
}
