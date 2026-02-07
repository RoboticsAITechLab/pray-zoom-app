import React, { useState } from 'react';
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

        restrictions: {
            backgroundColor: theme.palette.ui03,
            padding: theme.spacing(2),
            borderRadius: '8px',
            marginBottom: theme.spacing(3),
            fontSize: '14px',
            lineHeight: 1.4
        },

        checkbox: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: theme.spacing(2),
            fontSize: '14px'
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
 * Dialog for confirming exam mode enablement.
 *
 * @param {IProps} props - The props of the component.
 * @returns {ReactElement}
 */
function ExamModeConfirmDialog({ onCancel, onConfirm }: IProps) {
    const { classes } = useStyles();
    const { t } = useTranslation();
    const [confirmed, setConfirmed] = useState(false);

    const handleConfirm = () => {
        if (confirmed) {
            onConfirm();
        }
    };

    return (
        <Dialog
            onCancel={onCancel}
            onSubmit={handleConfirm}
            titleKey="safety.enableExamMode"
            size="large">
            <div className={classes.container}>
                <div className={classes.title}>
                    {t('safety.enableExamMode')}
                </div>

                <div className={classes.warning}>
                    ⚠️ {t('safety.examModeWarning')}
                </div>

                <div className={classes.message}>
                    {t('safety.examModeMessage')}
                </div>

                <div className={classes.restrictions}>
                    <strong>{t('safety.examModeRestrictions')}:</strong>
                    <ul>
                        <li>{t('safety.restriction1')}</li>
                        <li>{t('safety.restriction2')}</li>
                        <li>{t('safety.restriction3')}</li>
                        <li>{t('safety.restriction4')}</li>
                    </ul>
                </div>

                <div className={classes.checkbox}>
                    <input
                        checked={confirmed}
                        id="exam-confirm"
                        onChange={(e) => setConfirmed(e.target.checked)}
                        type="checkbox" />
                    <label htmlFor="exam-confirm" style={{ marginLeft: '8px' }}>
                        {t('safety.confirmExamMode')}
                    </label>
                </div>

                <div className={classes.buttonContainer}>
                    <Button
                        disabled={!confirmed}
                        label={t('safety.enableExamMode')}
                        onClick={handleConfirm}
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

export default ExamModeConfirmDialog;