import { IReduxState } from '../../app/types';

/**
 * Gets the selected tab index for the unified panel.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {number} The selected tab index.
 */
export function getSelectedTab(state: IReduxState): number {
    return state['features/unified-panel'].selectedTab;
}

/**
 * Gets whether the unified panel is open.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {boolean} Whether the panel is open.
 */
export function getUnifiedPanelOpen(state: IReduxState): boolean {
    return state['features/unified-panel'].isOpen;
}