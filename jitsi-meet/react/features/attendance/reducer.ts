/**
 * Reducer for the attendance tracking feature.
 */

import { AnyAction } from 'redux';

import ReducerRegistry from '../base/redux/ReducerRegistry';

import {
    ATTENDANCE_ADD_ENTRY,
    ATTENDANCE_CLOSE_PANEL,
    ATTENDANCE_OPEN_PANEL,
    ATTENDANCE_START_TRACKING,
    ATTENDANCE_STOP_TRACKING,
    ATTENDANCE_UPDATE_ENTRY
} from './actionTypes';
import { IAttendanceEntry } from './types';

export interface IAttendanceState {
    entries: IAttendanceEntry[];
    isPanelOpen: boolean;
    isTracking: boolean;
}

/**
 * Initial state for the attendance feature.
 */
export const DEFAULT_STATE: IAttendanceState = {
    entries: [],
    isTracking: false,
    isPanelOpen: false
};

/**
 * Reduces the redux actions of the feature attendance.
 */
ReducerRegistry.register<IAttendanceState>('features/attendance', (state = DEFAULT_STATE, action: AnyAction): IAttendanceState => {
    switch (action.type) {
    case ATTENDANCE_START_TRACKING:
        return {
            ...state,
            isTracking: true
        };

    case ATTENDANCE_STOP_TRACKING:
        return {
            ...state,
            isTracking: false
        };

    case ATTENDANCE_ADD_ENTRY:
        return {
            ...state,
            entries: [ ...state.entries, action.entry ]
        };

    case ATTENDANCE_UPDATE_ENTRY: {
        const { participantId, updates } = action;
        const entries = state.entries.map((entry: IAttendanceEntry) =>
            entry.participantId === participantId
                ? { ...entry, ...updates }
                : entry
        );

        return {
            ...state,
            entries
        };
    }

    case ATTENDANCE_OPEN_PANEL:
        return {
            ...state,
            isPanelOpen: true
        };

    case ATTENDANCE_CLOSE_PANEL:
        return {
            ...state,
            isPanelOpen: false
        };

    default:
        return state;
    }
});
