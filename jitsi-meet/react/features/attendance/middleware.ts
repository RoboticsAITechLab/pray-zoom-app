/**
 * Middleware for the attendance tracking feature.
 * Tracks participant join/leave events and maintains attendance records.
 */

import { AnyAction } from 'redux';

import { IStore } from '../app/types';
import { CONFERENCE_JOINED, CONFERENCE_LEFT } from '../base/conference/actionTypes';
import { PARTICIPANT_JOINED, PARTICIPANT_LEFT } from '../base/participants/actionTypes';
import MiddlewareRegistry from '../base/redux/MiddlewareRegistry';

import { addAttendanceEntry, startAttendanceTracking, stopAttendanceTracking, updateAttendanceEntry } from './actions';
import attendanceService from './service';

/**
 * Middleware that handles attendance tracking.
 *
 * @param {IStore} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register((store: IStore) => (next: Function) => (action: AnyAction) => {
    switch (action.type) {
    case CONFERENCE_JOINED:
        // Start attendance tracking when conference is joined
        store.dispatch(startAttendanceTracking());

        // Initialize attendance service with Neon config if available
        const state = store.getState();
        const config = state['features/base/config'];

        if (config.attendanceService?.neonUrl && config.attendanceService?.apiKey) {
            attendanceService.initialize(config.attendanceService.neonUrl, config.attendanceService.apiKey);
        }
        break;

    case CONFERENCE_LEFT:
        // Stop attendance tracking when conference is left
        store.dispatch(stopAttendanceTracking());
        break;

    case PARTICIPANT_JOINED: {
        const { participant } = action;
        const attendanceState = store.getState()['features/attendance'];

        // Only track if attendance tracking is active
        if (attendanceState.isTracking) {
            // Add entry with join time
            store.dispatch(addAttendanceEntry({
                participantId: participant.id,
                participantName: participant.name,
                joinTime: Date.now(),
                leaveTime: undefined,
                duration: undefined
            }));

            // Store to Neon if service is initialized
            if (attendanceService) {
                const conferenceState = store.getState()['features/base/conference'];

                const record = {
                    roomId: conferenceState.room || 'unknown',
                    participantId: participant.id,
                    participantName: participant.name,
                    joinTime: Date.now(),
                    mode: 'MEET'
                };

                // Store asynchronously - don't block the main flow
                attendanceService.storeAttendanceRecord(record).catch(error => {
                    console.warn('Failed to store attendance record to Neon:', error);
                });
            }
        }
        break;
    }

    case PARTICIPANT_LEFT: {
        const { participant } = action;
        const attendanceState = store.getState()['features/attendance'];

        // Only track if attendance tracking is active
        if (attendanceState.isTracking) {
            // Find existing entry and update with leave time
            const existingEntry = attendanceState.entries.find(
                entry => entry.participantId === participant.id && !entry.leaveTime
            );

            if (existingEntry) {
                const leaveTime = Date.now();
                const duration = leaveTime - (existingEntry.joinTime || 0);

                store.dispatch(updateAttendanceEntry(participant.id, {
                    leaveTime,
                    duration
                }));

                // Update Neon record if service is initialized
                if (attendanceService) {
                    const conferenceState = store.getState()['features/base/conference'];

                    const record = {
                        roomId: conferenceState.room || 'unknown',
                        participantId: participant.id,
                        participantName: existingEntry.participantName,
                        joinTime: existingEntry.joinTime || 0,
                        leaveTime,
                        duration,
                        mode: 'MEET'
                    };

                    // Store asynchronously - don't block the main flow
                    attendanceService.storeAttendanceRecord(record).catch(error => {
                        console.warn('Failed to update attendance record in Neon:', error);
                    });
                }
            }
        }
        break;
    }
    }

    return next(action);
});
