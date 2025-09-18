import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./Form.module.scss";
import { CalendarComponent, Input, PopoverComponent } from "microfrontend";

interface IFormInput {
    PLZ: string;
    Ort: string;
    Nr: string;
    StraBe: string;
    Adressangaben: string;
    Nachname: string;
    Vorname: string;
    Postfach_Nr: string;
    Postfach_PLZ: string;
    Postfach_Ort: string;
    Beginn_der_Nachsendung: Date;
    Wieder_zustellen_ab: Date;
    // Additional person fields
    Weitere_Vorname?: string;
    Weitere_Nachname?: string;
    Weitere_Vorname2?: string;
    Weitere_Nachname2?: string;
}

export const Form: React.FC = () => {
    const methods = useForm<IFormInput>();
    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        formState: { errors },
    } = methods;

    const [showCalendar, setShowCalendar] = useState(false);
    const [showRedeliverData, setShowRedeliverData] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [redeliverDate, setRedeliverDate] = useState<Date | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [moreUser, setMoreUser] = useState(false);

    const beginNachsendungRef = useRef<HTMLDivElement>(null!);
    const wiederZustellenRef = useRef<HTMLDivElement>(null!);

    const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
        console.log("data", data);
    };

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        setValue("Beginn_der_Nachsendung", date, { shouldValidate: true });
        clearErrors("Beginn_der_Nachsendung");
        setShowCalendar(false);
    };

    const handleRedeliverFromChange = (date: Date) => {
        setRedeliverDate(date);
        setValue("Wieder_zustellen_ab", date, { shouldValidate: true });
        clearErrors("Wieder_zustellen_ab");
        setShowRedeliverData(false);
    };

    const formatDate = (date: Date | null): string => {
        if (!date) return "";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const clearInputField = (fieldName: keyof IFormInput) => {
        setValue(fieldName, "" as any, { shouldValidate: true });
        if (fieldName === "Beginn_der_Nachsendung") {
            setSelectedDate(null);
        }
        if (fieldName === "Wieder_zustellen_ab") {
            setRedeliverDate(null);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formContainer}
            aria-labelledby="form-title"
            role="form"
        >
            <h1 id="form-title" className="visually-hidden">Nachsendungsauftrag Formular</h1>

            {/* Date Selection Section */}
            <fieldset>
                <legend className="fw-bold">Termin</legend>

                {/* Beginn der Nachsendung */}
                <div className={styles.datePickerContainer}>
                    <label htmlFor="Beginn_der_Nachsendung" className="visually-hidden">
                        Beginn der Nachsendung *
                    </label>
                    <div
                        role="button"
                        tabIndex={0}
                        className="rounded"
                        ref={beginNachsendungRef}
                        aria-haspopup="dialog"
                        aria-expanded={showCalendar}
                        onClick={() => setShowCalendar(!showCalendar)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setShowCalendar(!showCalendar);
                            }
                        }}
                    >
                        <Input
                            id="Beginn_der_Nachsendung"
                            type="text"
                            placeholder="Beginn der Nachsendung"
                            readOnly
                            value={formatDate(selectedDate)}
                            hasError={!!errors.Beginn_der_Nachsendung}
                            {...register("Beginn_der_Nachsendung", {
                                required: "Beginn der Nachsendung ist erforderlich",
                            })}
                            className="rounded"
                            onClear={() => clearInputField("Beginn_der_Nachsendung")}
                            aria-invalid={!!errors.Beginn_der_Nachsendung}
                            aria-describedby={
                                errors.Beginn_der_Nachsendung ? "error-Beginn_der_Nachsendung" : undefined
                            }
                        />
                    </div>

                    <PopoverComponent
                        open={showCalendar}
                        onClose={() => setShowCalendar(false)}
                        anchorRef={beginNachsendungRef}
                        placement="bottom"
                        strategy="fixed"
                    >
                        <CalendarComponent
                            onChange={handleDateChange}
                            isActive={showCalendar}
                            value={selectedDate}
                        />
                    </PopoverComponent>
                    {errors.Beginn_der_Nachsendung && (
                        <div id="error-Beginn_der_Nachsendung" className={styles.error_message}   role="alert">
                            {errors.Beginn_der_Nachsendung?.message}
                        </div>
                    )}
                </div>

                {/* Wieder zustellen ab */}
                <div className={styles.datePickerContainer}>
                    <label htmlFor="Wieder_zustellen_ab"  className="visually-hidden">
                        Wieder zustellen ab *
                    </label>
                    <div
                        role="button"
                        tabIndex={0}
                        className="rounded"
                        ref={wiederZustellenRef}
                        aria-haspopup="dialog"
                        aria-expanded={showRedeliverData}
                        onClick={() => setShowRedeliverData(!showRedeliverData)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setShowRedeliverData(!showRedeliverData);
                            }
                        }}
                    >
                        <Input
                            id="Wieder_zustellen_ab"
                            type="text"
                            placeholder="Wieder zustellen ab"
                            readOnly
                            value={formatDate(redeliverDate)}
                            hasError={!!errors.Wieder_zustellen_ab}
                            {...register("Wieder_zustellen_ab", {
                                required: "Wieder zustellen ab ist erforderlich",
                            })}
                            className="rounded"
                            onClear={() => clearInputField("Wieder_zustellen_ab")}
                            aria-invalid={!!errors.Wieder_zustellen_ab}
                            aria-describedby={
                                errors.Wieder_zustellen_ab ? "error-Wieder_zustellen_ab" : undefined
                            }
                        />
                    </div>
                    {errors.Wieder_zustellen_ab && (
                        <div id="error-Wieder_zustellen_ab" className={styles.error_message} role="alert">
                            {errors.Wieder_zustellen_ab?.message}
                        </div>
                    )}
                    <PopoverComponent
                        open={showRedeliverData}
                        onClose={() => setShowRedeliverData(false)}
                        anchorRef={wiederZustellenRef}
                        placement="bottom"
                        strategy="fixed"
                    >
                        <CalendarComponent
                            onChange={handleRedeliverFromChange}
                            isActive={showRedeliverData}
                            value={redeliverDate}
                        />
                    </PopoverComponent>
                </div>
            </fieldset>

            {/* Storage Duration Information */}
            <section className="py-4" aria-labelledby="storage-duration">
                <h2 id="storage-duration" className="fw-bold">Dauer der Lagerung</h2>
                <div className="fw-bold py-2">1 Monat</div>
                <div>
                    <span className="fw-bold">Wichtiger Hinweis:</span> In diesem Formular ist nur die
                    <span className="fw-bold"> Eingabe von Privatpersonen</span> möglich. Nutzen Sie das
                    Auftragsformular Lagerservice geschäftlich für die Lagerung Ihrer geschäftlichen Post.
                    Eine Kombination privater und geschäftlicher Aufträge ist nicht möglich.
                </div>
            </section>

            {/* Address Information */}
            <fieldset className={styles.Personal}>
                <legend className="fw-bold">Adressangaben</legend>

                <div className="fw-normal">Land</div>
                <div className="py-0">Deutschland</div>

                {/* PLZ and Ort */}
                <div className={styles.nameFieldsContainer} role="group" aria-labelledby="location-group">
                 

                    <div>
                        <label htmlFor="PLZ" className="visually-hidden">
                            PLZ *
                        </label>
                        <Input
                            id="PLZ"
                            type="text"
                            placeholder="PLZ"
                            hasError={!!errors.PLZ}
                            {...register("PLZ", { required: "PLZ ist erforderlich" })}
                            className="rounded-start"
                            onClear={() => clearInputField("PLZ")}
                            // aria-invalid={!!errors.PLZ}
                            aria-describedby={errors.PLZ ? "error-PLZ" : undefined}
                        />
                        {errors.PLZ && (
                            <div id="error-PLZ" className={styles.error_message}   role="alert">
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
                            <div id="error-Ort" className={styles.error_message}   role="alert">
                                {errors.Ort?.message}
                            </div>
                        )}
                    </div>
                </div>

                {/* Street and Number */}
                <div className={styles.address} role="group" aria-labelledby="street-group">
                  

                    <div>
                        <label htmlFor="StraBe"  className="visually-hidden">
                            Straße *
                        </label>
                        <Input
                            id="StraBe"
                            type="text"
                            placeholder="Straße"
                            hasError={!!errors.StraBe}
                            {...register("StraBe", {
                                required: "Straße ist erforderlich",
                            })}
                            className="rounded-start"
                            onClear={() => clearInputField("StraBe")}
                            aria-invalid={!!errors.StraBe}
                            aria-describedby={errors.StraBe ? "error-StraBe" : undefined}
                        />
                        {errors.StraBe && (
                            <div id="error-StraBe" className={styles.error_message}   role="alert">
                                {errors.StraBe?.message}
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="Nr"  className="visually-hidden">
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
                            <div id="error-Nr" className={styles.error_message}   role="alert">
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
                        <div id="error-Adressangaben" className={styles.error_message}   role="alert">
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
                                <div id="error-Postfach_Nr" className={styles.error_message}   role="alert">
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
                                    <div id="error-Postfach_PLZ" className={styles.error_message}   role="alert">
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
                                    <div id="error-Postfach_Ort" className={styles.error_message}   role="alert">
                                        {errors.Postfach_Ort?.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </section>

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
                        // errormessage={errors.Vorname?.message}
                    />
                    {errors.Vorname && (
                        <div id="error-Vorname" className={styles.error_message}   role="alert">
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
                        <div id="error-Nachname" className={styles.error_message}   role="alert">
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
                        <div id="error-Weitere_Vorname" className={styles.error_message}   role="alert">
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
                        <div id="error-Weitere_Nachname" className={styles.error_message}   role="alert">
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
                                    <div id="error-Weitere_Vorname2" className={styles.error_message}   role="alert">
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
                                    <div id="error-Weitere_Nachname2" className={styles.error_message}   role="alert">
                                        {errors.Weitere_Nachname2?.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </fieldset>

            <button type="submit" className={styles.submitButton}>
                Zur Beauftragung
            </button>
        </form>
    );
};