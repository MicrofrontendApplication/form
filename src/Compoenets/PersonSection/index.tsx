import React, { useState } from "react";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { Input } from "microfrontend";
import { IFormInput } from "../../types/FormTypes";
import styles from "./PersonSection.module.scss";

interface PersonSectionProps {
    register: UseFormRegister<IFormInput>;
    setValue: UseFormSetValue<IFormInput>;
    errors: FieldErrors<IFormInput>;
}

export const PersonSection: React.FC<PersonSectionProps> = ({
    register,
    setValue,
    errors,
}) => {
    const [moreUser, setMoreUser] = useState(false);

    const clearInputField = (fieldName: keyof IFormInput) => {
        setValue(fieldName, "" as any, { shouldValidate: true });
    };

    return (
        <>
            {/* Person Information */}
            <fieldset>
                <legend className="fw-bold py-4">Auftrag für folgende Person</legend>

                <div>
                    <label htmlFor="Vorname" className="visually-hidden">
                        Vorname *
                    </label>
                    <Input
                        id="Vorname"
                        type="text"
                        placeholder="Vorname"
                        hasError={!!errors.Vorname}
                        {...register("Vorname", { required: "Vorname ist erforderlich" })}
                        className="rounded"
                        onClear={() => clearInputField("Vorname")}
                        aria-invalid={!!errors.Vorname}
                        aria-describedby={errors.Vorname ? "error-Vorname" : undefined}
                    />
                    {errors.Vorname && (
                        <div id="error-Vorname" className={styles.error_message} role="alert">
                            {errors.Vorname?.message}
                        </div>
                    )}
                </div>

                <div className="py-2">
                    <label htmlFor="Nachname" className="visually-hidden">
                        Nachname *
                    </label>
                    <Input
                        id="Nachname"
                        type="text"
                        placeholder="Nachname"
                        hasError={!!errors.Nachname}
                        {...register("Nachname", { required: "Nachname ist erforderlich" })}
                        className="rounded"
                        onClear={() => clearInputField("Nachname")}
                        aria-invalid={!!errors.Nachname}
                        aria-describedby={errors.Nachname ? "error-Nachname" : undefined}
                    />
                    {errors.Nachname && (
                        <div id="error-Nachname" className={styles.error_message} role="alert">
                            {errors.Nachname?.message}
                        </div>
                    )}
                </div>
            </fieldset>

            {/* Additional Persons Section */}
            <fieldset>
                <legend className="fw-bold py-2">Weitere Personen</legend>

                {/* First Additional Person - Always visible */}
                <div>
                    <label htmlFor="Weitere_Vorname" className="visually-hidden">
                        Vorname
                    </label>
                    <Input
                        id="Weitere_Vorname"
                        type="text"
                        placeholder="Vorname"
                        hasError={!!errors.Weitere_Vorname}
                        {...register("Weitere_Vorname")}
                        className="rounded"
                        onClear={() => clearInputField("Weitere_Vorname")}
                        aria-invalid={!!errors.Weitere_Vorname}
                        aria-describedby={errors.Weitere_Vorname ? "error-Weitere_Vorname" : undefined}
                    />
                    {errors.Weitere_Vorname && (
                        <div id="error-Weitere_Vorname" className={styles.error_message} role="alert">
                            {errors.Weitere_Vorname?.message}
                        </div>
                    )}
                </div>

                <div className="py-2">
                    <label htmlFor="Weitere_Nachname" className="visually-hidden">
                        Nachname
                    </label>
                    <Input
                        id="Weitere_Nachname"
                        type="text"
                        placeholder="Nachname"
                        hasError={!!errors.Weitere_Nachname}
                        {...register("Weitere_Nachname")}
                        className="rounded"
                        onClear={() => clearInputField("Weitere_Nachname")}
                        aria-invalid={!!errors.Weitere_Nachname}
                        aria-describedby={errors.Weitere_Nachname ? "error-Weitere_Nachname" : undefined}
                    />
                    {errors.Weitere_Nachname && (
                        <div id="error-Weitere_Nachname" className={styles.error_message} role="alert">
                            {errors.Weitere_Nachname?.message}
                        </div>
                    )}
                </div>
                
                {/* Expandable Additional Persons */}
                <div>
                    <button
                        type="button"
                        onClick={() => setMoreUser((prev) => !prev)}
                        className={styles.addresssubheading}
                        aria-expanded={moreUser}
                        aria-controls="additional-persons"
                    >
                        {moreUser ? "- Weitere Personen hinzufügen" : "+ Weitere Personen hinzufügen"}
                    </button>

                    {moreUser && (
                        <div id="additional-persons" role="region" aria-label="Zusätzliche Personen">
                            <div>
                                <label htmlFor="Weitere_Vorname2" className="visually-hidden">
                                    Vorname
                                </label>
                                <Input
                                    id="Weitere_Vorname2"
                                    type="text"
                                    placeholder="Vorname"
                                    hasError={!!errors.Weitere_Vorname2}
                                    {...register("Weitere_Vorname2")}
                                    className="rounded"
                                    onClear={() => clearInputField("Weitere_Vorname2")}
                                    aria-invalid={!!errors.Weitere_Vorname2}
                                    aria-describedby={errors.Weitere_Vorname2 ? "error-Weitere_Vorname2" : undefined}
                                />
                                {errors.Weitere_Vorname2 && (
                                    <div id="error-Weitere_Vorname2" className={styles.error_message} role="alert">
                                        {errors.Weitere_Vorname2?.message}
                                    </div>
                                )}
                            </div>

                            <div className="py-2">
                                <label htmlFor="Weitere_Nachname2" className="visually-hidden">
                                    Nachname
                                </label>
                                <Input
                                    id="Weitere_Nachname2"
                                    type="text"
                                    placeholder="Nachname"
                                    hasError={!!errors.Weitere_Nachname2}
                                    {...register("Weitere_Nachname2")}
                                    className="rounded"
                                    onClear={() => clearInputField("Weitere_Nachname2")}
                                    aria-invalid={!!errors.Weitere_Nachname2}
                                    aria-describedby={errors.Weitere_Nachname2 ? "error-Weitere_Nachname2" : undefined}
                                />
                                {errors.Weitere_Nachname2 && (
                                    <div id="error-Weitere_Nachname2" className={styles.error_message} role="alert">
                                        {errors.Weitere_Nachname2?.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </fieldset>
        </>
    );
};