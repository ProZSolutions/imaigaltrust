import React, { useState, useRef } from "react";
import { states } from "@/app/content/StateList";
import toast from "react-hot-toast";

const MembershipForm: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    voluntaryDonation: "",
    membershipType: "",
    interest: "",
    fee: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const dateRef = useRef<HTMLInputElement>(null);
  const membershipTypes = [
    "Individual Member",
    "Corporate/Institutional Member",
    "Volunteer Member",
    "Lifetime Member",
  ];
  const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const rePincode = /^[1-9]\d{5}$/;
  const todayISO = new Date().toISOString().split("T")[0];
  const reName = /^[A-Za-z\s]+$/;
  const reCity = /^[A-Za-z\s]+$/;

  function convertDOB(dob: string) {
    const [dd, mm, yyyy] = dob.split("/");
    return `${yyyy}-${mm}-${dd}`;
  }

  function isoToDDMMYYYY(iso: string) {
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  }

  function parseDDMMYYYY(txt: string) {
    const [dd, mm, yyyy] = txt.split("/").map(Number);
    const d = new Date(yyyy, mm - 1, dd);
    return d.getFullYear() === yyyy &&
      d.getMonth() + 1 === mm &&
      d.getDate() === dd
      ? d
      : null;
  }

  

 function validate(vals: Partial<typeof form> = form) {
  const tmp = { ...errors };
//name
  if ("name" in vals) {
  if (!vals.name?.trim()) {
    tmp.name = "Name is required";
  } 
  else if (!reName.test(vals.name)) {
    tmp.name = "Name allows only letters";
  } 
  else if (vals.name.trim().length < 3) {
    tmp.name = "Name must be at least 3 characters";
  } 
  else if (vals.name.trim().length > 15) {
    tmp.name = "Name cannot exceed 15 characters";
  } 
  else {
    tmp.name = "";
  }
}

  // DOB
  if ("dob" in vals) {
    if (!vals.dob) {
      tmp.dob = "Date of Birth is required";
    } else {
      const d = parseDDMMYYYY(vals.dob);
      if (!d) {
        tmp.dob = "Invalid format (DD/MM/YYYY)";
      } else if (d > new Date()) {
        tmp.dob = "Date can’t be in the future";
      } else {
        tmp.dob = "";
      }
    }
  }

  // Email
  if ("email" in vals) {
    if (!vals.email) {
      tmp.email = "Email is required";
    } else if (!reEmail.test(vals.email)) {
      tmp.email = "Invalid email address";
    } else {
      tmp.email = "";
    }
  }

  // Mobile
  if ("mobile" in vals) {
  if (!vals.mobile) {
    tmp.mobile = "Mobile number is required";
  } 
  else if (!/^[6-9]\d{9}$/.test(vals.mobile)) {
    tmp.mobile = "Mobile must start with 6,7,8 or 9 and be 10 digits";
  } 
  else if (/^(\d)\1+$/.test(vals.mobile)) {
    tmp.mobile = "Mobile number cannot contain repeated digits";
  } 
  else {
    tmp.mobile = "";
  }
}

  // Address
  if ("address" in vals) {
    if (!vals.address?.trim()) {
      tmp.address = "Address is required";
    } else if (vals.address.trim().length < 3) {
      tmp.address = "Address must be at least 3 characters";
    } else {
      tmp.address = "";
    }
  }

  // City
  if ("city" in vals) {
    if (!vals.city?.trim()) {
      tmp.city = "City is required";
    } else if (!reCity.test(vals.city)) {
      tmp.city = "City allows only alphabets";
    } else {
      tmp.city = "";
    }
  }

  // Pincode
  if ("pincode" in vals) {
    if (!vals.pincode) {
      tmp.pincode = "Pincode is required";
    } else if (!rePincode.test(vals.pincode)) {
      tmp.pincode = "Pincode must be 6 digits and cannot start with 0";
    } else {
      tmp.pincode = "";
    }
  }

  // State
  if ("state" in vals) {
    tmp.state = vals.state ? "" : "Please select a state";
  }

  setErrors(tmp);
  return Object.values(tmp).every((x) => x === "");
}
  // function validate(vals: Partial<typeof form> = form) {
  //   const tmp = { ...errors };

  //   if ("name" in vals) {
  //     tmp.name =
  //       (vals.name?.trim().length ?? 0) >= 3
  //         ? ""
  //         : "Name must be at least 3 characters.";
  //   }

  //   if ("dob" in vals) {
  //     const d = parseDDMMYYYY(vals.dob || "");
  //     tmp.dob = d
  //       ? d <= new Date()
  //         ? ""
  //         : "Date can’t be in the future."
  //       : "Invalid format (DD/MM/YYYY).";
  //   }

  //   if ("email" in vals) {
  //     tmp.email = reEmail.test(vals.email || "")
  //       ? ""
  //       : "Invalid email address.";
  //   }

  //   if ("mobile" in vals) {
  //     tmp.mobile =
  //       reMobile.test(vals.mobile || "") && !/(.)\1\1\1/.test(vals.mobile || "")
  //         ? ""
  //         : "Enter 10 digits, not start with 0, no 4 repeated.";
  //   }

  //   if ("address" in vals) {
  //     tmp.address =
  //       (vals.address ?? "").trim().length >= 3
  //         ? ""
  //         : "Address must be at least 3 characters.";
  //   }

  //   if ("city" in vals) {
  //     tmp.city = vals.city?.trim() ? "" : "City is required.";
  //   }

  //   if ("pincode" in vals) {
  //     tmp.pincode = rePincode.test(vals.pincode || "")
  //       ? ""
  //       : "Enter 6 digits, not start with 0.";
  //   }

  //   if ("state" in vals) {
  //     tmp.state = vals.state ? "" : "Please select a state.";
  //   }

  //   setErrors(tmp);
  //   return Object.values(tmp).every((x) => x === "");
  // }
    


  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    validate({ [name]: value } as Partial<typeof form>);
  }

  function handleDatePick(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) return;
    const formatted = isoToDDMMYYYY(e.target.value);
    setForm((f) => ({ ...f, dob: formatted }));
    validate({ dob: formatted });
  }

  // function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   if (validate()) {
  //     alert("Form submitted successfully!");
  //     console.log(form);
  //   } else {
  //     alert("Please fix the errors before submitting.");
  //   }
  // }
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  // Initialize error object
  const errors: { [key: string]: string } = {};

  // Checkbox validation
  if (!form.membershipType) {
    errors.membershipType = "Please select at least one Membership Type";
  }

  if (!form.interest) {
    errors.interest = "Please select at least one Area of Interest";
  }

  // General field validation
  if (!validate()) {
    toast.error("Please fix the errors before submitting.");
    return;
  }

  // If checkbox errors exist, show toast & stop submission
  if (Object.keys(errors).length > 0) {
    setErrors(errors); // show errors under checkboxes
    toast.error("Please fix the errors before submitting.");
    return;
  }

  try {
    const res = await fetch("/api/membership", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        dob: convertDOB(form.dob), // convert date of birth
      }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Form submitted successfully!");

      // Reset form
      setForm({
        name: "",
        dob: "",
        email: "",
        mobile: "",
        address: "",
        city: "",
        pincode: "",
        state: "",
        voluntaryDonation: "",
        membershipType: "",
        interest: "",
        fee: "",
      });

      // Clear any previous errors
      setErrors({});
    } else {
      toast.error("Something went wrong.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Server error");
  }
}
  const handleCheckboxChange = (name: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: prev[name] === value ? "" : value, 
    }));
  };

  return (
    <div>
      {/* Hidden native picker */}
      <input
        type="date"
        ref={dateRef}
        className="hidden"
        max={todayISO}
        onChange={handleDatePick}
      />

      <section className="py-12 px-4 md:px-20">
        <form
          noValidate
          onSubmit={handleSubmit}
          className="max-w-[900px] mx-auto space-y-8"
        >
          {/* Two-column grid for main fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-[16px] font-medium text-gray-700">
                Full Name / Organization Name{" "}
                <span className="text-red-500">*</span>
              </label>
             <input
  name="name"
  value={form.name}
  onChange={(e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, ""); 
    handleChange({
      ...e,
      target: { ...e.target, name: "name", value },
    } as React.ChangeEvent<HTMLInputElement>);
  }}
  placeholder="Name"
  className={`mt-1 w-full max-w-[386px] h-[56px] px-3 rounded-md border focus:outline-none ${
    errors.name
      ? "border-red-500"
      : "border-gray-300 focus:ring-indigo-500"
  }`}
  required
/>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* DOB with icon */}
            <div>
              <label className="block text-[16px] font-medium text-gray-700">
                Date of Birth / Establishment Year{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1 max-w-[386px] w-full">
                <input
                  name="dob"
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={form.dob}
                  onChange={handleChange}
                  className={`w-full h-[56px] px-3 pr-10 rounded-md border bg-white focus:outline-none ${
                    errors.dob
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                  required
                />
                <input
                  ref={dateRef}
                  type="date"
                  className="absolute inset-0 w-full h-[56px] opacity-0 cursor-pointer"
                  max={todayISO}
                  onChange={handleDatePick}
                />
                <span
                  onClick={() => dateRef.current?.showPicker?.()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0
                             00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
              </div>
              {errors.dob && (
                <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[16px] font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className={`mt-1 w-full max-w-[386px] h-[56px] px-3 rounded-md border focus:outline-none ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

           {/* Mobile */}
<div>
  <label className="block text-[16px] font-medium text-gray-700">
    Mobile Number <span className="text-red-500">*</span>
  </label>

  <input
    name="mobile"
    type="tel"
    value={form.mobile}
    maxLength={10}
    onChange={(e) => {
  const value = e.target.value.replace(/\D/g, "").slice(0, 10);

  setForm((prev) => ({
    ...prev,
    mobile: value,
  }));

  validate({ mobile: value });
}}
    placeholder="Enter Mobile Number"
    className={`mt-1 w-full max-w-[386px] h-[56px] px-3 rounded-md border focus:outline-none ${
      errors.mobile
        ? "border-red-500"
        : "border-gray-300 focus:ring-indigo-500"
    }`}
    required
  />

  {errors.mobile && (
    <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
  )}
</div>

            {/* Address */}
            <div>
              <label className="block text-[16px] font-medium text-gray-700">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className={`mt-1 w-full max-w-[386px] h-[56px] px-3 rounded-md border focus:outline-none ${
                  errors.address
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
                required
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-[16px] font-medium text-gray-700">
                City <span className="text-red-500">*</span>
              </label>
             <input
  name="city"
  value={form.city}
  onChange={(e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, ""); 
    handleChange({
      ...e,
      target: { ...e.target, name: "city", value },
    } as React.ChangeEvent<HTMLInputElement>);
  }}
  placeholder="City"
  className={`mt-1 w-full max-w-[386px] h-[56px] px-3 rounded-md border focus:outline-none ${
    errors.city
      ? "border-red-500"
      : "border-gray-300 focus:ring-indigo-500"
  }`}
  required
/>
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>

            {/* Pincode */}
            <div>
  <label className="block text-[16px] font-medium text-gray-700">
    Pincode <span className="text-red-500">*</span>
  </label>
  <input
    name="pincode"
    value={form.pincode}
                onChange={handleChange}
    placeholder="Pincode"
    className={`mt-1 w-full max-w-[386px] h-[56px] px-3 rounded-md border focus:outline-none ${
      errors.pincode
        ? "border-red-500"
        : "border-gray-300 focus:ring-indigo-500"
    }`}
    required
  />
  {errors.pincode && (
    <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>
  )}
</div>

            {/* State */}
<div>
  <label className="block text-[16px] font-medium text-gray-700">
    State <span className="text-red-500">*</span>
  </label>

  <select
    name="state"
    value={form.state || ""}
    onChange={handleChange}
    className="mt-1 w-full max-w-[386px] h-[56px] px-3 rounded-md border border-gray-300 bg-white focus:outline-none"
    required
  >
    <option value="" disabled>
      Select State
    </option>

    {states.map((s) => (
      <option key={s.id} value={s.name}>
        {s.name}
      </option>
    ))}
  </select>

  {errors.state && (
    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
  )}
</div>
</div>
          <fieldset className="pt-1">
  <legend className="text-base font-medium text-gray-900 text-[16px]">
    Membership Type<span className="text-red-500">&#42;</span>
  </legend>
  <div className="mt-4 space-y-3">
    {membershipTypes.map((label) => (
      <div key={label} className="flex items-center">
        <input
          type="checkbox"
          name="membershipType"
          value={label}
          checked={form.membershipType === label}
          onChange={() => handleCheckboxChange("membershipType", label)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label
          htmlFor={label}
          className="ml-2 block text-[16px] text-gray-700 font-poppins"
        >
          {label}
        </label>
      </div>
    ))}
  </div>
</fieldset>

          <hr className="border-t border-gray-200 my-8" />

          <fieldset className="pt-1 ">
            <legend className="text-base font-medium text-gray-900 text-[16px]">
              Area Of Interest<span className="text-red-500">&#42;</span>
            </legend>
            <div className="mt-4 space-y-3">
              {[
                "Rural Development",
                "Women Empowerment",
                "Agriculture & Farmer Welfare",
                "Climate Resilience",
                "Health & Sanitation",
                "Education & Skill Development",
              ].map((label) => (
                <div key={label} className="flex items-center">
                  <input
                    id={label}
                    name="interest"
                    type="checkbox"
                    checked={form.interest === label}
                    onChange={() => handleCheckboxChange("interest", label)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={label}
                    className="ml-2 block text-[16px] text-gray-700 font-poppins"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          <hr className="border-t border-gray-200 my-8" />

          <fieldset className="pt-2 ">
            <legend className="text-base font-medium text-gray-900 text-[16px]">
              Membership Type<span className="text-red-500">&#42;</span>
            </legend>
            <div className="mt-4 space-y-3">
              {[
                "Annual Membership – ₹1,000.00",
                "Lifetime Membership – ₹2,000.00",
              ].map((label) => (
                <div key={label} className="flex items-center">
                  <input
                    id={label}
                    name="fee"
                    type="checkbox"
                    checked={form.fee === label}
                    onChange={() => handleCheckboxChange("fee", label)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={label}
                    className="ml-2 block text-[16px] text-gray-700 font-poppins"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>

          {/* Donation + Submit */}
          <div className="space-y-4 pt-6">
            <div>
              <label className="block text-[16px] font-medium text-gray-700">
                Voluntary Donation
              </label>
              <input
                name="voluntaryDonation"
                type="number"
                value={form.voluntaryDonation}
                onChange={handleChange}
                placeholder="₹0.00"
                className="mt-1 w-full max-w-[386px] h-[56px] px-3 rounded-md border border-gray-300 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full max-w-[386px] h-[56px] rounded-md bg-green-700 text-white text-[16px] font-medium uppercase transition "
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default MembershipForm;