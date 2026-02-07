import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { IconUsers } from '../../../base/icons/svg';
import { isButtonEnabled } from '../../../toolbox/functions.web';
import AbstractButton, { IProps as AbstractButtonProps } from '../../../base/toolbox/components/AbstractButton';
import { getUnifiedPanelOpen } from '../../functions';
import { setUnifiedPanelOpen } from '../../actions';

interface IProps extends AbstractButtonProps {

    /**
     * Whether or not the button is visible.
     */
    visible?: boolean;
}

/**
 * Implementation of a button for opening the unified panel.
 */
export default function UnifiedPanelButton({ visible = true, ...props }: IProps) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isOpen = useSelector(getUnifiedPanelOpen);

    const handleClick = useCallback(() => {
        dispatch(setUnifiedPanelOpen(!isOpen));
    }, [ dispatch, isOpen ]);

    if (!visible) {
        return null;
    }

    return (
        <AbstractButton
            accessibilityLabel = { t('unifiedPanel.accessibilityLabel') }
            icon = { IconUsers }
            key = 'unified-panel'
            onClick = { handleClick }
            tooltip = { t('unifiedPanel.tooltip') }
            { ...props } />
    );
}