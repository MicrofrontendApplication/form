import React from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import styles from "./Form2.module.scss";

import { INachsendungFormInput } from "./../../types/FormTypes";
import { DropdownField } from "../DropdownField";
import { AddressBlock } from "../AddressBlock";
import { PersonInfoBlock } from "../PersonInfoBlock";
import { DatePickerField } from "../DatePickerField";
import UmzugsmitteilungField from "../UmzugsmitteilungField";
import AddressNotificationInfo from "../AddressNotificationInfo";
import EmailReminderField from "../EmailReminderField";
import OrderSummary from "../OrderSummary";

export const NachsendungForm: React.FC = () => {
  const methods = useForm<INachsendungFormInput>();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    clearErrors,
    formState: { errors },
  } = methods;

  const umzugsmitteilungValue = useWatch({
    control,
    name: "umzugsmitteilung",
    defaultValue: "",
  });

  const options = ["Category 1", "Category 2", "Category 3"];

  const onSubmit: SubmitHandler<INachsendungFormInput> = (data: any) => {
    console.log("data", data);
  };

  const clearInputField = (fieldName: keyof INachsendungFormInput) => {
    setValue(fieldName, "" as any, { shouldValidate: true });
  };

  // Handle family members selection
  const handleFamilyMembersChange = (members: { [key: string]: boolean }) => {
    console.log("Selected family members:", members);
    // You can store this in form state or handle it as needed
    setValue("familyMembers", members);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="form-title"
      role="form"
    >
      <h1 id="form-title" className="visually-hidden">
        Nachsendungsauftrag Formular
      </h1>

      {/* Dropdown Component */}
      <DropdownField
        control={control}
        errors={errors}
        options={options}
       
      />

      <AddressBlock
        title="Bisherige Adresse"
        register={register}
        errors={errors}
        setValue={setValue}
        clearInputField={clearInputField}
      />

      <PersonInfoBlock
        register={register}
        errors={errors}
        clearInputField={clearInputField}
      />

      <DatePickerField
        register={register}
        errors={errors}
        setValue={setValue}
        clearInputField={clearInputField}
        control={control}
        clearErrors={clearErrors}
      />

      <UmzugsmitteilungField
        register={register}
        errors={errors}
        selected={umzugsmitteilungValue}
        styles={styles}
      />

      {/* Address Notification Info Component */}
      <AddressNotificationInfo
        onFamilyMembersChange={handleFamilyMembersChange}
      />

      {/* Email Reminder Field Component */}
      <EmailReminderField
        register={register}
        errors={errors}
        initialToggleState={false}
        clearInputField={() => {}}
      />

      {/* Order Summary Component */}
      <OrderSummary
        styles={styles}
        items={[
          {
            id: "nachsendeauftrag",
            title: "Nachsendeauftrag privat",
            price: 28.9,
            isMainItem: true,
          },
          {
            id: "eilauftrag",
            title: "Eilauftrag",
            price: 10.0,
            isMainItem: false,
          },
        ]}
        showAuthorizationText={true}
      />
      <button type="submit" className={styles.submitButton}>
        Zur Beauftragung
      </button>
    </form>
  );
};
