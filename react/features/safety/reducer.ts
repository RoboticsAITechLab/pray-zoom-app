/**
 * Safety & Fail-Safe Layer - UI Protection Only.
 *
 * Reducer for the safety feature.
 */

import { AnyAction } from 'redux';

import ReducerRegistry from '../base/redux/ReducerRegistry';

import {
    SAFETY_SET_DB_FALLBACK_USED,
    SAFETY_SET_LAST_MODE_CHANGE,
    SAFETY_SET_LAST_ROLE_CHANGE
} from './actionTypes';
import { ISafetyState } from './types';

/**
 * Initial state for the safety feature.
 */
export const DEFAULT_STATE: ISafetyState = {
    lastRoleChangeTime: 0,
    lastModeChangeTime: 0,
    dbFallbackUsed: false
};

/**
 * Reduces the redux actions of the safety feature.
 */
ReducerRegistry.register<ISafetyState>('features/safety', (state = DEFAULT_STATE, action: AnyAction): ISafetyState => {
    switch (action.type) {
    case SAFETY_SET_LAST_ROLE_CHANGE:
        return {
            ...state,
            lastRoleChangeTime: action.timestamp
        };

    case SAFETY_SET_LAST_MODE_CHANGE:
        return {
            ...state,
            lastModeChangeTime: action.timestamp
        };

    case SAFETY_SET_DB_FALLBACK_USED:
        return {
            ...state,
            dbFallbackUsed: action.used
        };

    default:
        return state;
    }
});