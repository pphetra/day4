## ใช้ React-select เข้ามาช่วยทำ autocompleted

[React Select Link](https://react-select.com/home)

### สร้าง components/address/province-select.js

```js
import Select from "react-select";
import { useFormContext } from "react-hook-form";
import provinces from "/data/provinces.json";

export default function Province() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <label>จังหวัด</label>
      <Select options={provinces} />

      {errors.province && (
        <span className="text-red-500">{errors.province.message}</span>
      )}
    </div>
  );
}
```

### map ชื่อ field ของ provinces.json ให้ react-select รู้จัก

```jsx
<Select
  options={provinces}
  getOptionLabel={(option) => option.PROVINCE_NAME}
  getOptionValue={(option) => option.PROVINCE_ID}
/>
```

### ร้อยค่าเข้ากับ react-hook-form

การร้อยค่าสำหรับกรณีที่เราใช้ component ของ third-party จะยุ่งยากกว่าปกติ โดยเราจะใช้ Controller ของ react-hook-form เข้ามาช่วย

import Controller

```js
import { useForm, Controller } from "react-hook-form";
```

wrap `<Select/>` ด้วย `<Controller>`

```js
const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext();

...

<Controller
  name="province"
  control={control}
  rules={{ required: "this field is required" }}
  render={({ field }) => (
    <Select
      options={provinces}
      value={provinces.find((p) => p.PROVINCE_ID === field.value) || ""}
      getOptionLabel={(option) => option.PROVINCE_NAME}
      getOptionValue={(option) => option.PROVINCE_ID}
      onChange={(option) => {
        field.onChange(option.PROVINCE_ID);
        setValue("district", "");
      }}
    />
  )}
/>
```

## source code ตัวอย่าง

- [provinceSelect.js](./components/provinceSelect.js)
- [districtSelect.js](./components/districtSelect.js)
