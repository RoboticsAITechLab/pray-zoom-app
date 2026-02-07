/**
 * Temporary Role System – UI Layer Only.
 *
 * Utility functions for roles.
 */

import { IReduxState } from '../app/types';
import { getLocalParticipant } from '../base/participants/functions';

/**
 * Gets the role of a participant.
 *
 * @param {IReduxState} state - The redux state.
 * @param {string} participantId - The participant ID.
 * @returns {string} The role.
 */
export function getParticipantRole(state: IReduxState, participantId: string): string {
    const rolesState = (state as any)['features/roles'];

    if (rolesState.founderId === participantId) {
        return 'FOUNDER';
    }
    if (rolesState.hosts.includes(participantId)) {
        return 'HOST';
    }
    if (rolesState.coHosts.includes(participantId)) {
        return 'CO_HOST';
    }
    if (rolesState.leaders.includes(participantId)) {
        return 'LEADER';
    }

    return 'PARTICIPANT';
}

/**
 * Checks if the local participant has a certain role or higher.
 *
 * @param {IReduxState} state - The redux state.
 * @param {string} role - The role to check.
 * @returns {boolean}
 */
export function hasRoleOrHigher(state: IReduxState, role: string): boolean {
    const localParticipant = getLocalParticipant(state);

    if (!localParticipant) {
        return false;
    }
    const localRole = getParticipantRole(state, localParticipant.id);

    const roleHierarchy = [ 'PARTICIPANT', 'LEADER', 'CO_HOST', 'HOST', 'FOUNDER' ];
    const localIndex = roleHierarchy.indexOf(localRole);
    const requiredIndex = roleHierarchy.indexOf(role);

    return localIndex >= requiredIndex;
}
