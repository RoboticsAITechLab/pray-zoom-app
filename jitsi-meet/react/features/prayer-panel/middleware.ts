/**
 * Custom feature scaffold – no logic yet.
 *
 * Middleware for the prayer panel feature.
 * Currently passes all actions through without modification.
 */

import { AnyAction } from 'redux';

import { IStore } from '../app/types';
import MiddlewareRegistry from '../base/redux/MiddlewareRegistry';

/**
 * Middleware that handles prayer panel actions.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register((store: IStore) => (next: Function) => (action: AnyAction) => {
    // Placeholder middleware - passes actions through without modification
    // Future: Add prayer request handling logic here

    return next(action);
});
