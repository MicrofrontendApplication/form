import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./Form.module.scss";
import { IFormInput } from "../../types/FormTypes";
import { CalendarSection } from "../CalendarSection";
import { StorageDurationInfo } from "../StorageDurationInfo";
import { AddressSection } from "../AddressSection";
import { PersonSection } from "../PersonSection";

export const Form2: React.FC = () => {
    const methods = useForm<IFormInput>();
    
    const {
        register, control,
        handleSubmit,
        setValue,
        clearErrors,
        getValues,
        formState: { errors },
    } = methods;

    const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
        console.log("data", data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}

            aria-labelledby="form-title"
            role="form"
        >
            <h1 id="form-title" className="visually-hidden">Nachsendungsauftrag Formular</h1>

            <CalendarSection
                control={control}
                errors={errors}
                clearErrors={clearErrors}
                getValues={getValues}
            />
            <StorageDurationInfo />

            <AddressSection
                register={register}
                setValue={setValue}
                errors={errors}
            />

            <PersonSection
                register={register}
                setValue={setValue}
                errors={errors}
            />

            <button type="submit" className={styles.submitButton}>
                Zur Beauftragung
            </button>
        </form>
    );
};