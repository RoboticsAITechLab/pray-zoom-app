/**
 * Custom feature scaffold – no logic yet.
 *
 * Action creators for the prayer panel feature.
 */

import { IStore } from '../app/types';

import {
    PRAYER_PANEL_ADD_REQUEST,
    PRAYER_PANEL_DISABLE,
    PRAYER_PANEL_ENABLE,
    PRAYER_PANEL_HIDE,
    PRAYER_PANEL_REMOVE_REQUEST,
    PRAYER_PANEL_SHOW,
    PRAYER_PANEL_UPDATE_REQUEST
} from './actionTypes';
import { IPrayerRequest } from './types';

/**
 * Enables the prayer panel feature.
 *
 * @returns {Function}
 */
export function enablePrayerPanel() {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: PRAYER_PANEL_ENABLE
        });
    };
}

/**
 * Disables the prayer panel feature.
 *
 * @returns {Function}
 */
export function disablePrayerPanel() {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: PRAYER_PANEL_DISABLE
        });
    };
}

/**
 * Shows the prayer panel.
 *
 * @returns {Function}
 */
export function showPrayerPanel() {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: PRAYER_PANEL_SHOW
        });
    };
}

/**
 * Hides the prayer panel.
 *
 * @returns {Function}
 */
export function hidePrayerPanel() {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: PRAYER_PANEL_HIDE
        });
    };
}

/**
 * Adds a prayer request.
 *
 * @param {IPrayerRequest} request - The prayer request to add.
 * @returns {Function}
 */
export function addPrayerRequest(request: IPrayerRequest) {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: PRAYER_PANEL_ADD_REQUEST,
            request
        });
    };
}

/**
 * Removes a prayer request.
 *
 * @param {string} requestId - The request ID to remove.
 * @returns {Function}
 */
export function removePrayerRequest(requestId: string) {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: PRAYER_PANEL_REMOVE_REQUEST,
            requestId
        });
    };
}

/**
 * Updates a prayer request.
 *
 * @param {string} requestId - The request ID to update.
 * @param {Partial<IPrayerRequest>} updates - The updates to apply.
 * @returns {Function}
 */
export function updatePrayerRequest(requestId: string, updates: Partial<IPrayerRequest>) {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: PRAYER_PANEL_UPDATE_REQUEST,
            requestId,
            updates
        });
    };
}
