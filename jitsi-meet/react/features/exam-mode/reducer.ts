/**
 * Custom feature scaffold – no logic yet.
 *
 * Reducer for the exam mode feature.
 */

import { AnyAction } from 'redux';

import ReducerRegistry from '../base/redux/ReducerRegistry';

import {
    EXAM_MODE_DISABLE,
    EXAM_MODE_ENABLE,
    EXAM_MODE_INCREMENT_WARNINGS,
    EXAM_MODE_SET_DURATION,
    EXAM_MODE_SET_TIMER,
    EXAM_MODE_UPDATE_RESTRICTIONS
} from './actionTypes';
import { IExamModeRestrictions } from './types';

export interface IExamModeState {
    duration?: number;
    enabled: boolean;
    endTime?: number;
    restrictions: IExamModeRestrictions;
    startTime?: number;
    timer: number | null;
    warnings: number;
}

/**
 * Default restrictions for exam mode.
 */
export const DEFAULT_RESTRICTIONS: IExamModeRestrictions = {
    disableChat: true,
    disableScreenShare: true,
    disableFileShare: true,
    disableSettings: true,
    disableLeave: false,
    disableMute: false,
    disableVideo: false,
    disableInvite: true
};

/**
 * Initial state for the exam mode feature.
 */
export const DEFAULT_STATE: IExamModeState = {
    enabled: false,
    restrictions: DEFAULT_RESTRICTIONS,
    warnings: 0,
    timer: null
};

/**
 * Reduces the redux actions of the feature exam-mode.
 */
ReducerRegistry.register<IExamModeState>('features/examMode', (state = DEFAULT_STATE, action: AnyAction): IExamModeState => {
    switch (action.type) {
    case EXAM_MODE_ENABLE:
        return {
            ...state,
            enabled: true,
            restrictions: action.restrictions || DEFAULT_RESTRICTIONS,
            startTime: Date.now(),
            warnings: 0,
            timer: action.timer || null
        };

    case EXAM_MODE_DISABLE:
        return {
            ...state,
            enabled: false,
            endTime: Date.now()
        };

    case EXAM_MODE_UPDATE_RESTRICTIONS:
        return {
            ...state,
            restrictions: {
                ...state.restrictions,
                ...action.restrictions
            }
        };

    case EXAM_MODE_SET_DURATION:
        return {
            ...state,
            duration: action.duration
        };

    case EXAM_MODE_INCREMENT_WARNINGS:
        return {
            ...state,
            warnings: state.warnings + 1
        };

    case EXAM_MODE_SET_TIMER:
        return {
            ...state,
            timer: action.timer
        };

    default:
        return state;
    }
});
