import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

import { Role } from '../../../roles/types';

const useStyles = makeStyles()((theme) => {
    return {
        badge: {
            display: 'inline-flex',
            alignItems: 'center',
            padding: '1px 6px',
            borderRadius: '8px',
            fontSize: '10px',
            fontWeight: 500,
            textTransform: 'uppercase',
            marginLeft: '4px',
            whiteSpace: 'nowrap'
        },

        founderBadge: {
            backgroundColor: theme.palette.link01,
            color: theme.palette.uiBackground
        },

        hostBadge: {
            backgroundColor: theme.palette.warning01,
            color: theme.palette.uiBackground
        },

        coHostBadge: {
            backgroundColor: theme.palette.success01,
            color: theme.palette.uiBackground
        },

        leaderBadge: {
            backgroundColor: theme.palette.action01,
            color: theme.palette.uiBackground
        }
    };
});

interface IProps {
    role: string;
}

/**
 * Component that displays a role badge for participants.
 *
 * @param {IProps} props - The props of the component.
 * @returns {ReactElement|null}
 */
const RoleBadge = ({ role }: IProps) => {
    const { classes } = useStyles();
    const { t } = useTranslation();

    if (role === Role.FOUNDER) {
        return (
            <span className={`${classes.badge} ${classes.founderBadge}`}>
                {t('roles.founder')}
            </span>
        );
    }

    if (role === Role.HOST) {
        return (
            <span className={`${classes.badge} ${classes.hostBadge}`}>
                {t('roles.host')}
            </span>
        );
    }

    if (role === Role.CO_HOST) {
        return (
            <span className={`${classes.badge} ${classes.coHostBadge}`}>
                {t('roles.coHost')}
            </span>
        );
    }

    if (role === Role.LEADER) {
        return (
            <span className={`${classes.badge} ${classes.leaderBadge}`}>
                {t('roles.leader')}
            </span>
        );
    }

    return null;
};

export default RoleBadge;