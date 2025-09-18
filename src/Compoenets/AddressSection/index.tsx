import React, { useState } from "react";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { Input } from "microfrontend";
import { IFormInput } from "../../types/FormTypes";
import styles from "./AddressSection.module.scss";

interface AddressSectionProps {
    register: UseFormRegister<IFormInput>;
    setValue: UseFormSetValue<IFormInput>;
    errors: FieldErrors<IFormInput>;
}

export const AddressSection: React.FC<AddressSectionProps> = ({
    register,
    setValue,
    errors,
}) => {
    const [showForm, setShowForm] = useState(false);
    const [plzValue, setPlzValue] = useState("");
    const [strabe, setStrabe] = useState('')
    const clearInputField = (fieldName: keyof IFormInput) => {
        setValue(fieldName, "" as any, { shouldValidate: true });
        if (fieldName === "PLZ") setPlzValue("");
        if (fieldName === 'StraBe') setStrabe('')
    };



    const mindropdownwidth = 300;
    const maxdropdownwidth = 530;


    return (
        <>
            {/* Address Information */}
            <fieldset className={styles.Personal}>
                <legend className="fw-bold">Adressangaben</legend>

                <div className="fw-normal">Land</div>
                <div className="py-0">Deutschland</div>

                {/* PLZ and Ort */}
                <div className={styles.nameFieldsContainer} role="group" aria-labelledby="location-group">
                    <div className={styles.inputWrapper}>
                        <label htmlFor="PLZ" className="visually-hidden">
                            PLZ *
                        </label>
                        <Input
                            id="PLZ"
                            type="text"
                            placeholder="PLZ"
                            hasError={!!errors.PLZ}
                            {...register("PLZ", {
                                required: "PLZ ist erforderlich",
                                onChange: (e) => setPlzValue(e.target.value),
                            },)}
                            className={`rounded-start `}
                            onClear={() => clearInputField("PLZ")}
                            aria-describedby={errors.PLZ ? "error-PLZ" : undefined}
                            required
                        />
                        {plzValue && (
                            <div className={styles.floatingBox} style={{
                                minWidth: mindropdownwidth ? `${mindropdownwidth}px` : '100%',
                                maxWidth: maxdropdownwidth ? `${maxdropdownwidth}px` : '100%'
                            }}
                            >
                                {plzValue} </div>
                        )}
                        {errors.PLZ && (
                            <div id="error-PLZ" className={styles.error_message} role="alert">
                                {errors.PLZ?.message}
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="Ort" className="visually-hidden">
                            Ort *
                        </label>
                        <Input
                            id="Ort"
                            type="text"
                            placeholder="Ort"
                            hasError={!!errors.Ort}
                            {...register("Ort", { required: "Ort ist erforderlich" })}
                            className="rounded-end"
                            onClear={() => clearInputField("Ort")}
                            aria-invalid={!!errors.Ort}
                            aria-describedby={errors.Ort ? "error-Ort" : undefined}
                        />
                        {errors.Ort && (
                            <div id="error-Ort" className={styles.error_message} role="alert">
                                {errors.Ort?.message}
                            </div>
                        )}
                    </div>
                </div>

                {/* Street and Number */}
                <div className={styles.address} role="group" aria-labelledby="street-group">
                    <div className={styles.inputWrapper}>
                        <label htmlFor="StraBe" className="visually-hidden">
                            Straße *
                        </label>
                        <Input
                            id="StraBe"
                            type="text"
                            placeholder="Straße"
                            hasError={!!errors.StraBe}
                            {...register("StraBe", {
                                required: "Straße ist erforderlich",
                                onChange: (e) => setStrabe(e.target.value)
                            })}
                            className="rounded-start"
                            onClear={() => clearInputField("StraBe")}
                            aria-invalid={!!errors.StraBe}
                            aria-describedby={errors.StraBe ? "error-StraBe" : undefined}
                        />
                        {strabe && (
                            <div className={styles.floatingBox}
                                style={{
                                    minWidth: mindropdownwidth ? `${mindropdownwidth}px` : '100%',
                                    maxWidth: maxdropdownwidth ? `${maxdropdownwidth}px` : '100%'
                                }}>{strabe} </div>
                        )}
                        {errors.StraBe && (
                            <div id="error-StraBe" className={styles.error_message} role="alert">
                                {errors.StraBe?.message}
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="Nr" className="visually-hidden">
                            Nr. *
                        </label>
                        <Input
                            id="Nr"
                            type="text"
                            inputMode="text"
                            placeholder="Nr"
                            hasError={!!errors.Nr}
                            {...register("Nr", {
                                required: "Nr ist erforderlich",
                            })}
                            className="rounded-end"
                            onClear={() => clearInputField("Nr")}
                            aria-invalid={!!errors.Nr}
                            aria-describedby={errors.Nr ? "error-Nr" : undefined}
                        />
                        {errors.Nr && (
                            <div id="error-Nr" className={styles.error_message} role="alert">
                                {errors.Nr?.message}
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Address Information */}
                <div className="py-2">
                    <label htmlFor="Adressangaben" className="visually-hidden">
                        Adresszusatz
                    </label>
                    <Input
                        id="Adressangaben"
                        type="text"
                        placeholder="Adresszusatz - z.B. 3. Stock, c/o..."
                        hasError={!!errors.Adressangaben}
                        {...register("Adressangaben")}
                        className="rounded"
                        onClear={() => clearInputField("Adressangaben")}
                        aria-invalid={!!errors.Adressangaben}
                        aria-describedby={errors.Adressangaben ? "error-Adressangaben" : undefined}
                    />
                    {errors.Adressangaben && (
                        <div id="error-Adressangaben" className={styles.error_message} role="alert">
                            {errors.Adressangaben?.message}
                        </div>
                    )}
                </div>
            </fieldset>

            {/* Expandable PO Box Section */}
            <section role="region" aria-labelledby="postbox-section">
                <button
                    type="button"
                    onClick={() => setShowForm((prev) => !prev)}
                    className={styles.addresssubheading}
                    aria-expanded={showForm}
                    aria-controls="expandable-address"
                    id="postbox-section"
                >
                    {showForm ? "- Zusätzlich Postfach" : "+ Zusätzlich Postfach"}
                </button>

                {showForm && (
                    <div
                        className={`${styles.expandableContainer} ${showForm ? styles.open : styles.closed}`}
                        id="expandable-address"
                        role="region"
                        aria-labelledby="postbox-section"
                    >
                        <div className="fw-bold py-4">Bitte beachten:</div>
                        <ul>
                            <li>Bei Angabe eines Postfachs ist die zusätzliche Angabe einer Hausanschrift zwingend erforderlich.</li>
                            <li>Eine Nachsendung an ein Postfach ist nur für Personen oder Firmen möglich, die bei diesem Postfach auch als Inhaber oder Mitnutzer eingetragen sind.</li>
                        </ul>

                        <div className={styles.inputRow}>
                            <label htmlFor="Postfach_Nr" className="fw-normal">
                                Postfach Nr. *
                            </label>
                            <Input
                                id="Postfach_Nr"
                                type="text"
                                placeholder="Postfach Nr."
                                hasError={!!errors.Postfach_Nr}
                                {...register("Postfach_Nr")}
                                className="rounded"
                                onClear={() => clearInputField("Postfach_Nr")}
                                aria-invalid={!!errors.Postfach_Nr}
                                aria-describedby={errors.Postfach_Nr ? "error-Postfach_Nr" : undefined}
                            />
                            {errors.Postfach_Nr && (
                                <div id="error-Postfach_Nr" className={styles.error_message} role="alert">
                                    {errors.Postfach_Nr?.message}
                                </div>
                            )}
                        </div>

                        <div className={styles.addressForm} role="group" aria-labelledby="postbox-location">
                            <h3 id="postbox-location" className="visually-hidden">Postfach Standort</h3>

                            <div>
                                <label htmlFor="Postfach_PLZ" className="visually-hidden">
                                    Postfach PLZ
                                </label>
                                <Input
                                    id="Postfach_PLZ"
                                    type="text"
                                    placeholder="Postfach PLZ"
                                    hasError={!!errors.Postfach_PLZ}
                                    {...register("Postfach_PLZ")}
                                    className="rounded-start"
                                    onClear={() => clearInputField("Postfach_PLZ")}
                                    aria-invalid={!!errors.Postfach_PLZ}
                                    aria-describedby={errors.Postfach_PLZ ? "error-Postfach_PLZ" : undefined}
                                />
                                {errors.Postfach_PLZ && (
                                    <div id="error-Postfach_PLZ" className={styles.error_message} role="alert">
                                        {errors.Postfach_PLZ?.message}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="Postfach_Ort" className="visually-hidden">
                                    Postfach Ort
                                </label>
                                <Input
                                    id="Postfach_Ort"
                                    type="text"
                                    placeholder="Postfach Ort"
                                    hasError={!!errors.Postfach_Ort}
                                    {...register("Postfach_Ort")}
                                    className="rounded-end"
                                    onClear={() => clearInputField("Postfach_Ort")}
                                    aria-invalid={!!errors.Postfach_Ort}
                                    aria-describedby={errors.Postfach_Ort ? "error-Postfach_Ort" : undefined}
                                />
                                {errors.Postfach_Ort && (
                                    <div id="error-Postfach_Ort" className={styles.error_message} role="alert">
                                        {errors.Postfach_Ort?.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};