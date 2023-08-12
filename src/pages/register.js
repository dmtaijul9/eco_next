import Link from "next/link";

import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { SelectField, TextField } from "@/components/Fields";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/utils/validatorSchema";
import StrengthMeter from "@/components/StrengthMeter";
import { useMutation } from "@tanstack/react-query";
import { registerMutation } from "@/utils/resolvers/mutation";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Register() {
  //INFO: Phone Number state
  const [phoneNumber, setPhoneNumber] = useState("");
  const { status, data: session } = useSession();
  const router = useRouter();

  //INFO: Password secondary state to check strong
  const [pwdInput, initValue] = useState({
    password: "",
  });

  //INFO: Password strong state
  const [isStrong, initRobustPassword] = useState(null);

  //INFO: Password strong check function and change state
  const onChange = (e) => {
    let password = e.target.value;
    initValue({
      ...pwdInput,
      password,
    });
  };

  //INFO: Password strong check function and change state
  const initPwdInput = async (childData) => {
    initRobustPassword(childData);
  };

  //INFO: Register mutation
  const { mutate, isLoading } = useMutation({
    mutationKey: "register",
    mutationFn: registerMutation,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    //INFO: Check password strong
    if (!isStrong) {
      return toast.error("Password is not strong enough");
    }

    //INFO: Check phone number is valid or not
    if (data.phone.length < 13) {
      return toast.error("Phone number is not valid");
    }

    mutate(
      { variables: data },
      {
        onSuccess: (data) => {
          console.log(data);
          reset();
          setPhoneNumber(null);
          toast.success(data.message);
          router.push("/login");
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message);
        },
      }
    );
  };

  //INFO: If user is authenticated redirect to home page
  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <AuthLayout
      title="Sign up for an account"
      subtitle={
        <>
          Already registered?{" "}
          <Link href="/login" className="text-cyan-600">
            Sign in
          </Link>{" "}
          to your account.
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col items-start justify-between w-full gap-6 md:flex-row col-span-full">
            <TextField
              className="w-full"
              placeholder="First name"
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              register={register}
              error={errors.first_name?.message}
            />
            <TextField
              placeholder="Last name"
              id="last_name"
              className="w-full"
              name="last_name"
              type="text"
              register={register}
              error={errors.last_name?.message}
              autoComplete="family-name"
            />
          </div>
          <TextField
            className="col-span-full"
            placeholder="Email address"
            id="email"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
            autoComplete="email"
          />

          <div className="col-span-full">
            <PhoneInput
              country={"bd"}
              inputClass="w-full"
              style={{ width: "100%" }}
              onlyCountries={["bd"]}
              prefix="+"
              value={phoneNumber}
              onChange={(phone) => {
                console.log(phone);
                setPhoneNumber(phone);
                setValue("phone", phone, { shouldValidate: true });
              }}
              disableDropdown={true}
              countryCodeEditable={false}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone?.message}</p>
            )}
          </div>
          <TextField
            className="col-span-full"
            id="password"
            name="password"
            type="password"
            register={register}
            onChange={(e) => {
              setValue("password", e.target.value, { shouldValidate: true });
              onChange(e);
            }}
            error={errors.password?.message}
            autoComplete="new-password"
            placeholder="At least 8 characters long password"
          />
          <div className="col-span-full">
            <StrengthMeter
              password={pwdInput.password}
              actions={initPwdInput}
            />
          </div>
        </div>
        <Button
          type="submit"
          color="cyan"
          className="w-full mt-8"
          disabled={isLoading}
        >
          Register
        </Button>
      </form>
    </AuthLayout>
  );
}
