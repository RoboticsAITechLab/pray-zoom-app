/**
 * Exam Mode Lockdown Feature - UI Layer Only.
 *
 * Main component for exam mode UI elements including banners, warnings, and controls.
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { IReduxState } from '../../app/types';
import { isLocalParticipantModerator } from '../../base/participants/functions';
import { showNotification } from '../../notifications/actions';
import { NOTIFICATION_TYPE } from '../../notifications/constants';
import { incrementExamModeWarnings } from '../actions';
import { isExamModeEnabled } from '../functions';

/**
 * Exam mode indicator and control component.
 *
 * @returns {ReactElement}
 */
function ExamModeIndicator() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const examModeEnabled = useSelector(isExamModeEnabled);
    const warnings = useSelector((state: IReduxState) => state['features/examMode'].warnings);
    const timer = useSelector((state: IReduxState) => state['features/examMode'].timer);
    const isVideoMuted = useSelector((state: IReduxState) => state['features/base/media'].video.muted);
    const _isModerator = useSelector(isLocalParticipantModerator);

    const [ showTabWarning, setShowTabWarning ] = useState(false);
    const [ showFullscreenWarning, setShowFullscreenWarning ] = useState(false);
    const [ timeRemaining, setTimeRemaining ] = useState<number | null>(null);

    // Handle tab visibility changes
    const handleVisibilityChange = useCallback(() => {
        if (examModeEnabled && document.hidden) {
            setShowTabWarning(true);
            dispatch(incrementExamModeWarnings());
            dispatch(showNotification({
                title: t('examMode.tabSwitchWarning'),
                description: t('examMode.tabSwitchDescription'),
                uid: 'exam-mode-tab-warning'
            }, NOTIFICATION_TYPE.WARNING));
        } else {
            setShowTabWarning(false);
        }
    }, [ examModeEnabled, dispatch, t ]);

    // Handle fullscreen changes
    const handleFullscreenChange = useCallback(() => {
        if (examModeEnabled && !document.fullscreenElement) {
            setShowFullscreenWarning(true);
        } else {
            setShowFullscreenWarning(false);
        }
    }, [ examModeEnabled ]);

    // Handle keyboard shortcuts
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (!examModeEnabled) return;

        // Intercept copy/paste
        if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'v')) {
            event.preventDefault();
            dispatch(showNotification({
                title: t('examMode.copyPasteBlocked'),
                description: t('examMode.copyPasteDescription'),
                uid: 'exam-mode-copy-paste'
            }, NOTIFICATION_TYPE.WARNING));
        }
    }, [ examModeEnabled, dispatch, t ]);

    // Handle right-click
    const handleContextMenu = useCallback((event: MouseEvent) => {
        if (examModeEnabled) {
            event.preventDefault();
            dispatch(showNotification({
                title: t('examMode.rightClickBlocked'),
                description: t('examMode.rightClickDescription'),
                uid: 'exam-mode-right-click'
            }, NOTIFICATION_TYPE.WARNING));
        }
    }, [ examModeEnabled, dispatch, t ]);

    // Timer countdown effect
    useEffect(() => {
        if (!timer || !examModeEnabled) {
            setTimeRemaining(null);

            return;
        }

        const interval = setInterval(() => {
            const remaining = Math.max(0, timer - Date.now());

            setTimeRemaining(remaining);

            if (remaining <= 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [ timer, examModeEnabled ]);

    // Event listeners setup
    useEffect(() => {
        if (examModeEnabled) {
            document.addEventListener('visibilitychange', handleVisibilityChange);
            document.addEventListener('fullscreenchange', handleFullscreenChange);
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('contextmenu', handleContextMenu);
        }

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, [ examModeEnabled, handleVisibilityChange, handleFullscreenChange, handleKeyDown, handleContextMenu ]);

    if (!examModeEnabled) {
        return null;
    }

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);

        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className = 'exam-mode-container'>
            {/* Exam Timer Banner */}
            {timeRemaining !== null && (
                <div className = 'exam-mode-timer-banner'>
                    <span className = 'exam-timer-text'>
                        {t('examMode.timerLabel')}: {formatTime(timeRemaining)}
                    </span>
                </div>
            )}

            {/* Fullscreen Warning Banner */}
            {showFullscreenWarning && (
                <div className = 'exam-mode-banner exam-mode-fullscreen-warning'>
                    <span>{t('examMode.fullscreenRequired')}</span>
                </div>
            )}

            {/* Tab Switch Warning Banner */}
            {showTabWarning && (
                <div className = 'exam-mode-banner exam-mode-tab-warning'>
                    <span>{t('examMode.tabSwitchWarning')}</span>
                    <span className = 'warning-count'>({t('examMode.warnings')}: {warnings})</span>
                </div>
            )}

            {/* Camera Mandatory Indicator */}
            {isVideoMuted && (
                <div className = 'exam-mode-banner exam-mode-camera-warning'>
                    <span>{t('examMode.cameraRecommended')}</span>
                </div>
            )}

            {/* Exam Mode Active Indicator */}
            <div className = 'exam-mode-active-indicator'>
                <span>{t('examMode.active')}</span>
                {_isModerator && (
                    <span className = 'moderator-controls'>
                        {t('examMode.hostControls')}
                    </span>
                )}
            </div>
        </div>
    );
}

export default ExamModeIndicator;
