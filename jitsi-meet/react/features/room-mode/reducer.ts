/**
 * Common Room Mode Feature – UI Layer Only.
 *
 * Reducer for the room mode feature.
 */

import { AnyAction } from 'redux';

import ReducerRegistry from '../base/redux/ReducerRegistry';

import { ROOM_MODE_SET_MODE } from './constants';
import { IRoomModeState, RoomMode } from './types';

export { IRoomModeState };

/**
 * Initial state for the room mode feature.
 */
export const DEFAULT_STATE: IRoomModeState = {
    currentMode: RoomMode.MEET
};

/**
 * Reduces the redux actions of the feature room-mode.
 */
ReducerRegistry.register<IRoomModeState>('features/roomMode', (state = DEFAULT_STATE, action: AnyAction): IRoomModeState => {
    switch (action.type) {
    case ROOM_MODE_SET_MODE:
        return {
            ...state,
            currentMode: action.mode
        };

    default:
        return state;
    }
});
