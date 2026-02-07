/**
 * Safety & Fail-Safe Layer - UI Protection Only.
 *
 * Types for the safety feature.
 */

/**
 * Safety state interface.
 */
export interface ISafetyState {
    dbFallbackUsed: boolean;
    lastModeChangeTime: number;
    lastRoleChangeTime: number;
}