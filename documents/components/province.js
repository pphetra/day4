import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import provinces from "/data/provinces.json";

export default function Province() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  //watch ค่าของ province และเมื่อมีการเปลี่ยนแปลงให้ set ค่า district ให้เป็นค่าว่าง
  const watchProvince = watch("province");
  useEffect(() => {
    setValue("district", "");
  }, [watchProvince, setValue]);

  return (
    <div className="flex flex-col">
      <label>จังหวัด</label>
      <select
        className="border rounded"
        id="province"
        {...register("province", { required: "this field is required" })}
      >
        <option value={""}>เลือกจังหวัด</option>
        {provinces.map((province) => (
          <option key={province.PROVINCE_ID} value={province.PROVINCE_ID}>
            {province.PROVINCE_NAME}
          </option>
        ))}
      </select>
      {errors.province && (
        <span className="text-red-500">{errors.province.message}</span>
      )}
    </div>
  );
}
