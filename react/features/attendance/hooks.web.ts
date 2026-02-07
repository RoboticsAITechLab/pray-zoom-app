import AttendanceButton from './components/AttendanceButton';

const attendance = {
    key: 'attendance',
    Content: AttendanceButton,
    group: 2
};

/**
 * A hook that returns the attendance button.
 *
 * @returns {Object}
 */
export function useAttendanceButton() {
    // Always return the attendance button (could add conditions later)
    return attendance;
}
