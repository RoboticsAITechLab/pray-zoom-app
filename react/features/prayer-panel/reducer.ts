/**
 * Custom feature scaffold – no logic yet.
 *
 * Reducer for the prayer panel feature.
 */

import { AnyAction } from 'redux';

import ReducerRegistry from '../base/redux/ReducerRegistry';

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

export interface IPrayerPanelState {
    isEnabled: boolean;
    isVisible: boolean;
    requests: IPrayerRequest[];
}

/**
 * Initial state for the prayer panel feature.
 */
export const DEFAULT_STATE: IPrayerPanelState = {
    requests: [],
    isVisible: false,
    isEnabled: false
};

/**
 * Reduces the redux actions of the feature prayer-panel.
 */
ReducerRegistry.register<IPrayerPanelState>('features/prayerPanel', (state = DEFAULT_STATE, action: AnyAction): IPrayerPanelState => {
    switch (action.type) {
    case PRAYER_PANEL_ENABLE:
        return {
            ...state,
            isEnabled: true
        };

    case PRAYER_PANEL_DISABLE:
        return {
            ...state,
            isEnabled: false,
            isVisible: false
        };

    case PRAYER_PANEL_SHOW:
        return {
            ...state,
            isVisible: true
        };

    case PRAYER_PANEL_HIDE:
        return {
            ...state,
            isVisible: false
        };

    case PRAYER_PANEL_ADD_REQUEST:
        return {
            ...state,
            requests: [ ...state.requests, action.request ]
        };

    case PRAYER_PANEL_REMOVE_REQUEST: {
        const requests = state.requests.filter((req: IPrayerRequest) => req.id !== action.requestId);

        return {
            ...state,
            requests
        };
    }

    case PRAYER_PANEL_UPDATE_REQUEST: {
        const requests = state.requests.map((req: IPrayerRequest) =>
            req.id === action.requestId
                ? { ...req, ...action.updates }
                : req
        );

        return {
            ...state,
            requests
        };
    }

    default:
        return state;
    }
});
