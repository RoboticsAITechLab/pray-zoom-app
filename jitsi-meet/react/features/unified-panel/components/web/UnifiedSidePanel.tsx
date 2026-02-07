import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import participantsPaneTheme from '../../../base/components/themes/participantsPaneTheme.json';
import { IconMessage, IconModerator, IconUsers } from '../../../base/icons/svg';
import { isLocalParticipantModerator } from '../../../base/participants/functions';
import AttendancePanel from '../../../attendance/components/AttendancePanel';
import { setFocusedTab } from '../../../chat/actions.web';
import Chat from '../../../chat/components/web/Chat';
import { ChatTabs } from '../../../chat/constants';
import { close as closeParticipantsPane } from '../../../participants-pane/actions.web';
import ParticipantsPane from '../../../participants-pane/components/web/ParticipantsPane';
import PrayerPanel from '../../../prayer-panel/components/PrayerPanel';
import { getSelectedTab, getUnifiedPanelOpen } from '../../functions';
import { setSelectedTab } from '../../actions';

const useStyles = makeStyles()((theme) => {
    return {
        unifiedPanel: {
            backgroundColor: theme.palette.participantsPaneBackground,
            flexShrink: 0,
            position: 'relative',
            transition: 'width .16s ease-in-out',
            width: '315px',
            zIndex: 0,
            display: 'flex',
            flexDirection: 'column',
            fontWeight: 600,
            height: '100%',

            '@media (max-width: 580px)': {
                height: '100dvh',
                position: 'fixed',
                left: 0,
                right: 0,
                top: 0,
                width: '100%'
            }
        },

        tabs: {
            display: 'flex',
            borderBottom: `1px solid ${theme.palette.ui03}`,
            backgroundColor: theme.palette.uiBackground
        },

        tab: {
            flex: 1,
            padding: '12px 16px',
            textAlign: 'center',
            cursor: 'pointer',
            borderBottom: '2px solid transparent',
            transition: 'all 0.2s ease',
            fontSize: '14px',
            fontWeight: 500,
            color: theme.palette.text02,

            '&.active': {
                color: theme.palette.link01,
                borderBottomColor: theme.palette.link01
            },

            '&:hover': {
                backgroundColor: theme.palette.ui02,
                color: theme.palette.text01
            }
        },

        tabIcon: {
            display: 'block',
            margin: '0 auto 4px',
            width: '20px',
            height: '20px'
        },

        content: {
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }
    };
});

const UnifiedSidePanel = () => {
    const { classes } = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const isOpen = useSelector(getUnifiedPanelOpen);
    const selectedTab = useSelector(getSelectedTab);
    const isModerator = useSelector(isLocalParticipantModerator);

    const handleTabChange = (tabIndex: number) => {
        dispatch(setSelectedTab(tabIndex));
    };

    const tabs: Array<{
        key: string;
        icon: any;
        label: string;
        component: React.ComponentType<any>;
    }> = [
        {
            key: 'chat',
            icon: IconMessage,
            label: t('chat.tabs.chat'),
            component: Chat
        },
        {
            key: 'participants',
            icon: IconUsers,
            label: t('participantsPane.header'),
            component: ParticipantsPane
        }
    ];

    // Add attendance tab for moderators
    if (isModerator) {
        tabs.push({
            key: 'attendance',
            icon: IconModerator,
            label: t('attendance.attendance'),
            component: AttendancePanel
        });
    }

    // Add prayer tab
    tabs.push({
        key: 'prayer',
        icon: IconModerator, // TODO: Add proper prayer icon
        label: t('prayerPanel.title'),
        component: PrayerPanel
    });

    const ActiveComponent = tabs[selectedTab]?.component;

    if (!isOpen) {
        return null;
    }

    return (
        <div className={classes.unifiedPanel}>
            <div className={classes.tabs}>
                {tabs.map((tab, index) => (
                    <div
                        key={tab.key}
                        className={`${classes.tab} ${selectedTab === index ? 'active' : ''}`}
                        onClick={() => handleTabChange(index)}
                    >
                        <tab.icon className={classes.tabIcon} />
                        {tab.label}
                    </div>
                ))}
            </div>

            <div className={classes.content}>
                {ActiveComponent && <ActiveComponent isActive={true} />}
            </div>
        </div>
    );
};

export default UnifiedSidePanel;