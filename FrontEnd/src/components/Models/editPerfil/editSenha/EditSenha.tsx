import { useSelector } from "react-redux";
import { EditSenhaContainer } from "./styles";
import { RootReducer } from "../../../../store";
import { useState } from "react";
import axios from "axios";
import { bancoDeDados } from "../../../../helpers/getApi";
import { ThreeDot } from "react-loading-indicators";
import { useFormik } from "formik";
import { editPassword } from "../../../../helpers/schemas";

type propsType = {
  closeModel: () => void;
};

export default function EditSenha(props: propsType) {
  const [actualPassword, setActualPassword] = useState("");

  const [confirmedPassword, setConfirmedPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state: RootReducer) => state.user);
  const { night } = useSelector((state: RootReducer) => state.navBar);

  //fetch confirmação da senha
  async function fetchConfirmPassword() {
    try {
      await axios
        .post(`${bancoDeDados}/user/confirmpassword/${user._id}`, {
          password: actualPassword,
        })
        .then((response) => {
          alert(response.data.message);
          setConfirmedPassword(true);
          setIsLoading(false);
        })
        .catch((error) => {
          setConfirmedPassword(false);
          alert(error.response.data.message);
          setIsLoading(false);
        });
    } catch {
      alert("Senha incorreta");
      setActualPassword("");
      return;
    }
  }

  async function fetchChangePassword(newPassword: string) {
    await axios
      .patch(`${bancoDeDados}/user/editpassword/${user._id}`, {
        password: newPassword,
      })
      .then(() => {
        alert("Senha alterada");
        setIsLoading(false);
        props.closeModel();
      })
      .catch((response) => {
        alert(response.response.data.message);
        setIsLoading(false);
      });
  }

  const { values, errors, handleBlur, handleChange } = useFormik({
    initialValues: { newPassword: "", confirmNewPassword: "" },
    validationSchema: editPassword,
    onSubmit: async (values) => {
      try {
        await fetchChangePassword(values.newPassword);
      } catch {
        alert("Ocorreu um erro ao alterar a senha");
      }
    },
  });

  return (
    <EditSenhaContainer night={night} isLoading={isLoading}>
      <div className="card-edit">
        <i onClick={() => props.closeModel()} className="close bi bi-x-lg"></i>
        <h2>Alterar Senha</h2>
        <div>
          {!confirmedPassword && (
            <>
              <div className="mb-3">
                <label htmlFor="senhaAtual">Senha Atual</label>
                <div className="input">
                  <input
                    type="password"
                    value={actualPassword}
                    onChange={(e) => setActualPassword(e.target.value)}
                    className="form-control"
                    id="senhaAtual"
                  />
                  {isLoading && (
                    <ThreeDot
                      color={night ? "white" : "#000000"}
                      size="small"
                      text=""
                      textColor=""
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    fetchConfirmPassword();
                    setIsLoading(true);
                  }}
                  className="w-100 mt-4 btn btn-outline-secondary"
                  disabled={actualPassword.length === 0 && confirmedPassword}
                >
                  confirmar senha
                </button>
              </div>
            </>
          )}

          {confirmedPassword && (
            <form onSubmit={(e) => e.preventDefault}>
              <div className="mb-3">
                <label htmlFor="novaSenha">Nova Senha</label>
                <input
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  className="form-control"
                  id="novaSenha"
                  name="newPassword"
                />
                {errors.newPassword && <span>{errors.newPassword}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="confirmarSenha">Confirmar Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmarSenha"
                  name="confirmNewPassword"
                  value={values.confirmNewPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirmNewPassword && (
                  <span>{errors.confirmNewPassword}</span>
                )}
              </div>
              <button
                type="submit"
                className="w-100 mt-2 submit btn btn-primary"
                disabled={isLoading}
                onClick={() => {
                  setIsLoading(true);
                  fetchChangePassword(values.newPassword);
                }}
              >
                {isLoading ? (
                  <ThreeDot color="#000000" size="small" text="" textColor="" />
                ) : (
                  "salvar"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </EditSenhaContainer>
  );
}
