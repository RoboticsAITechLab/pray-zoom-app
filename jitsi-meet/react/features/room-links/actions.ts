/**
 * Custom feature scaffold – no logic yet.
 *
 * Action creators for the room links management feature.
 */

import { IStore } from '../app/types';

import {
    ROOM_LINKS_ADD_LINK,
    ROOM_LINKS_REMOVE_LINK,
    ROOM_LINKS_SET_ACTIVE,
    ROOM_LINKS_START_MANAGING,
    ROOM_LINKS_STOP_MANAGING,
    ROOM_LINKS_UPDATE_LINK
} from './actionTypes';
import { IRoomLink } from './types';

/**
 * Adds a room link.
 *
 * @param {IRoomLink} link - The room link to add.
 * @returns {Function}
 */
export function addRoomLink(link: IRoomLink) {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: ROOM_LINKS_ADD_LINK,
            link
        });
    };
}

/**
 * Removes a room link.
 *
 * @param {string} linkId - The link ID to remove.
 * @returns {Function}
 */
export function removeRoomLink(linkId: string) {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: ROOM_LINKS_REMOVE_LINK,
            linkId
        });
    };
}

/**
 * Updates a room link.
 *
 * @param {string} linkId - The link ID to update.
 * @param {Partial<IRoomLink>} updates - The updates to apply.
 * @returns {Function}
 */
export function updateRoomLink(linkId: string, updates: Partial<IRoomLink>) {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: ROOM_LINKS_UPDATE_LINK,
            linkId,
            updates
        });
    };
}

/**
 * Sets the active room link.
 *
 * @param {string} linkId - The link ID to set as active.
 * @returns {Function}
 */
export function setActiveRoomLink(linkId: string) {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: ROOM_LINKS_SET_ACTIVE,
            linkId
        });
    };
}

/**
 * Starts managing room links.
 *
 * @returns {Function}
 */
export function startManagingRoomLinks() {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: ROOM_LINKS_START_MANAGING
        });
    };
}

/**
 * Stops managing room links.
 *
 * @returns {Function}
 */
export function stopManagingRoomLinks() {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: ROOM_LINKS_STOP_MANAGING
        });
    };
}
