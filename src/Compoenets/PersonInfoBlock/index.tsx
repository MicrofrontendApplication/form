import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "microfrontend";
import { INachsendungFormInput } from "./../../types/FormTypes";
import styles from "./PersonInfoBlock.module.scss";

interface PersonInfoBlockProps {
  register: UseFormRegister<INachsendungFormInput>;
  errors: FieldErrors<INachsendungFormInput>;
  clearInputField: (fieldName: keyof INachsendungFormInput) => void;
  title?: string;
}

export const PersonInfoBlock: React.FC<PersonInfoBlockProps> = ({
  register,
  errors,
  clearInputField,
  title = "Auftrag für folgende Person",
}) => {
  return (
    <fieldset>
      <legend className="fw-bold py-4">{title}</legend>

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
          aria-required
        />
        {errors.Vorname && (
          <div
            id="error-Vorname"
            className={styles.error_message}
            role="alert"
          >
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
          <div
            id="error-Nachname"
            className={styles.error_message}
            role="alert"
          >
            {errors.Nachname?.message}
          </div>
        )}
      </div>
    </fieldset>
  );
};