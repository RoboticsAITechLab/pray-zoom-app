/**
 * Common Room Mode Feature – UI Layer Only.
 *
 * Middleware for the room mode feature.
 * Passes all actions through without modification.
 */

import { AnyAction } from 'redux';

import { IStore } from '../app/types';
import MiddlewareRegistry from '../base/redux/MiddlewareRegistry';

/**
 * Middleware that handles room-mode-related actions.
 *
 * @param {IStore} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register((_store: IStore) => (next: Function) => (action: AnyAction) => {
    // Pass actions through without modification
    return next(action);
});
