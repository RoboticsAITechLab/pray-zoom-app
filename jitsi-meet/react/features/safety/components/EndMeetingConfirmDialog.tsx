import React, { useState, useEffect } from 'react';
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
            fontSize: '20px',
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
        },

        confirmButton: {
            backgroundColor: theme.palette.actionDanger,
            color: theme.palette.uiBackground,
            '&:hover': {
                backgroundColor: theme.palette.actionDangerActive
            }
        },

        countdown: {
            fontSize: '14px',
            color: theme.palette.text03,
            marginTop: theme.spacing(1)
        }
    };
});

interface IProps {
    onCancel?: () => void;
    onConfirm: () => void;
}

/**
 * Dialog for confirming end meeting for all participants.
 *
 * @param {IProps} props - The props of the component.
 * @returns {ReactElement}
 */
function EndMeetingConfirmDialog({ onCancel, onConfirm }: IProps) {
    const { classes } = useStyles();
    const { t } = useTranslation();
    const [countdown, setCountdown] = useState(3);
    const [canConfirm, setCanConfirm] = useState(false);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanConfirm(true);
        }
    }, [countdown]);

    const handleConfirm = () => {
        if (canConfirm) {
            onConfirm();
        }
    };

    return (
        <Dialog
            onCancel={onCancel}
            onSubmit={handleConfirm}
            titleKey="safety.endMeetingConfirm"
            size="large">
            <div className={classes.container}>
                <div className={classes.title}>
                    {t('safety.endMeetingConfirm')}
                </div>

                <div className={classes.warning}>
                    ⚠️ {t('safety.endMeetingWarning')}
                </div>

                <div className={classes.message}>
                    {t('safety.endMeetingMessage')}
                </div>

                <div className={classes.buttonContainer}>
                    <Button
                        disabled={!canConfirm}
                        label={canConfirm ? t('safety.endMeeting') : `${t('safety.endMeeting')} (${countdown})`}
                        onClick={handleConfirm}
                        type={BUTTON_TYPES.DESTRUCTIVE} />
                </div>

                {!canConfirm && (
                    <div className={classes.countdown}>
                        {t('safety.waitBeforeConfirm', { seconds: countdown })}
                    </div>
                )}
            </div>
        </Dialog>
    );
}

export default EndMeetingConfirmDialog;