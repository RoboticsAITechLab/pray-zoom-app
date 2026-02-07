/**
 * Custom feature scaffold – no logic yet.
 *
 * Middleware for the room links management feature.
 * Currently passes all actions through without modification.
 */

import { AnyAction } from 'redux';

import { IStore } from '../app/types';
import MiddlewareRegistry from '../base/redux/MiddlewareRegistry';

/**
 * Middleware that handles room links actions.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register((store: IStore) => (next: Function) => (action: AnyAction) => {
    // Placeholder middleware - passes actions through without modification
    // Future: Add room link management logic here

    return next(action);
});
