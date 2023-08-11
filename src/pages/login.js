import Link from "next/link";
import "react-phone-input-2/lib/style.css";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/utils/validatorSchema";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    setValue,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const user = await signIn("credentials", {
      redirect: false,
      phone: data.phone,
      password: data.password,
    });

    if (user?.error) {
      console.log(user.error);
      toast.error(user.error);
    }

    if (user?.ok) {
      toast.success("Login Success");
      reset();
      router.push("/");
    }

    setIsLoading(false);
  };

  return (
    <AuthLayout
      title="Sign in to account"
      subtitle={
        <>
          Don’t have an account?{" "}
          <Link href="/register" className="text-cyan-600">
            Sign up
          </Link>{" "}
          for a free trial.
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
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
            placeholder="Type Your Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            register={register}
            error={errors?.password?.message}
          />
        </div>
        <Button
          type="submit"
          color="cyan"
          className="w-full mt-8"
          disabled={isLoading}
        >
          Sign in
        </Button>
      </form>
    </AuthLayout>
  );
}
