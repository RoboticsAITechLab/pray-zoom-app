import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import { isLocalParticipantModerator } from '../../../base/participants/functions';
import { RoomMode } from '../../../room-mode/types';

const useStyles = makeStyles()((theme) => {
    return {
        badge: {
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            marginRight: '8px',
            whiteSpace: 'nowrap'
        },

        examMode: {
            backgroundColor: theme.palette.warning01,
            color: theme.palette.uiBackground
        },

        prayerMode: {
            backgroundColor: theme.palette.link01,
            color: theme.palette.uiBackground
        },

        moderatorBadge: {
            backgroundColor: theme.palette.participantModeratorLabel,
            color: theme.palette.uiBackground
        }
    };
});

/**
 * Component that displays mode and role badges in the conference header.
 *
 * @returns {ReactElement|null}
 */
const ModeBadgeLabel = () => {
    const { classes } = useStyles();
    const { t } = useTranslation();

    const currentMode = useSelector((state: IReduxState) => (state as any)['features/roomMode'].currentMode);
    const isModerator = useSelector(isLocalParticipantModerator);

    const badges = [];

    // Add mode badges
    if (currentMode === RoomMode.EXAM) {
        badges.push(
            <span key="exam" className={`${classes.badge} ${classes.examMode}`}>
                {t('roomMode.examMode')}
            </span>
        );
    }

    if (currentMode === RoomMode.PRAYER) {
        badges.push(
            <span key="prayer" className={`${classes.badge} ${classes.prayerMode}`}>
                {t('roomMode.prayerMode')}
            </span>
        );
    }

    // Add role badges
    if (isModerator) {
        badges.push(
            <span key="moderator" className={`${classes.badge} ${classes.moderatorBadge}`}>
                {t('videothumbnail.moderator')}
            </span>
        );
    }

    if (badges.length === 0) {
        return null;
    }

    return <div>{badges}</div>;
};

export default ModeBadgeLabel;