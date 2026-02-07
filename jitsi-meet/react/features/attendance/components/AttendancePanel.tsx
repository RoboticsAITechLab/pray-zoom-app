/**
 * Attendance panel component for displaying and exporting attendance records.
 */

import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { closeAttendancePanel } from '../actions';
import attendanceService from '../service';
import { IAttendanceEntry } from '../types';

interface IProps {
    onClose?: () => void;
    isActive?: boolean;
}

/**
 * Component for displaying attendance information and export functionality.
 *
 * @param {IProps} props - The component props.
 * @returns {ReactElement}
 */
export default function AttendancePanel({ onClose, isActive }: IProps) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [ isExporting, setIsExporting ] = useState(false);
    const [ isLoadingRecords, setIsLoadingRecords ] = useState(false);

    // Get attendance state and room info
    const attendanceState = useSelector((state: any) => state['features/attendance']);
    const conferenceState = useSelector((state: any) => state['features/base/conference']);

    const entries: IAttendanceEntry[] = attendanceState?.entries || [];
    const isPanelOpen = attendanceState?.isPanelOpen || false;
    const roomId = conferenceState?.room || 'unknown';
    const currentMode = 'MEET';

    // Don't render if panel is not open (unless we're in a unified panel)
    if (!isActive && !isPanelOpen) {
        return null;
    }

    /**
     * Handle panel close.
     */
    const handleClose = useCallback(() => {
        dispatch(closeAttendancePanel());
        onClose?.();
    }, [ dispatch, onClose ]);

    /**
     * Format timestamp to readable date/time.
     */
    const formatTimestamp = useCallback((timestamp: number) => {
        return new Date(timestamp).toLocaleString();
    }, []);

    /**
     * Format duration in milliseconds to readable format.
     */
    const formatDuration = useCallback((duration?: number) => {
        if (!duration) return 'N/A';

        const minutes = Math.floor(duration / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);

        return `${minutes}m ${seconds}s`;
    }, []);

    /**
     * Export attendance records to CSV.
     */
    const exportToCSV = useCallback(async () => {
        setIsExporting(true);

        try {
            // Try to get records from Neon first, fall back to local state
            let recordsToExport = entries;

            if (attendanceService) {
                setIsLoadingRecords(true);
                try {
                    const neonRecords = await attendanceService.getAttendanceRecords(roomId);

                    if (neonRecords.length > 0) {
                        recordsToExport = neonRecords;
                    }
                } catch (error) {
                    console.warn('Failed to load records from Neon, using local state:', error);
                } finally {
                    setIsLoadingRecords(false);
                }
            }

            // Create CSV content
            const headers = [ 'Participant Name', 'Join Time', 'Leave Time', 'Duration', 'Mode' ];
            const csvContent = [
                headers.join(','),
                ...recordsToExport.map(entry => [
                    `"${entry.participantName || 'Unknown'}"`,
                    `"${entry.joinTime ? formatTimestamp(entry.joinTime) : 'Unknown'}"`,
                    `"${entry.leaveTime ? formatTimestamp(entry.leaveTime) : 'Still joined'}"`,
                    `"${formatDuration(entry.duration)}"`,
                    `"${entry.mode || currentMode}"`
                ].join(','))
            ].join('\n');

            // Create and download file
            const blob = new Blob([ csvContent ], { type: 'text/csv;charset=utf-8;' } as any);
            const link = document.createElement('a');

            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);

                link.setAttribute('href', url);
                link.setAttribute('download', `attendance-${roomId}-${new Date().toISOString().split('T')[0]}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Failed to export attendance records:', error);
            // Could show a notification here
        } finally {
            setIsExporting(false);
        }
    }, [ entries, roomId, currentMode, formatTimestamp, formatDuration ]);

    return (
        <div className = 'attendance-panel'>
            <div className = 'attendance-panel__header'>
                <h2>{t('attendance.title', 'Attendance Records')}</h2>
                <div className = 'attendance-panel__actions'>
                    <button
                        className = 'attendance-panel__export-btn'
                        disabled = { isExporting || isLoadingRecords }
                        onClick = { exportToCSV }>
                        {isExporting
                            ? t('attendance.exporting', 'Exporting...')
                            : t('attendance.export', 'Export to CSV')
                        }
                    </button>
                    <button
                        className = 'attendance-panel__close-btn'
                        onClick = { handleClose }>
                        ×
                    </button>
                </div>
            </div>

            <div className = 'attendance-panel__info'>
                <p><strong>{t('attendance.room', 'Room')}:</strong> {roomId}</p>
                <p><strong>{t('attendance.mode', 'Mode')}:</strong> {currentMode}</p>
                <p><strong>{t('attendance.totalParticipants', 'Total Participants')}:</strong> {entries.length}</p>
            </div>

            <div className = 'attendance-panel__list'>
                {isLoadingRecords ? (
                    <div className = 'attendance-panel__loading'>
                        {t('attendance.loading', 'Loading records...')}
                    </div>
                ) : entries.length === 0 ? (
                    <div className = 'attendance-panel__empty'>
                        {t('attendance.noRecords', 'No attendance records yet.')}
                    </div>
                ) : (
                    <table className = 'attendance-panel__table'>
                        <thead>
                            <tr>
                                <th>{t('attendance.participant', 'Participant')}</th>
                                <th>{t('attendance.joinTime', 'Join Time')}</th>
                                <th>{t('attendance.leaveTime', 'Leave Time')}</th>
                                <th>{t('attendance.duration', 'Duration')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, index) => (
                                <tr key = { `${entry.participantId}-${index}` }>
                                    <td>{entry.participantName || t('attendance.unknown', 'Unknown')}</td>
                                    <td>{entry.joinTime ? formatTimestamp(entry.joinTime) : 'Unknown'}</td>
                                    <td>
                                        {entry.leaveTime
                                            ? formatTimestamp(entry.leaveTime)
                                            : t('attendance.stillJoined', 'Still joined')
                                        }
                                    </td>
                                    <td>{formatDuration(entry.duration)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
