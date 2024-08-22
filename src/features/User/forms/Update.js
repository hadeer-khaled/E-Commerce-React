import Select from "react-select";

export default function Create({ formik, roles }) {
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            name="name"
            placeholder="Username"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>

        {formik.errors.name && formik.touched.name ? (
          <p className="text-red-500">{formik.errors.name}</p>
        ) : (
          ""
        )}

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        {formik.errors.email && formik.touched.email ? (
          <p className="text-red-500">{formik.errors.email}</p>
        ) : (
          ""
        )}

        <Select
          name="roles"
          value={formik.values.roles}
          onChange={(option) => formik.setFieldValue("roles", option)}
          onBlur={formik.handleBlur}
          options={roles}
          isMulti
        />
        {formik.errors.roles ? (
          <p className="text-red-500">{formik.errors.roles}</p>
        ) : (
          ""
        )}

        <div className="flex justify-center items-baseline">
          <button
            type="submit"
            disabled={!formik.isValid}
            className="btn btn-outline btn-info  mt-4 mr-2"
          >
            Update User
          </button>
        </div>
      </form>
    </>
  );
}
