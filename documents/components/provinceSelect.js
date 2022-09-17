import Select from "react-select";
import { Controller, useFormContext } from "react-hook-form";
import provinces from "/data/provinces.json";

export default function ProvinceSelect() {
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col w-64">
      <label>จังหวัด</label>
      <Controller
        name="province"
        control={control}
        rules={{ required: "this field is required" }}
        render={({ field }) => (
          <Select
            options={[...provinces]}
            value={provinces.find((p) => p.PROVINCE_ID === field.value) || ""}
            getOptionLabel={(option) => option.PROVINCE_NAME}
            getOptionValue={(option) => option.PROVINCE_ID}
            onChange={(option) => {
              field.onChange(option.PROVINCE_ID);
              setValue("district", null);
            }}
          />
        )}
      />
      {errors.province && (
        <span className="text-red-500">{errors.province.message}</span>
      )}
    </div>
  );
}
