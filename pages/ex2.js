/*
 * เปลี่ยน html form ธรรมดาให้ไปใช้ react-hook-form
 */

export default function Ex2() {
  const submit = (e) => {
    e.preventDefault();
    alert(JSON.stringify({}));
  };

  return (
    <form onSubmit={submit}>
      <div className="bg-gray-50 h-screen flex flex-col items-center gap-4">
        <h2 className="mx-auto">Register Form</h2>

        <div className="flex flex-col">
          <label className="text-sm" htmlFor="username">
            Username
          </label>
          <input
            className="border rounded"
            type="text"
            name="username"
            id="username"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <input
            className="border rounded"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="border rounded"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row gap-4">
            <label htmlFor="male">
              <input type="radio" name="gender" id="male" value="male" />
              <span className="pl-4">male</span>
            </label>
            <label htmlFor="female">
              <input type="radio" name="gender" id="female" value="female" />
              <span className="pl-4">female</span>
            </label>
          </div>
        </div>

        <button type="submit" className="border bg-blue-400 rounded px-4 py-2">
          Submit
        </button>
      </div>
    </form>
  );
}
