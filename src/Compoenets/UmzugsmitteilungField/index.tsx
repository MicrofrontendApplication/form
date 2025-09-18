import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { INachsendungFormInput } from "./../../types/FormTypes";
interface UmzugsmitteilungFieldProps {
  register: UseFormRegister<INachsendungFormInput>;
  errors: FieldErrors<INachsendungFormInput>;
  selected: string;
  styles: { [key: string]: string };
}

const UmzugsmitteilungField: React.FC<UmzugsmitteilungFieldProps> = ({ 
  register, 
  errors, 
  selected, 
  styles 
}) => {
  return (
    <fieldset
      aria-describedby={
        errors.umzugsmitteilung ? "umzugsmitteilung-error" : undefined
      }
    >
      <legend>Zusatzleistungen</legend>
      <h6>Umzugsmitteilung (Adressaktualisierung)</h6>
      <div className={styles.optionsContainer}>
        <label
          className={`${styles.optionBox} ${
            selected === "mit" ? styles.selected : ""
          }`}
        >
          <input
            type="radio"
            value="mit"
            {...register("umzugsmitteilung", {
              required: "Bitte wählen Sie eine Option aus.",
            })}
            className={styles.radio}
            aria-describedby="option-mit-desc"
          />
          <div>
            <strong>Mit Umzugsmitteilung</strong>
            <div className={styles.subtext}>ohne Mehrkosten</div>
          </div>
          <span className={styles.tipBadge}>Tipp</span>
        </label>
        <label
          className={`${styles.optionBox} ${
            selected === "ohne" ? styles.selected : ""
          }`}
        >
          <input
            type="radio"
            value="ohne"
            {...register("umzugsmitteilung")}
            className={styles.radio}
          />
          <strong>Ohne Umzugsmitteilung</strong>
        </label>
      </div>
      {errors.umzugsmitteilung && (
        <div 
          className={styles.error} 
          role="alert"
          id="umzugsmitteilung-error"
        >
          {errors.umzugsmitteilung.message}
        </div>
      )}
    </fieldset>
  );
};

export default UmzugsmitteilungField;