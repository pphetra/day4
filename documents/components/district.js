import { useFormContext } from "react-hook-form";
import districts from "/data/districts.json";

export default function District() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <label>อำเภอ</label>
      <select
        className="border rounded"
        id="district"
        {...register("district", { required: "this field is required" })}
      >
        <option value={""}>เลือกอำเภอ</option>
        {districts
          .filter((d) => d.PROVINCE_ID == watch("province"))
          .map((district) => (
            <option key={district.DISTRICT_ID} value={district.DISTRICT_ID}>
              {district.DISTRICT_NAME}
            </option>
          ))}
      </select>
      {errors.district && (
        <span className="text-red-500">{errors.district.message}</span>
      )}
    </div>
  );
}
