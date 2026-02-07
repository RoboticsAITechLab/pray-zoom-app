/**
 * Custom feature scaffold – no logic yet.
 *
 * Types for the prayer panel feature.
 */

/**
 * Prayer request entry.
 */
export interface IPrayerRequest {
    id: string;
    participantId: string;
    participantName?: string;
    request: string;
    status?: 'pending' | 'answered' | 'dismissed';
    timestamp: number;
}

/**
 * Prayer panel state interface.
 */
export interface IPrayerPanelState {
    isEnabled: boolean;
    isVisible: boolean;
    requests: IPrayerRequest[];
}
