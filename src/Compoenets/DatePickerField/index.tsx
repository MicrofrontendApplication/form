import React, { useRef, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import {
  PopoverComponent,
  FloatingDateField,
  MyDayPicker,
} from "microfrontend";
import { INachsendungFormInput } from "../../types/FormTypes";
import styles from "./DatePickerField.module.scss";

type mdsDateRange = {
    from: Date | undefined;
    to?: Date | undefined;
}
interface DatePickerFieldProps {
  register: UseFormRegister<INachsendungFormInput>;
  errors: FieldErrors<INachsendungFormInput>;
  setValue: UseFormSetValue<INachsendungFormInput>;
  clearInputField: (fieldName: keyof INachsendungFormInput) => void;
  fieldName?: keyof INachsendungFormInput;
  control: Control<INachsendungFormInput>;
  clearErrors: UseFormClearErrors<INachsendungFormInput>;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  errors,
  setValue,
  fieldName = "Datum",
  control,
  clearErrors
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<
    mdsDateRange | undefined
  >();
  const datePickerRef = useRef<HTMLDivElement>(null!);
  const [isEmailToggleOn, setIsEmailToggleOn] = useState(false);

  const formatDateRange = (range?: mdsDateRange): string => {
    if (!range || !range.from) return "";
    const format = (date: Date) =>
      `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.${date.getFullYear()}`;
    const { from, to } = range;

    return to ? `${format(from)} - ${format(to)}` : `${format(from)}`;
  };

  const handleDateChange = (range: mdsDateRange | undefined) => {
    {
      if (!range) return;

      const { from, to } = range;

      if (from && to && from.getTime() === to.getTime()) {
        const newRange = { from }; 
        setSelectedDateRange(newRange);
      } else {
        setSelectedDateRange(range);
      }

    
      if (from && to && from.getTime() !== to.getTime()) {
        setShowCalendar(false);
        setValue('Datum',selectedDateRange);
      clearErrors("Datum");
      }
    }
  };

  return (
    <>
      <legend className="fw-bold py-4">Laufzeit: 6 Monate</legend>
      <h5>Termin</h5>

      <div className={styles.datePickerContainer} ref={datePickerRef}>
        <Controller
          control={control}
          name={fieldName}
          rules={{ required: "Datum ist erforderlich" }}
          render={() => (
            <>
              <FloatingDateField
                label="Datum"
                value={formatDateRange(selectedDateRange)}
                required
                iconRef={datePickerRef}
                onIconClick={() => setShowCalendar((prev) => !prev)}
                error={errors.Datum?.message}
                format="TT.MM.JJJJ - TT.MM.JJJJ"
                ariaDescribedBy={
                  errors?.Datum ? `error-Datum` : undefined
                }
                ariaInvalid={!!errors?.Datum}
              />

              <PopoverComponent
                open={showCalendar}
                onClose={() => setShowCalendar(false)}
                anchorRef={datePickerRef}
                placement="bottom"
                strategy="fixed"
                aria-modal="true"
                aria-label="Datum auswählen"
              >
                <MyDayPicker
                  mode="range"
                  selected={selectedDateRange}
                  onSelect={handleDateChange}
                  startMonth={new Date(2024, 6)}
                  endMonth={new Date(2025, 11)}
                />
              </PopoverComponent>
            </>
          )}
        />
        {errors?.[fieldName] && (
          <div
            id={`error-${fieldName}`}
            className={styles.error_message}
            role="alert"
          >
            {errors.Datum?.message}
          </div>
        )}
      </div>

      {/* Explanation block */}
      <div className="p-3" role="region" aria-labelledby="explanation-heading">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 id="explanation-heading" className="mb-0">
            Explanation
          </h2>
          <label
            htmlFor="email-toggle"
            className={`${styles.toggleSwitch} mb-0`}
          >
            <input
              id="email-toggle"
              type="checkbox"
              className={styles.toggleInput}
              checked={isEmailToggleOn}
              onChange={() => setIsEmailToggleOn((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setIsEmailToggleOn((prev) => !prev);
                }
              }}
              aria-labelledby="toggle-label"
            />
            <span className={styles.slider} aria-hidden="true" />
          </label>
        </div>
        <p>
          Starting a paragraph the right way is vital to keeping your readers
          engaged...
        </p>
      </div>
    </>
  );
};

