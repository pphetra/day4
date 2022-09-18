## province, district, subdistrct components

implement components สำหรับ จังหวัด อำเภอ ตำบล
โดยใช้ `<select>` และ [react-hook-form](https://react-hook-form.com)
และนำเทคนิค `Provider` มาช่วยในการส่งต่อข้อมูลระหว่าง component

- หลักการ Provider, Context

  - ปกติ data is passed top-down (parent to child) via props
  - Context จะเข้ามาช่วยเรื่องการ share values ระหว่าง components แทนที่วิธีการ pass props

    - create the context
      ```js
      import { createContext } from 'react';
      ...
      const Context = createContext('Default Value');
      ```
    - provide the context
      ```js
      function App() {
        const value = "My Context Value";
        return (
          <Context.Provider value={value}>
            <MyComponent />
          </Context.Provider>
        );
      }
      ```
    - consume the context

      ```js
      import { useContext } from "react";

      function MyComponent() {
        const value = useContext(Context);
        return <span>{value}</span>;
      }
      ```

  - สรุป

    ```

                            ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐

                            │                                     │

    ┌──────────────────┐     │         ┌──────────────────┐        │
    │                  │               │                  │
    │      value       ├─────┼────────▶│     Provider     │        │
    │                  │               │                  │
    └──────────────────┘     │         └──────────────────┘        │
                                                ▲
                            │                   │                 │
                                                │
                            │         ┌──────────────────┐        │
                                      │                  │
                            │         │     Context      │        │
                                      │                  │
                            │         └──────────────────┘        │
                                                │
                            │                   │                 │
                                                ▼
                            │         ┌──────────────────┐        │        ┌──────────────────┐
                                      │                  │                 │                  │
                            │         │    useContext    │────────┼───────▶│      value       │
                                      │                  │                 │                  │
                            │         └──────────────────┘        │        └──────────────────┘

                            │                                     │
                              ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
    ```

- react-hook-form กับ Context

  - react-hook-form ใช้ FormProvider กับ useFormContext
  - provide the context

    ```js
    import { FormProvider, useForm } from "react-hook-form";

    function App() {
      const methods = useForm({
        username: "",
      });
      return (
        <FormProvider {...methods}>
          <MyComponent />
        </FormProvider>
      );
    }
    ```

  - consume the context

    ```js
    import { useFormContext } from "react-hook-form";

    function MyComponent() {
      const {
        register,
        watch,
        formState { errors }
      } = useFormContext();
      return <input {...register("username")}/>
    }
    ```

- copy page "use_hook_form" เป็น "use_hook_form_address"
- แก้ไข use_hook_form_address.js เปลี่ยนเฉพาะตรง useForm เป็น

  ```js
  const methods = useForm({
    province: "",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;
  ```

- สร้าง components/myaddress/province.js

  ```js
  import { useFormContext } from "react-hook-form";
  import provinces from "/data/provinces.json";

  export default function Province() {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    return (
      <div className="flex flex-col">
        <label>จังหวัด</label>
        <select
          className="border rounded"
          id="province"
          {...register("province", { required: true })}
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
  ```

- ทดลองสร้าง district, subdistrict components

  - copy province.js ไปเป็น district.js
  - เปลี่ยนชื่อตัวแปรที่เป็น province เป็น district

    ```js
    import { useFormContext } from "react-hook-form";
    import districts from "/data/districts.json";

    export default function District() {
      const {
        register,
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
            {districts.map((district) => (
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
    ```

  - จะเห็นว่า input อำเภอ ทำงานได้แล้ว แต่สิ่งที่แสดงยังแสดงอำเภอของทั้งประเทศอยู่ แสดงว่าเราต้อง filter ให้เหลือแต่อำเภอของจังหวัดที่ถูกเลือก
  - ดึง function watch ออกจาก useFormContext เพื่อเอามาติดตามค่า จังหวัด ที่ user เลือก

    ```js
    const {
      register,
      watch,
      formState: { errors },
    } = useFormContext();
    ```

  - เพิ่ม filter districts array ตามรหัสจังหวัด ก่อนนำไป render เป็น option

    ```js
    {
      districts
        .filter((d) => d.PROVINCE_ID == watch("province"))
        .map((district) => (
          <option key={district.DISTRICT_ID} value={district.DISTRICT_ID}>
            {district.DISTRICT_NAME}
          </option>
        ));
    }
    ```

  - แก้ไข province component ถ้ามีการเลือกค่า province เมื่อไร ให้ clear ค่า district ใน form ให้กลับไปเป็น ""
    - ดึงค่า watch กับ setValue ออกจาก useForm
      ```js
      const {
        register,
        setValue,
        watch,
        formState: { errors },
      } = useFormContext();
      ```
    - monitor ค่า "province" value ด้วยการ watch
      ```js
      const watchProvince = watch("province");
      ```
    - ใช้ useEffect ติดตามการเปลี่ยนแปลงของ watch value
      ```js
      useEffect(() => {
        setValue("district", "");
      }, [watchProvince, setValue]);
      ```

## source code ตัวอย่าง

- [province.js](./components/province.js)
- [district.js](./components/district.js)
