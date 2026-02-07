/**
 * Common Room Mode Feature – UI Layer Only.
 *
 * Action creators for the room mode feature.
 */

import { ROOM_MODE_SET_MODE } from './constants';
import { RoomMode } from './types';

/**
 * Sets the current room mode.
 *
 * @param {RoomMode} mode - The mode to set.
 * @returns {Object}
 */
export function setRoomMode(mode: RoomMode) {
    return {
        type: ROOM_MODE_SET_MODE,
        mode
    };
}
