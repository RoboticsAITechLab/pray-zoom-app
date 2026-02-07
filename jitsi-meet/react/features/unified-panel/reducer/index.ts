import { AnyAction } from 'redux';

import { SET_SELECTED_TAB, SET_UNIFIED_PANEL_OPEN } from '../actions/actionTypes';

export interface IUnifiedPanelState {
    isOpen: boolean;
    selectedTab: number;
}

const DEFAULT_STATE: IUnifiedPanelState = {
    isOpen: false,
    selectedTab: 0
};

/**
 * Reduces the Redux actions of the feature features/unified-panel.
 */
export default function unifiedPanel(state: IUnifiedPanelState = DEFAULT_STATE, action: AnyAction) {
    switch (action.type) {
    case SET_SELECTED_TAB:
        return {
            ...state,
            selectedTab: action.selectedTab
        };

    case SET_UNIFIED_PANEL_OPEN:
        return {
            ...state,
            isOpen: action.open
        };

    default:
        return state;
    }
}