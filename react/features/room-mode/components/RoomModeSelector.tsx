/**
 * Common Room Mode Feature – UI Layer Only.
 *
 * Component for selecting room mode.
 */

import React from 'react';
import { connect } from 'react-redux';

import { IReduxState, IStore } from '../../app/types';
import { translate } from '../../base/i18n/functions';
import { setRoomMode } from '../actions';
import { RoomMode } from '../types';

interface IProps {

    /**
     * The current room mode.
     */
    currentMode: RoomMode;

    /**
     * Redux dispatch function.
     */
    dispatch: IStore['dispatch'];

    /**
     * Translation function.
     */
    t: Function;
}

/**
 * Room mode selector component.
 *
 * @param {IProps} props - The props.
 * @returns {ReactElement}
 */
function RoomModeSelector({ currentMode, dispatch, t }: IProps) {
    const modes = [ RoomMode.PRAYER, RoomMode.STUDY, RoomMode.MEET, RoomMode.EXAM ];

    return (
        <div className = 'room-mode-selector'>
            {modes.map(mode => (
                <button
                    className = { `room-mode-button ${currentMode === mode ? 'active' : ''}` }
                    key = { mode }
                    onClick = { () => dispatch(setRoomMode(mode)) }
                    title = { t(`roomMode.${mode.toLowerCase()}`) }
                    type = 'button' >
                    { t(`roomMode.${mode.toLowerCase()}`) }
                </button>
            ))}
        </div>
    );
}

function _mapStateToProps(state: IReduxState) {
    return {
        currentMode: (state as any)['features/roomMode'].currentMode
    };
}

export default translate(connect(_mapStateToProps)(RoomModeSelector));
