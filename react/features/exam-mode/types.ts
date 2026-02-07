/**
 * Custom feature scaffold – no logic yet.
 *
 * Types for the exam mode feature.
 */

/**
 * Exam mode restrictions configuration.
 */
export interface IExamModeRestrictions {
    disableChat?: boolean;
    disableFileShare?: boolean;
    disableInvite?: boolean;
    disableLeave?: boolean;
    disableMute?: boolean;
    disableScreenShare?: boolean;
    disableSettings?: boolean;
    disableVideo?: boolean;
}

/**
 * Exam mode state interface.
 */
export interface IExamModeState {
    duration?: number;
    enabled: boolean;
    endTime?: number;
    restrictions: IExamModeRestrictions;
    startTime?: number;
    timer: number | null;
    warnings: number;
}
