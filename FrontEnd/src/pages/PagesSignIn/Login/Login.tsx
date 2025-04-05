// import { useState } from "react";
import { LoginContainer } from "./Styles";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser, userType } from "../../../store/reducers/user";
import { useFormik } from "formik";
import { loginSchema } from "../../../helpers/schemas";
import { Link, useNavigate } from "react-router-dom";
import { setAlert } from "../../../store/reducers/alert";
import { bancoDeDados } from "../../../helpers/getApi";

export default function Login() {
  const dispatch = useDispatch();
  const navegar = useNavigate();

  function addUserFunction(user: userType) {
    dispatch(addUser(user));
  }

  const postLogin = (email: string, password: string) => {
    const data = {
      email,
      password,
    };
    axios
      .post(`${bancoDeDados}/user/login`, data)
      .then((response) => {
        if (response.status === 401) {
          alert("Usuário ou senha inválidos");
          return;
        }
        dispatch(
          setAlert({
            type: "success",
            messageText: "Usuário logado com sucesso",
          })
        );
        addUserFunction(response.data.data);
        navegar("/");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 401) {
          dispatch(setAlert({ type: "error", messageText: error.message }));
        }
        dispatch(setAlert({ type: "error", messageText: error.message }));
      });
  };

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: () => {
      postLogin(values.email, values.password);
    },
  });

  return (
    <LoginContainer>
      <div className="container">
        <h2>Login</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="packing-card mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="form-control"
              id="exampleInputEmail1"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
            />
            {errors.email && (
              <div className="error-div form-text">{errors.email}</div>
            )}
          </div>
          <div className="packing-card mb-3 ">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Senha:
            </label>
            <input
              name="password"
              placeholder="senha"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
            {errors.password && (
              <div className="error-div form-text">{errors.password}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <br />
        <p>
          Não possui uma conta? <Link to="register">Cadastre-se agora</Link>
        </p>
      </div>
    </LoginContainer>
  );
}
