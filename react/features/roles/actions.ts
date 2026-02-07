/**
 * Temporary Role System – UI Layer Only.
 *
 * Action creators for the roles management feature.
 */

import { IStore } from '../app/types';

import {
    ROLES_ADD_CO_HOST,
    ROLES_ADD_HOST,
    ROLES_ADD_LEADER,
    ROLES_REMOVE_CO_HOST,
    ROLES_REMOVE_HOST,
    ROLES_REMOVE_LEADER,
    ROLES_SET_FOUNDER
} from './actionTypes';

/**
 * Sets the founder.
 *
 * @param {string} participantId - The participant ID to set as founder.
 * @returns {Object}
 */
export function setFounder(participantId: string) {
    return {
        type: ROLES_SET_FOUNDER,
        participantId
    };
}

/**
 * Adds a host.
 *
 * @param {string} participantId - The participant ID to add as host.
 * @returns {Object}
 */
export function addHost(participantId: string) {
    return {
        type: ROLES_ADD_HOST,
        participantId
    };
}

/**
 * Removes a host.
 *
 * @param {string} participantId - The participant ID to remove as host.
 * @returns {Object}
 */
export function removeHost(participantId: string) {
    return {
        type: ROLES_REMOVE_HOST,
        participantId
    };
}

/**
 * Adds a co-host.
 *
 * @param {string} participantId - The participant ID to add as co-host.
 * @returns {Object}
 */
export function addCoHost(participantId: string) {
    return {
        type: ROLES_ADD_CO_HOST,
        participantId
    };
}

/**
 * Removes a co-host.
 *
 * @param {string} participantId - The participant ID to remove as co-host.
 * @returns {Object}
 */
export function removeCoHost(participantId: string) {
    return {
        type: ROLES_REMOVE_CO_HOST,
        participantId
    };
}

/**
 * Adds a leader.
 *
 * @param {string} participantId - The participant ID to add as leader.
 * @returns {Object}
 */
export function addLeader(participantId: string) {
    return {
        type: ROLES_ADD_LEADER,
        participantId
    };
}

/**
 * Removes a leader.
 *
 * @param {string} participantId - The participant ID to remove as leader.
 * @returns {Object}
 */
export function removeLeader(participantId: string) {
    return {
        type: ROLES_REMOVE_LEADER,
        participantId
    };
}
