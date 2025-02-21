import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Porfavor coloque um email válido")
    .required("Preenchimento obrigatório"),
  name: yup
    .string()
    .min(3, "nome precisa ter pelo menos 3 caracteres")
    .required("Preenchimento obrigatório"),
  userName: yup
    .string()
    .min(3, "nome de usuário precisa ter pelo menos 3 caracteres")
    .required("Preenchimento obrigatório"),
  password: yup
    .string()
    .min(5, "senha precisa ter pelo menos 5 caracteres")
    .matches(passwordRules, {
      message:
        "mínimo de 5 caracters, pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número",
    })
    .required("Preenchimento obrigatório"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Senhas precisam ser iguais")
    .required("Preenchimento obrigatório"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Porfavor coloque um email válido")
    .min(3, "email precisa ter pelo menos 3 caracteres")
    .required("Preenchimento obrigatório"),
  password: yup.string().required("Preenchimento obrigatório"),
});

export const editPerfilSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "nome precisa ter pelo menos 3 caracteres")
    .required("Preenchimento obrigatório"),
  userName: yup
    .string()
    .min(3, "nome de usuário precisa ter pelo menos 3 caracteres")
    .required("Preenchimento obrigatório"),
  email: yup
    .string()
    .email("Porfavor coloque um email válido")
    .min(3, "email precisa ter pelo menos 3 caracteres")
    .required("Preenchimento obrigatório"),
});
