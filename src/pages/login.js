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
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export default function Login() {
  //INFO: Phone Number state
  const [phoneNumber, setPhoneNumber] = useState("");

  //INFO: Login mutation loadeing state
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();

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
    //INFO: starting loading
    setIsLoading(true);

    //INFO: login mutaion in next auth passing credentials and redirect false
    const user = await signIn("credentials", {
      redirect: false,
      phone: data.phone,
      password: data.password,
    });

    //INFO: if error then show error
    if (user?.error) {
      toast.error(user.error);
    }

    //INFO: if success then show success and redirect to home
    if (user?.ok) {
      toast.success("Login Success");
      reset();
      router.push("/");
    }

    //INFO: stop loading
    setIsLoading(false);
  };

  //INFO: if user is authenticated then redirect to home
  if (status === "authenticated") {
    router.push("/");
  }

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
