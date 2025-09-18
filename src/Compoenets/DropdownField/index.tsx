import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { DropDown } from "microfrontend";
import { INachsendungFormInput } from "./../../types/FormTypes";
import styles from "./DropDown.module.scss";

interface DropdownFieldProps {
  control: Control<INachsendungFormInput>;
  errors: FieldErrors<INachsendungFormInput>;
  options: string[];
}

export const DropdownField: React.FC<DropdownFieldProps> = ({
  control,
  errors,
  options,
}) => {
  const hasError = !!errors.Grund;
  const errorId = hasError ? "error-Grund" : undefined;

  return (
    <fieldset
      className={styles.dropdownContainer}
      role="group"
      aria-labelledby="grund-label"
    >
      <legend className="visually-hidden">Grund der Nachsendung</legend>

      <label id="grund-label" htmlFor="Grund" className="form-label">
        Grund <span aria-hidden="true">*</span>
      </label>

      <Controller
        control={control}
        name="Grund"
        rules={{ required: "Bitte wählen Sie einen Grund aus" }}
        render={({ field }) => (
          <DropDown
            id="Grund"
            options={options}
            placeholder="Grund"
            onSelect={(value) => field.onChange(value)}
            aria-required="true"
            aria-invalid={hasError}
            aria-describedby={errorId}
            aria-labelledby="grund-label"
          
          />
        )}
      />

      {hasError && (
        <div
          id={errorId}
          className={styles.error_message}
          role="alert"
          aria-live="assertive"
        >
          {errors.Grund?.message}
        </div>
      )}
    </fieldset>
  );
};
