/**
 * Temporary Role System – UI Layer Only.
 *
 * Middleware for the roles management feature.
 * Listens for participant join events to assign founder if none exists.
 */

import { AnyAction } from 'redux';

import { IStore } from '../app/types';
import { PARTICIPANT_JOINED } from '../base/participants/actionTypes';
import MiddlewareRegistry from '../base/redux/MiddlewareRegistry';

import { setFounder } from './actions';

/**
 * Middleware that handles role-based permissions.
 *
 * @param {IStore} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register((store: IStore) => (next: Function) => (action: AnyAction) => {
    if (action.type === PARTICIPANT_JOINED) {
        const state = store.getState();
        const rolesState = (state as any)['features/roles'];

        // If no founder exists, set the first joiner as founder
        if (!rolesState.founderId) {
            store.dispatch(setFounder(action.participant.id));
        }
    }

    return next(action);
});
