/**
 * Temporary Role System – UI Layer Only.
 *
 * Reducer for the roles management feature.
 */

import { AnyAction } from 'redux';

import ReducerRegistry from '../base/redux/ReducerRegistry';

import {
    ROLES_ADD_CO_HOST,
    ROLES_ADD_HOST,
    ROLES_ADD_LEADER,
    ROLES_REMOVE_CO_HOST,
    ROLES_REMOVE_HOST,
    ROLES_REMOVE_LEADER,
    ROLES_SET_FOUNDER
} from './actionTypes';
import { IRolesState } from './types';

export { IRolesState };

/**
 * Initial state for the roles feature.
 */
export const DEFAULT_STATE: IRolesState = {
    founderId: null,
    hosts: [],
    coHosts: [],
    leaders: []
};

/**
 * Reduces the redux actions of the feature roles.
 */
ReducerRegistry.register<IRolesState>('features/roles', (state = DEFAULT_STATE, action: AnyAction): IRolesState => {
    switch (action.type) {
    case ROLES_SET_FOUNDER:
        return {
            ...state,
            founderId: action.participantId
        };

    case ROLES_ADD_HOST:
        return {
            ...state,
            hosts: [ ...state.hosts, action.participantId ]
        };

    case ROLES_REMOVE_HOST:
        return {
            ...state,
            hosts: state.hosts.filter(id => id !== action.participantId)
        };

    case ROLES_ADD_CO_HOST:
        return {
            ...state,
            coHosts: [ ...state.coHosts, action.participantId ]
        };

    case ROLES_REMOVE_CO_HOST:
        return {
            ...state,
            coHosts: state.coHosts.filter(id => id !== action.participantId)
        };

    case ROLES_ADD_LEADER:
        return {
            ...state,
            leaders: [ ...state.leaders, action.participantId ]
        };

    case ROLES_REMOVE_LEADER:
        return {
            ...state,
            leaders: state.leaders.filter(id => id !== action.participantId)
        };

    default:
        return state;
    }
});
