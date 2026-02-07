/**
 * Types for the attendance tracking feature.
 */

/**
 * Attendance entry for a participant.
 */
export interface IAttendanceEntry {
    duration?: number;
    joinTime?: number;
    leaveTime?: number;
    mode?: string;
    participantId: string;
    participantName?: string;
}

/**
 * Attendance state interface.
 */
export interface IAttendanceState {
    entries: IAttendanceEntry[];
    isPanelOpen: boolean;
    isTracking: boolean;
}
