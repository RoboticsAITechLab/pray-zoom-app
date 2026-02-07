/**
 * Safety & Fail-Safe Layer - UI Protection Only.
 *
 * Middleware for the safety feature.
 * Intercepts high-risk actions and adds protection layers.
 */

import { AnyAction } from 'redux';

import { IStore } from '../app/types';
import { openDialog } from '../base/dialog/actions';
import { hideDialog } from '../base/dialog/actions';
import { CONFERENCE_WILL_LEAVE } from '../base/conference/actionTypes';
import { showNotification } from '../notifications/actions';
import { NOTIFICATION_TIMEOUT_TYPE } from '../notifications/constants';
import MiddlewareRegistry from '../base/redux/MiddlewareRegistry';

import { setLastRoleChangeTime, setLastModeChangeTime, setDbFallbackUsed } from './actions';
import {
    ROLES_ADD_CO_HOST,
    ROLES_ADD_HOST,
    ROLES_ADD_LEADER,
    ROLES_REMOVE_CO_HOST,
    ROLES_REMOVE_HOST,
    ROLES_REMOVE_LEADER,
    ROLES_SET_FOUNDER
} from '../roles/actionTypes';
import { EXAM_MODE_ENABLE } from '../exam-mode/actionTypes';
import { ROOM_MODE_SET_MODE } from '../room-mode/constants';
import { RoomMode } from '../room-mode/types';
import { ATTENDANCE_ADD_ENTRY, ATTENDANCE_UPDATE_ENTRY } from '../attendance/actionTypes';
import attendanceService from '../attendance/service';
import { getLocalParticipant } from '../base/participants/functions';
import { getParticipantRole } from '../roles/functions';
import { Role } from '../roles/types';

// Import safety dialog components (will create these)
import EndMeetingConfirmDialog from './components/EndMeetingConfirmDialog';
import RoleChangeConfirmDialog from './components/RoleChangeConfirmDialog';
import ExamModeConfirmDialog from './components/ExamModeConfirmDialog';
import ModeChangeWarningDialog from './components/ModeChangeWarningDialog';

/**
 * Middleware that adds safety checks to high-risk actions.
 *
 * @param {IStore} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register((store: IStore) => (next: Function) => (action: AnyAction) => {
    const state = store.getState();
    const localParticipant = getLocalParticipant(state);
    const localRole = localParticipant ? getParticipantRole(state, localParticipant.id) : Role.PARTICIPANT;
    const currentMode = (state as any)['features/roomMode']?.currentMode || RoomMode.MEET;
    const safetyState = (state as any)['features/safety'] || { lastRoleChangeTime: 0, lastModeChangeTime: 0, dbFallbackUsed: false };
    const now = Date.now();

    // 1. END MEETING PROTECTION
    if (action.type === CONFERENCE_WILL_LEAVE) {
        // Check if this is a full conference leave (not just local participant leaving)
        // For now, we'll protect all conference leaves - can be refined later
        store.dispatch(openDialog('end-meeting-confirm', EndMeetingConfirmDialog, {
            onConfirm: () => {
                // Actually perform the leave after confirmation
                next(action);
                store.dispatch(showNotification({
                    titleKey: 'safety.meetingEnded',
                    title: 'Meeting ended for all participants'
                }, NOTIFICATION_TIMEOUT_TYPE.SHORT));
            }
        }));
        return; // Block the original action
    }

    // 2. ROLE CHANGE PROTECTION
    if ([ROLES_REMOVE_HOST, ROLES_REMOVE_CO_HOST, ROLES_REMOVE_LEADER, ROLES_SET_FOUNDER].includes(action.type)) {
        const targetParticipantId = action.participantId;

        // Check hierarchy rules
        let isAllowed = true;
        let errorMessage = '';

        if (action.type === ROLES_REMOVE_HOST) {
            // Host cannot remove Founder
            if (targetParticipantId === state['features/roles']?.founderId) {
                isAllowed = false;
                errorMessage = 'Host cannot remove Founder';
            }
        }

        if (action.type === ROLES_REMOVE_CO_HOST) {
            // Co-Host cannot remove Host
            if (state['features/roles']?.hosts.includes(targetParticipantId)) {
                isAllowed = false;
                errorMessage = 'Co-Host cannot remove Host';
            }
        }

        if (action.type === ROLES_REMOVE_LEADER) {
            // Leaders cannot change roles
            if (localRole === Role.LEADER) {
                isAllowed = false;
                errorMessage = 'Leaders cannot modify roles';
            }
        }

        if (!isAllowed) {
            store.dispatch(showNotification({
                titleKey: 'safety.roleChangeBlocked',
                title: errorMessage
            }, NOTIFICATION_TIMEOUT_TYPE.MEDIUM));
            return; // Block the action
        }

        // Check cooldown (5 seconds)
        if (now - safetyState.lastRoleChangeTime < 5000) {
            store.dispatch(showNotification({
                titleKey: 'safety.roleChangeCooldown',
                title: 'Please wait before making another role change'
            }, NOTIFICATION_TIMEOUT_TYPE.SHORT));
            return; // Block the action
        }

        // Show confirmation dialog
        store.dispatch(openDialog('role-change-confirm', RoleChangeConfirmDialog, {
            action: action.type,
            participantId: targetParticipantId,
            onConfirm: () => {
                store.dispatch(setLastRoleChangeTime(now));
                next(action);
                store.dispatch(showNotification({
                    titleKey: 'safety.roleChanged',
                    title: 'Role changed successfully'
                }, NOTIFICATION_TIMEOUT_TYPE.SHORT));
            }
        }));
        return; // Block the original action
    }

    // 3. EXAM MODE PROTECTION
    if (action.type === EXAM_MODE_ENABLE) {
        // Show double confirmation
        store.dispatch(openDialog('exam-mode-confirm', ExamModeConfirmDialog, {
            onConfirm: () => {
                // Check cooldown
                if (now - safetyState.lastModeChangeTime < 5000) {
                    store.dispatch(showNotification({
                        titleKey: 'safety.modeChangeCooldown',
                        title: 'Please wait before changing modes'
                    }, NOTIFICATION_TIMEOUT_TYPE.SHORT));
                    return;
                }

                store.dispatch(setLastModeChangeTime(now));
                next(action);
                store.dispatch(showNotification({
                    titleKey: 'safety.examModeEnabled',
                    title: 'Exam mode enabled - restrictions applied'
                }, NOTIFICATION_TIMEOUT_TYPE.MEDIUM));
            }
        }));
        return; // Block the original action
    }

    // 4. MODE CHANGE WARNING
    if (action.type === ROOM_MODE_SET_MODE) {
        const newMode = action.mode;

        // Warn when switching from EXAM to MEET
        if (currentMode === RoomMode.EXAM && newMode === RoomMode.MEET) {
            store.dispatch(openDialog('mode-change-warning', ModeChangeWarningDialog, {
                onConfirm: () => {
                    // Check cooldown
                    if (now - safetyState.lastModeChangeTime < 5000) {
                        store.dispatch(showNotification({
                            titleKey: 'safety.modeChangeCooldown',
                            title: 'Please wait before changing modes'
                        }, NOTIFICATION_TIMEOUT_TYPE.SHORT));
                        return;
                    }

                    store.dispatch(setLastModeChangeTime(now));
                    next(action);
                    store.dispatch(showNotification({
                        titleKey: 'safety.modeChanged',
                        title: 'Mode changed to Meeting'
                    }, NOTIFICATION_TIMEOUT_TYPE.SHORT));
                }
            }));
            return; // Block the original action
        }

        // Other mode changes - just check cooldown
        if (now - safetyState.lastModeChangeTime < 5000) {
            store.dispatch(showNotification({
                titleKey: 'safety.modeChangeCooldown',
                title: 'Please wait before changing modes'
            }, NOTIFICATION_TIMEOUT_TYPE.SHORT));
            return;
        }

        store.dispatch(setLastModeChangeTime(now));
        next(action);
        store.dispatch(showNotification({
            titleKey: 'safety.modeChanged',
            title: `Mode changed to ${newMode}`
        }, NOTIFICATION_TIMEOUT_TYPE.SHORT));
        return;
    }

    // 5. ATTENDANCE DB FAIL-SAFE
    if ([ATTENDANCE_ADD_ENTRY, ATTENDANCE_UPDATE_ENTRY].includes(action.type)) {
        // Let the action proceed, but add error handling
        const result = next(action);

        // Check if we need to store to DB
        if (attendanceService) {
            const conferenceState = state['features/base/conference'];
            const attendanceState = state['features/attendance'];

            let record;
            if (action.type === ATTENDANCE_ADD_ENTRY) {
                record = {
                    roomId: conferenceState.room || 'unknown',
                    participantId: action.entry.participantId,
                    participantName: action.entry.participantName,
                    joinTime: action.entry.joinTime,
                    mode: currentMode
                };
            } else {
                // Find the updated entry
                const entry = attendanceState.entries.find(e => e.participantId === action.participantId);
                if (entry) {
                    record = {
                        roomId: conferenceState.room || 'unknown',
                        participantId: action.participantId,
                        participantName: entry.participantName,
                        joinTime: entry.joinTime || 0,
                        leaveTime: action.updates.leaveTime,
                        duration: action.updates.duration,
                        mode: currentMode
                    };
                }
            }

            if (record) {
                // Try to store to DB
                attendanceService.storeAttendanceRecord(record).then(success => {
                    if (!success && !safetyState.dbFallbackUsed) {
                        // DB failed - trigger fallback
                        store.dispatch(setDbFallbackUsed(true));

                        // Create JSON download
                        const dataStr = JSON.stringify(record, null, 2);
                        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                        const exportFileDefaultName = `attendance-fallback-${Date.now()}.json`;

                        const linkElement = document.createElement('a');
                        linkElement.setAttribute('href', dataUri);
                        linkElement.setAttribute('download', exportFileDefaultName);
                        linkElement.click();

                        store.dispatch(showNotification({
                            titleKey: 'safety.dbFallbackUsed',
                            title: 'Database unavailable - attendance data saved locally',
                            description: 'Download the JSON file to preserve attendance records'
                        }, NOTIFICATION_TIMEOUT_TYPE.LONG));
                    }
                }).catch(error => {
                    console.warn('Attendance DB error:', error);
                    if (!safetyState.dbFallbackUsed) {
                        store.dispatch(setDbFallbackUsed(true));
                        store.dispatch(showNotification({
                            titleKey: 'safety.dbError',
                            title: 'Attendance tracking error - data may be lost'
                        }, NOTIFICATION_TIMEOUT_TYPE.MEDIUM));
                    }
                });
            }
        }

        return result;
    }

    // Allow all other actions to proceed normally
    return next(action);
});