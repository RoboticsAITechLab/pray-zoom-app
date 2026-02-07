import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

import Dialog from '../../base/ui/components/web/Dialog';
import Button from '../../base/ui/components/web/Button';
import { BUTTON_TYPES } from '../../base/ui/constants.web';

const useStyles = makeStyles()((theme) => {
    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(3)
        },

        title: {
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: theme.spacing(2),
            color: theme.palette.text01
        },

        message: {
            textAlign: 'center',
            marginBottom: theme.spacing(3),
            color: theme.palette.text02
        },

        warning: {
            backgroundColor: theme.palette.warning01,
            color: theme.palette.uiBackground,
            padding: theme.spacing(2),
            borderRadius: '8px',
            marginBottom: theme.spacing(3),
            textAlign: 'center',
            fontWeight: 500
        },

        buttonContainer: {
            display: 'flex',
            gap: theme.spacing(2),
            justifyContent: 'center'
        }
    };
});

interface IProps {
    action: string;
    onCancel?: () => void;
    onConfirm: () => void;
    participantId: string;
}

/**
 * Dialog for confirming role changes.
 *
 * @param {IProps} props - The props of the component.
 * @returns {ReactElement}
 */
function RoleChangeConfirmDialog({ action, onCancel, onConfirm, participantId }: IProps) {
    const { classes } = useStyles();
    const { t } = useTranslation();

    const getActionText = () => {
        switch (action) {
        case 'ROLES_REMOVE_HOST':
            return t('safety.removeHost');
        case 'ROLES_REMOVE_CO_HOST':
            return t('safety.removeCoHost');
        case 'ROLES_REMOVE_LEADER':
            return t('safety.removeLeader');
        case 'ROLES_SET_FOUNDER':
            return t('safety.setFounder');
        default:
            return t('safety.roleChange');
        }
    };

    const getWarningText = () => {
        switch (action) {
        case 'ROLES_REMOVE_HOST':
            return t('safety.removeHostWarning');
        case 'ROLES_REMOVE_CO_HOST':
            return t('safety.removeCoHostWarning');
        case 'ROLES_REMOVE_LEADER':
            return t('safety.removeLeaderWarning');
        case 'ROLES_SET_FOUNDER':
            return t('safety.setFounderWarning');
        default:
            return t('safety.roleChangeWarning');
        }
    };

    return (
        <Dialog
            onCancel={onCancel}
            onSubmit={onConfirm}
            titleKey="safety.roleChangeConfirm"
            size="large">
            <div className={classes.container}>
                <div className={classes.title}>
                    {t('safety.roleChangeConfirm')}
                </div>

                <div className={classes.warning}>
                    ⚠️ {getWarningText()}
                </div>

                <div className={classes.message}>
                    {t('safety.roleChangeMessage', { action: getActionText() })}
                </div>

                <div className={classes.buttonContainer}>
                    <Button
                        label={t('safety.confirm')}
                        onClick={onConfirm}
                        type={BUTTON_TYPES.PRIMARY} />
                    <Button
                        label={t('safety.cancel')}
                        onClick={onCancel}
                        type={BUTTON_TYPES.SECONDARY} />
                </div>
            </div>
        </Dialog>
    );
}

export default RoleChangeConfirmDialog;