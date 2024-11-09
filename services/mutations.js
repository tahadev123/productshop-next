import { useMutation } from "@tanstack/react-query";

import api from "../configs/api";

const useAddProduct = () => {
  const mutationFn = (data) => api.post("/products", data);

  return useMutation({ mutationFn });
};

const useDeleteProduct = () => {
  const mutationFn = (id) => api.delete(`/products/${id}`);

  return useMutation({ mutationFn });
};

const useEditProduct = () => {
  const mutationFn = (data) => api.put(`/products/${data.id}`, data);

  return useMutation({ mutationFn });
};

const useRegister = () => {
  const mutationFn = (data) => api.post("/auth/register", data);

  return useMutation({ mutationFn });
};

const useLogin = () => {
  const mutationFn = (data) => api.post("/auth/login", data);

  return useMutation({ mutationFn });
};

export {
  useAddProduct,
  useDeleteProduct,
  useEditProduct,
  useRegister,
  useLogin,
};
