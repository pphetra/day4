import Select from "react-select";
import { Controller, useFormContext } from "react-hook-form";
import districts from "/data/districts.json";

export default function DistrictSelect() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col w-64">
      <label>อำเภอ</label>
      <Controller
        name="district"
        control={control}
        rules={{ required: "this field is required" }}
        render={({ field }) => (
          <Select
            value={districts.find((d) => d.DISTRICT_ID === field.value) || ""}
            options={districts.filter(
              (d) => d.PROVINCE_ID == watch("province")
            )}
            getOptionLabel={(option) => option.DISTRICT_NAME}
            getOptionValue={(option) => option.DISTRICT_ID}
            onChange={(option) => {
              field.onChange(option.DISTRICT_ID);
            }}
          />
        )}
      />
      {errors.district && (
        <span className="text-red-500">{errors.district.message}</span>
      )}
    </div>
  );
}
