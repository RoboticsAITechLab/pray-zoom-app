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

        consequences: {
            backgroundColor: theme.palette.ui03,
            padding: theme.spacing(2),
            borderRadius: '8px',
            marginBottom: theme.spacing(3),
            fontSize: '14px',
            lineHeight: 1.4
        },

        buttonContainer: {
            display: 'flex',
            gap: theme.spacing(2),
            justifyContent: 'center'
        }
    };
});

interface IProps {
    onCancel?: () => void;
    onConfirm: () => void;
}

/**
 * Dialog for warning about mode changes from EXAM to MEET.
 *
 * @param {IProps} props - The props of the component.
 * @returns {ReactElement}
 */
function ModeChangeWarningDialog({ onCancel, onConfirm }: IProps) {
    const { classes } = useStyles();
    const { t } = useTranslation();

    return (
        <Dialog
            onCancel={onCancel}
            onSubmit={onConfirm}
            titleKey="safety.modeChangeWarning"
            size="large">
            <div className={classes.container}>
                <div className={classes.title}>
                    {t('safety.modeChangeWarning')}
                </div>

                <div className={classes.warning}>
                    ⚠️ {t('safety.examToMeetWarning')}
                </div>

                <div className={classes.message}>
                    {t('safety.examToMeetMessage')}
                </div>

                <div className={classes.consequences}>
                    <strong>{t('safety.whatWillChange')}:</strong>
                    <ul>
                        <li>{t('safety.change1')}</li>
                        <li>{t('safety.change2')}</li>
                        <li>{t('safety.change3')}</li>
                        <li>{t('safety.change4')}</li>
                    </ul>
                </div>

                <div className={classes.buttonContainer}>
                    <Button
                        label={t('safety.confirmChange')}
                        onClick={onConfirm}
                        type={BUTTON_TYPES.PRIMARY} />
                    <Button
                        label={t('safety.keepExamMode')}
                        onClick={onCancel}
                        type={BUTTON_TYPES.SECONDARY} />
                </div>
            </div>
        </Dialog>
    );
}

export default ModeChangeWarningDialog;