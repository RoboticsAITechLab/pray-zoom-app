/**
 * Action creators for the attendance tracking feature.
 */

import { IStore } from '../app/types';

import {
    ATTENDANCE_ADD_ENTRY,
    ATTENDANCE_CLOSE_PANEL,
    ATTENDANCE_OPEN_PANEL,
    ATTENDANCE_START_TRACKING,
    ATTENDANCE_STOP_TRACKING,
    ATTENDANCE_UPDATE_ENTRY
} from './actionTypes';
import { IAttendanceEntry } from './types';

/**
 * Starts attendance tracking.
 *
 * @returns {Function}
 */
export function startAttendanceTracking() {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: ATTENDANCE_START_TRACKING
        });
    };
}

/**
 * Stops attendance tracking.
 *
 * @returns {Function}
 */
export function stopAttendanceTracking() {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: ATTENDANCE_STOP_TRACKING
        });
    };
}

/**
 * Adds an attendance entry.
 *
 * @param {IAttendanceEntry} entry - The attendance entry to add.
 * @returns {Function}
 */
export function addAttendanceEntry(entry: IAttendanceEntry) {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: ATTENDANCE_ADD_ENTRY,
            entry
        });
    };
}

/**
 * Updates an attendance entry.
 *
 * @param {string} participantId - The participant ID.
 * @param {Partial<IAttendanceEntry>} updates - The updates to apply.
 * @returns {Function}
 */
export function updateAttendanceEntry(participantId: string, updates: Partial<IAttendanceEntry>) {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: ATTENDANCE_UPDATE_ENTRY,
            participantId,
            updates
        });
    };
}

/**
 * Opens the attendance panel.
 *
 * @returns {Function}
 */
export function openAttendancePanel() {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: ATTENDANCE_OPEN_PANEL
        });
    };
}

/**
 * Closes the attendance panel.
 *
 * @returns {Function}
 */
export function closeAttendancePanel() {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: ATTENDANCE_CLOSE_PANEL
        });
    };
}
