/**
 * Custom feature scaffold – no logic yet.
 *
 * Middleware for the exam mode feature.
 * Currently passes all actions through without modification.
 */

import { AnyAction } from 'redux';

import { IStore } from '../app/types';
import MiddlewareRegistry from '../base/redux/MiddlewareRegistry';

/**
 * Middleware that handles exam mode restrictions.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register((_store: IStore) => (next: Function) => (action: AnyAction) => {
    // Placeholder middleware - passes actions through without modification
    // Future: Add exam mode restriction logic here

    return next(action);
});
