import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import {
  CheckboxField,
  NumberField,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/Fields";
import { createProductMutation } from "@/utils/resolvers/mutation";
import { createProductSchema } from "@/utils/validatorSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const CreateProduct = () => {
  const [productForm, setProductForm] = useState({
    image: null,
    category: "smartphone",
    isEcoSpecial: false,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      brand: "",
      price: 0,
      description: "",
    },
    resolver: yupResolver(createProductSchema),
  });

  const { mutate, isLoading: creating } = useMutation({
    mutationKey: "createProduct",
    mutationFn: createProductMutation,
  });

  const onImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);

        setProductForm({
          ...productForm,
          image: reader.result,
        });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    if (!productForm.image) {
      return toast.error("Please upload an image");
    }

    if (!productForm.category) {
      return toast.error("Please select a category");
    }

    mutate(
      {
        variables: {
          ...data,
          ...productForm,
        },
      },
      {
        onSuccess: (data) => {
          toast.success("Product created successfully");
          reset();
          setProductForm({
            image: null,
            category: "smartphone",
            isEcoSpecial: false,
          });
          setImagePreview(null);
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      }
    );
  };

  return (
    <Container>
      <div className="py-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Create product
          </h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-end w-full gap-3">
              <div className="flex-1">
                <TextField
                  className="w-full"
                  label="Product Name"
                  placeholder="lucie camera"
                  id="name"
                  name="name"
                  register={register}
                  error={errors?.name?.message}
                />
                <SelectField
                  className="w-full"
                  label="Product category"
                  id="category"
                  options={[
                    "smartphone",
                    "laptop",
                    "camera",
                    "headphone",
                    "watch",
                    "tv",
                    "accessories",
                  ]}
                  value={productForm.category}
                  onChange={(e) => {
                    setProductForm({
                      ...productForm,
                      category: e.target.value,
                    });
                  }}
                  name="catergory"
                />
              </div>
              <div className="flex items-center justify-end flex-1">
                <label
                  htmlFor="image"
                  className="border rounded-md cursor-pointer"
                >
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="sr-only"
                    onChange={onImageChange}
                  />
                  <Image
                    src={imagePreview ? imagePreview : "/image/product.png"}
                    width={200}
                    height={200}
                    className="object-cover w-40 h-40 rounded-md"
                    alt="Product"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <TextAreaField
                className="w-full"
                label="Description"
                id="description"
                placeholder="lucie camera"
                name="description"
                register={register}
                error={errors?.description?.message}
              />
              <div className="flex gap-5">
                <TextField
                  className="w-full"
                  label="Brand"
                  placeholder="Symphony"
                  id="brand"
                  register={register}
                  error={errors?.brand?.message}
                  name="brand"
                />
                <NumberField
                  className="w-full"
                  label="Price"
                  id="price"
                  name="price"
                  register={register}
                  error={errors?.price?.message}
                />
              </div>
              <CheckboxField
                className="w-full mt-3"
                label="Eco special "
                id="isEcoSpecial"
                value={productForm.isEcoSpecial}
                onChange={(e) => {
                  setProductForm({
                    ...productForm,
                    isEcoSpecial: e.target.checked,
                  });
                }}
                name="isEcoSpecial"
              />
            </div>
            <div className="mt-5">
              <Button
                color="cyan"
                type="submit"
                className="w-full px-16 md:w-auto"
              >
                Create Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CreateProduct;
