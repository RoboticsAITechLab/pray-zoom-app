/**
 * Temporary Role System – UI Layer Only.
 *
 * Component for managing roles and permissions.
 */

import React from 'react';
import { connect } from 'react-redux';

import { IStore } from '../../app/types';
import { translate } from '../../base/i18n/functions';
import {
    addCoHost,
    addHost,
    addLeader,
    removeCoHost,
    removeHost,
    removeLeader
} from '../actions';

interface IProps {

    /**
     * Redux dispatch function.
     */
    dispatch: IStore['dispatch'];

    /**
     * The participant ID to manage roles for.
     */
    participantId?: string;

    /**
     * Translation function.
     */
    t: Function;
}

/**
 * Role manager component.
 *
 * @param {IProps} props - The props.
 * @returns {ReactElement}
 */
function RoleManager({ participantId, dispatch, t }: IProps) {
    if (!participantId) {
        return null;
    }

    return (
        <div className = 'role-manager'>
            <button
                className = 'role-button'
                onClick = { () => dispatch(addHost(participantId)) }
                type = 'button'>
                {t('roles.makeHost')}
            </button>
            <button
                className = 'role-button'
                onClick = { () => dispatch(removeHost(participantId)) }
                type = 'button'>
                {t('roles.removeHost')}
            </button>
            <button
                className = 'role-button'
                onClick = { () => dispatch(addCoHost(participantId)) }
                type = 'button'>
                {t('roles.makeCoHost')}
            </button>
            <button
                className = 'role-button'
                onClick = { () => dispatch(removeCoHost(participantId)) }
                type = 'button'>
                {t('roles.removeCoHost')}
            </button>
            <button
                className = 'role-button'
                onClick = { () => dispatch(addLeader(participantId)) }
                type = 'button'>
                {t('roles.makeLeader')}
            </button>
            <button
                className = 'role-button'
                onClick = { () => dispatch(removeLeader(participantId)) }
                type = 'button'>
                {t('roles.removeLeader')}
            </button>
        </div>
    );
}

export default translate(connect()(RoleManager));
