import { connect } from 'react-redux';

import { IReduxState } from '../../app/types';
import { translate } from '../../base/i18n/functions';
import AbstractButton, { IProps as AbstractButtonProps } from '../../base/toolbox/components/AbstractButton';
import { closeAttendancePanel, openAttendancePanel } from '../actions';

/**
 * The type of the React {@code Component} props of {@link AttendanceButton}.
 */
interface IProps extends AbstractButtonProps {
    /**
     * Whether the attendance panel is open.
     */
    _isOpen: boolean;
}

/**
 * Implementation of a button for opening attendance panel.
 */
class AttendanceButton extends AbstractButton<IProps> {
    override accessibilityLabel = 'toolbar.accessibilityLabel.attendance';
    override icon = 'icon-users';
    override label = 'toolbar.attendance';
    override tooltip = 'toolbar.attendance';

    /**
     * Handles clicking the button, and toggles the attendance panel.
     *
     * @private
     * @returns {void}
     */
    override _handleClick() {
        const { dispatch, _isOpen } = this.props;

        if (_isOpen) {
            dispatch(closeAttendancePanel());
        } else {
            dispatch(openAttendancePanel());
        }
    }

    /**
     * Indicates whether the button is toggled or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    override _isToggled() {
        return this.props._isOpen;
    }
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object}
 */
const mapStateToProps = (state: IReduxState) => {
    return {
        _isOpen: state['features/attendance']?.isPanelOpen || false
    };
};

export default translate(connect(mapStateToProps)(AttendanceButton));
