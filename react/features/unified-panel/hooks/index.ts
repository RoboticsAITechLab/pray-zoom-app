import { useSelector } from 'react-redux';

import { IReduxState } from '../../app/types';
import UnifiedPanelButton from '../components/web/UnifiedPanelButton';

const unifiedPanel = {
    key: 'unified-panel',
    Content: UnifiedPanelButton,
    group: 2
};

/**
 * A hook that returns the unified panel button.
 *
 * @returns {Object | undefined}
 */
export function useUnifiedPanelButton() {
    return unifiedPanel;
}