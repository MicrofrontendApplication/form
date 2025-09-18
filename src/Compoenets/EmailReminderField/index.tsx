import React, { useState } from 'react';
import { Input } from 'microfrontend';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { INachsendungFormInput } from "./../../types/FormTypes";
import styles from './emailReminder.module.scss'; // ✅ Correct import

interface EmailReminderFieldProps {
    register: UseFormRegister<INachsendungFormInput>;
    errors: FieldErrors<INachsendungFormInput>;
    clearInputField: (fieldName: string) => void;
  
    initialToggleState?: boolean;
}

const EmailReminderField: React.FC<EmailReminderFieldProps> = ({
    register,
    errors,
    clearInputField,

    initialToggleState = false
}) => {
    const [isToggleEnabled, setIsToggleEnabled] = useState(initialToggleState);

    const handleToggleChange = () => {
        const newState = !isToggleEnabled;
        setIsToggleEnabled(newState);
       
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center my-4">
                <h6 id="email-reminder-heading">E-Mail Erinnerung zum Ablauf des Nachsendeservice</h6>

                <div className={styles.emailToggleWrapper}>
                    <label
                        htmlFor="email-reminder-toggle"
                        className={styles.emailToggleSwitch}
                    >
                        <span id="email-toggle-label" className="visually-hidden">
                            E-Mail Erinnerung aktivieren
                        </span>
                        <input
                            id="email-reminder-toggle"
                            type="checkbox"
                            checked={isToggleEnabled}
                            onChange={handleToggleChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleToggleChange();
                                }
                            }}
                            aria-labelledby="email-toggle-label"
                            aria-checked={isToggleEnabled}
                            role="switch"
                            className={styles.emailToggleInput}
                        />
                        <span className={styles.emailToggleSlider} aria-hidden="true" />
                    </label>

                </div>
            </div>

            <div>
                Ich möchte eine Erinnerung zum Ende meines Lagerservices via E-Mail an
                die hier angegebene E-Mail-Adresse erhalten. Ich willige zudem ein, nach
                Ablauf des Lagerauftrages einmalig eine E-Mail zu erhalten, die dazu
                genutzt werden darf, mich um mein Feedback zum Lagerservice zu bitten
                und mich auf weitere interessante Angebote der Deutsche Post AG
                hinzuweisen. Ich kann diese Einwilligung jederzeit mit Wirkung für die
                Zukunft widerrufen. Eine Mitteilung per E-Mail an service@shop.deutschepost.de
                ist hierfür ausreichend.
            </div>

            <div className="py-2">
                <label htmlFor="Email" className="visually-hidden">
                    Email
                </label>
                <Input
                    id="Email"
                    type="text"
                    placeholder="Email Addresse (Optional)"
                    hasError={!!errors.Email}
                    {...register("Email")}
                    className="rounded"
                    onClear={() => clearInputField("Email")}
                    aria-invalid={!!errors.Email}
                    aria-describedby={errors.Email ? "error-Email" : undefined}
                />
                {errors.Email && (
                    <div id="error-Email" className={styles.errorMessage} role="alert">
                        {errors.Email.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailReminderField;
