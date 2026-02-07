import { SET_SELECTED_TAB, SET_UNIFIED_PANEL_OPEN } from './actionTypes';

/**
 * Sets the selected tab in the unified panel.
 *
 * @param {number} selectedTab - The index of the selected tab.
 * @returns {{
 *     type: SET_SELECTED_TAB,
 *     selectedTab: number
 * }}
 */
export function setSelectedTab(selectedTab: number) {
    return {
        type: SET_SELECTED_TAB,
        selectedTab
    };
}

/**
 * Sets whether the unified panel is open.
 *
 * @param {boolean} open - Whether the panel should be open.
 * @returns {{
 *     type: SET_UNIFIED_PANEL_OPEN,
 *     open: boolean
 * }}
 */
export function setUnifiedPanelOpen(open: boolean) {
    return {
        type: SET_UNIFIED_PANEL_OPEN,
        open
    };
}

/**
 * Toggles the unified panel open/closed state.
 *
 * @returns {Function}
 */
export function toggleUnifiedPanel() {
    return (dispatch: any, getState: any) => {
        const state = getState();
        const isOpen = state['features/unified-panel'].isOpen;

        dispatch(setUnifiedPanelOpen(!isOpen));
    };
}