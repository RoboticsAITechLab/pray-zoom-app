/**
 * Custom feature scaffold – no logic yet.
 *
 * Action creators for the exam mode feature.
 */

import { IStore } from '../app/types';

import {
    EXAM_MODE_DISABLE,
    EXAM_MODE_ENABLE,
    EXAM_MODE_INCREMENT_WARNINGS,
    EXAM_MODE_SET_DURATION,
    EXAM_MODE_SET_TIMER,
    EXAM_MODE_UPDATE_RESTRICTIONS
} from './actionTypes';
import { IExamModeRestrictions } from './types';

/**
 * Enables exam mode.
 *
 * @param {IExamModeRestrictions} restrictions - The restrictions to apply.
 * @returns {Function}
 */
export function enableExamMode(restrictions?: IExamModeRestrictions) {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: EXAM_MODE_ENABLE,
            restrictions
        });
    };
}

/**
 * Disables exam mode.
 *
 * @returns {Function}
 */
export function disableExamMode() {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: EXAM_MODE_DISABLE
        });
    };
}

/**
 * Updates exam mode restrictions.
 *
 * @param {IExamModeRestrictions} restrictions - The restrictions to update.
 * @returns {Function}
 */
export function updateExamModeRestrictions(restrictions: IExamModeRestrictions) {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: EXAM_MODE_UPDATE_RESTRICTIONS,
            restrictions
        });
    };
}

/**
 * Sets exam mode duration.
 *
 * @param {number} duration - Duration in milliseconds.
 * @returns {Function}
 */
export function setExamModeDuration(duration: number) {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: EXAM_MODE_SET_DURATION,
            duration
        });
    };
}

/**
 * Increments the warning counter.
 *
 * @returns {Function}
 */
export function incrementExamModeWarnings() {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: EXAM_MODE_INCREMENT_WARNINGS
        });
    };
}

/**
 * Sets the exam timer.
 *
 * @param {number | null} timer - Timer value in milliseconds.
 * @returns {Function}
 */
export function setExamModeTimer(timer: number | null) {
    return (dispatch: IStore['dispatch']) => {
        dispatch({
            type: EXAM_MODE_SET_TIMER,
            timer
        });
    };
}
