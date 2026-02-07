/**
 * Common Room Mode Feature – UI Layer Only.
 *
 * Types for the room mode feature.
 */

/**
 * Enum for room modes.
 */
export enum RoomMode {
    EXAM = 'EXAM',
    MEET = 'MEET',
    PRAYER = 'PRAYER',
    STUDY = 'STUDY'
}

/**
 * Room mode state interface.
 */
export interface IRoomModeState {
    currentMode: RoomMode;
}
