/**
 * Exam Mode Lockdown Feature - UI Layer Only.
 *
 * Button component for toggling exam mode.
 */

import { connect } from 'react-redux';

import { IReduxState } from '../../app/types';
import { translate } from '../../base/i18n/functions';
import { isLocalParticipantModerator } from '../../base/participants/functions';
import AbstractButton, { IProps as AbstractButtonProps } from '../../base/toolbox/components/AbstractButton';
import { disableExamMode, enableExamMode } from '../actions';
import { isExamModeEnabled } from '../functions';

interface IProps extends AbstractButtonProps {

    /**
     * Whether the local participant can control exam mode.
     */
    _canControlExamMode: boolean;

    /**
     * Whether exam mode is currently enabled.
     */
    _examModeEnabled: boolean;
}

/**
 * Button for toggling exam mode.
 */
class ExamModeButton extends AbstractButton<IProps> {
    override accessibilityLabel = 'toolbar.accessibilityLabel.examMode';
    override label = 'toolbar.examMode';
    override tooltip = 'toolbar.examMode';

    /**
     * Handles clicking the button, and toggles exam mode.
     *
     * @private
     * @returns {void}
     */
    override _handleClick() {
        const { _examModeEnabled, dispatch } = this.props;

        if (_examModeEnabled) {
            dispatch(disableExamMode());
        } else {
            dispatch(enableExamMode());
        }
    }

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    override _isToggled() {
        return this.props._examModeEnabled;
    }

    /**
     * Indicates whether this button is visible or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isVisible() {
        return this.props._canControlExamMode;
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
        _examModeEnabled: isExamModeEnabled(state),
        _canControlExamMode: isLocalParticipantModerator(state)
    };
};

export default translate(connect(mapStateToProps)(ExamModeButton));
