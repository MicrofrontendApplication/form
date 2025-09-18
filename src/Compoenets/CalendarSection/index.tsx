import React from "react";
import {
  Controller,
  FieldErrors,
  UseFormClearErrors,
  Control,
  UseFormGetValues,
} from "react-hook-form";
import { BootstrapOverlay } from "microfrontend";
import { IFormInput } from "../../types/FormTypes";
import styles from "./calendar.module.scss";

interface CalendarSectionProps {
  control: Control<IFormInput>;
  clearErrors: UseFormClearErrors<IFormInput>;
  errors: FieldErrors<IFormInput>;
  getValues: UseFormGetValues<IFormInput>; // 👈 add this
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  control,
  clearErrors,
  errors,
  getValues
}) => {
  return (
    <fieldset>
      <legend className="fw-bold">Termin</legend>

      {/* Beginn der Nachsendung */}
      <div className={styles.datePickerContainer}>
        <Controller
          control={control}

          name="Beginn_der_Nachsendung"
          rules={{ required: "Beginn der Nachsendung ist erforderlich" }}
          render={({ field }) => (
            <BootstrapOverlay
              mode="single"
              label="Beginn der Nachsendung"
              ariaInvalid={!!errors.Beginn_der_Nachsendung}
              startMonth={new Date(2024, 6)}
              endMonth={new Date(2025, 11)}
              onDateChange={(date) => {
                field.onChange(date);
                clearErrors("Beginn_der_Nachsendung");
              }}
              required={true}
              error={
                errors.Beginn_der_Nachsendung?.message || undefined
              }
            />
          )}
        />
        {errors.Beginn_der_Nachsendung && (
          <div className="text-danger">
            {errors.Beginn_der_Nachsendung.message}
          </div>
        )}
      </div>

      {/* Wieder zustellen ab */}
      <div className={styles.datePickerContainer}>
        <Controller
          control={control}
          name="Wieder_zustellen_ab"
          rules={{
            required: "Wieder zustellen ab ist erforderlich",
            validate: (value) => {
              const beginnDate = getValues("Beginn_der_Nachsendung");
              if (beginnDate && value && new Date(value) <= new Date(beginnDate)) {
                return "Wieder zustellen ab muss nach dem Beginn der Nachsendung liegen";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <BootstrapOverlay
              mode="single"
              label="Wieder zustellen ab"
              required
              ariaInvalid={!!errors.Wieder_zustellen_ab}
              startMonth={new Date(2024, 6)}
              endMonth={new Date(2025, 11)}
              onDateChange={(date) => {
                field.onChange(date);
                clearErrors("Wieder_zustellen_ab");
              }}
              
              error={
                errors.Wieder_zustellen_ab?.message || undefined
              }
            />
          )}
        />
        {errors.Wieder_zustellen_ab && (
          <div className="text-danger">
            {errors.Wieder_zustellen_ab.message}
          </div>
        )}
      </div>
    </fieldset>
  );
};
