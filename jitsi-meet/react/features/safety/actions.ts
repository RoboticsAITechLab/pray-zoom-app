/**
 * Safety & Fail-Safe Layer - UI Protection Only.
 *
 * Action creators for the safety feature.
 */

import {
    SAFETY_SET_DB_FALLBACK_USED,
    SAFETY_SET_LAST_MODE_CHANGE,
    SAFETY_SET_LAST_ROLE_CHANGE
} from './actionTypes';

/**
 * Sets the timestamp of the last role change.
 *
 * @param {number} timestamp - The timestamp when the role change occurred.
 * @returns {Object}
 */
export function setLastRoleChangeTime(timestamp: number) {
    return {
        type: SAFETY_SET_LAST_ROLE_CHANGE,
        timestamp
    };
}

/**
 * Sets the timestamp of the last mode change.
 *
 * @param {number} timestamp - The timestamp when the mode change occurred.
 * @returns {Object}
 */
export function setLastModeChangeTime(timestamp: number) {
    return {
        type: SAFETY_SET_LAST_MODE_CHANGE,
        timestamp
    };
}

/**
 * Sets whether DB fallback was used.
 *
 * @param {boolean} used - Whether fallback was used.
 * @returns {Object}
 */
export function setDbFallbackUsed(used: boolean) {
    return {
        type: SAFETY_SET_DB_FALLBACK_USED,
        used
    };
}