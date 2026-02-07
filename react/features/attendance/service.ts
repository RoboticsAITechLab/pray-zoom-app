/**
 * Service for storing attendance data to Neon PostgreSQL.
 * Uses Neon's HTTP API for client-side database operations.
 */

import { doGetJSON } from '../base/util/httpUtils';

import logger from './logger';

export interface IAttendanceRecord {
    duration?: number;
    joinTime: number;
    leaveTime?: number;
    mode?: string;
    participantId: string;
    participantName?: string;
    roomId: string;
}

/**
 * Service class for attendance data storage.
 */
class AttendanceService {
    private neonUrl?: string;
    private apiKey?: string;

    /**
     * Initialize the service with Neon configuration.
     *
     * @param {string} neonUrl - The Neon database URL.
     * @param {string} apiKey - The Neon API key.
     */
    initialize(neonUrl: string, apiKey: string) {
        this.neonUrl = neonUrl;
        this.apiKey = apiKey;
    }

    /**
     * Store attendance record to Neon database.
     *
     * @param {IAttendanceRecord} record - The attendance record to store.
     * @returns {Promise<boolean>} - True if successful, false otherwise.
     */
    async storeAttendanceRecord(record: IAttendanceRecord): Promise<boolean> {
        if (!this.neonUrl || !this.apiKey) {
            logger.warn('Attendance service not initialized with Neon credentials');

            return false;
        }

        try {
            // For Neon HTTP API, we'll use a simple INSERT via HTTP
            // This is a simplified example - in production you'd want proper SQL escaping
            const sql = `
                INSERT INTO attendance_records (room_id, participant_id, participant_name, join_time, leave_time, duration, mode, created_at)
                VALUES ('${record.roomId}', '${record.participantId}', '${record.participantName || ''}', ${record.joinTime}, ${record.leaveTime || 'NULL'}, ${record.duration || 'NULL'}, '${record.mode || ''}', NOW())
            `;

            const response = await fetch(`${this.neonUrl}/sql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    query: sql
                })
            });

            if (!response.ok) {
                logger.error('Failed to store attendance record:', response.statusText);

                return false;
            }

            const result = await response.json();

            if (result.error) {
                logger.error('Neon SQL error:', result.error);

                return false;
            }

            logger.info('Attendance record stored successfully');

            return true;
        } catch (error) {
            logger.error('Error storing attendance record:', error);

            return false;
        }
    }

    /**
     * Get attendance records for a room.
     *
     * @param {string} roomId - The room ID to get records for.
     * @returns {Promise<IAttendanceRecord[]>} - Array of attendance records.
     */
    async getAttendanceRecords(roomId: string): Promise<IAttendanceRecord[]> {
        if (!this.neonUrl || !this.apiKey) {
            logger.warn('Attendance service not initialized with Neon credentials');

            return [];
        }

        try {
            const sql = `SELECT * FROM attendance_records WHERE room_id = '${roomId}' ORDER BY join_time DESC`;

            const response = await fetch(`${this.neonUrl}/sql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    query: sql
                })
            });

            if (!response.ok) {
                logger.error('Failed to fetch attendance records:', response.statusText);

                return [];
            }

            const result = await response.json();

            if (result.error) {
                logger.error('Neon SQL error:', result.error);

                return [];
            }

            // Transform the result rows to IAttendanceRecord format
            return (result.rows || []).map((row: any) => ({
                roomId: row.room_id,
                participantId: row.participant_id,
                participantName: row.participant_name,
                joinTime: parseInt(row.join_time),
                leaveTime: row.leave_time ? parseInt(row.leave_time) : undefined,
                duration: row.duration ? parseInt(row.duration) : undefined,
                mode: row.mode
            }));
        } catch (error) {
            logger.error('Error fetching attendance records:', error);

            return [];
        }
    }
}

// Export singleton instance
export default new AttendanceService();
