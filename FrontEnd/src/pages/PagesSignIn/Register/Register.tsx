import { useEffect, useState } from "react";
import { RegisterContainer } from "./Styles";
import axios from "axios";
import { useFormik } from "formik";
import { registerSchema } from "../../../helpers/schemas";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../store/reducers/alert";
import { bancoDeDados } from "../../../helpers/getApi";
import { RootReducer } from "../../../store";

export default function Register() {
  const [confirmTerms, setConfirmTerms] = useState(false);
  const [checked, setChecked] = useState(false);
  const navegar = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null); // Guarda o arquivo
  const [preview, setPreview] = useState<string | null>(null); // Guarda a URL do preview

  const { night } = useSelector((state: RootReducer) => state.navBar);

  const dispatch = useDispatch();

  const [hasImage, setHasImage] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageFile(file);

      // Criar preview
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
    }
  };

  const handleConfirmTerms = () => {
    const isValid =
      !errors.email &&
      values.email.length > 0 &&
      !errors.password &&
      values.password.length > 5 &&
      values.confirmPassword === values.password &&
      values.name.length > 0 &&
      values.userName.length > 0 &&
      !errors.name &&
      !errors.userName &&
      checked === true;

    setConfirmTerms(isValid);
  };

  // FORMIK
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userName: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: null,
    },
    validationSchema: registerSchema,
    onSubmit: () => {
      if (imageFile) {
        postRegister(
          values.userName,
          values.name,
          values.email,
          values.password,
          imageFile
        );
      } else {
        postRegister(
          values.userName,
          values.name,
          values.email,
          values.password
        );
      }
    },
  });

  //_________________ENVIO_________________________
  const postRegister = (
    userName: string,
    name: string,
    email: string,
    password: string,
    image?: File
  ) => {
    const formData = new FormData(); // FormData auxilia na construção de um objeto próprio para envio HTML
    formData.append("userName", userName);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("image", image);
    }
    axios
      .post(`${bancoDeDados}/user/register`, formData, {
        headers: {
          // Para enviar arquivos usando esse header
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch(
          setAlert({ messageText: response.data.message, type: "success" })
        );
        navegar("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //_________________FORMIK________________________

  //_________________CHECKBOX______________________
  useEffect(() => {
    handleConfirmTerms();
  }, [checked, values, errors]);

  //_________________CÓDIGO________________________
  return (
    <RegisterContainer night={night}>
      <div className="container">
        <h2>Registrar-se</h2>
        <form onSubmit={handleSubmit}>
          <div className={hasImage ? "packing" : "packing oculted"}>
            <div className="image-div">
              <label className="image-card" htmlFor="image">
                <span>Escolher imagem de perfil</span>
                <input
                  id="image"
                  className="image-input"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {preview && (
                  <>
                    <img
                      className="image-preview"
                      src={preview}
                      alt="Preview"
                    />
                  </>
                )}
              </label>
              {preview && (
                <i
                  onClick={() => {
                    setPreview(null);
                    setImageFile(null);
                  }}
                  className="bi bi-trash"
                ></i>
              )}
            </div>
          </div>
          <label className="image-checkbox" htmlFor="image-checkbox">
            <div className="text-container">
              <input
                type="checkbox"
                name="image-checkbox"
                id="image-checkbox"
                onChange={(e) => {
                  setHasImage(e.target.checked);
                  if (e.target.checked === false) {
                    setImageFile(null);
                    setPreview(null);
                  }
                }}
              />
              <span id="image-checkbox">adicionar imagem de perfil</span>
            </div>
            <p className="text">
              *você poderá adicionar uma imagem de perfil posteriormente ao seu
              cadastro
            </p>
          </label>
          <div className="packing">
            <div className="packing-card mb-3">
              <label htmlFor="exampleInputName1" className="form-label">
                Nome:
              </label>
              <input
                type="text"
                name="name"
                placeholder="nome"
                className="form-control"
                id="exampleInputName1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
              />
              {errors.name && (
                <div className="error-trick form-text">{errors.name}</div>
              )}
            </div>
            <div className="mb-3 packing-card">
              <label htmlFor="exampleInputUserName1" className="form-label">
                Nome de usuário:
              </label>
              <input
                type="text"
                name="userName"
                placeholder="nome de usuário"
                className="form-control"
                id="exampleInputUserName1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
              />
              {errors.userName && (
                <div className="error-trick form-text">{errors.userName}</div>
              )}
            </div>
          </div>
          <div className="mb-3 email_container">
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
              <div className="error-trick form-text">{errors.email}</div>
            )}
          </div>
          <div className="packing">
            <div className="mb-3 packing-card">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Senha:
              </label>
              <input
                name="password"
                placeholder="senha"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
              />
              {errors.password && (
                <div className="error-trick form-text">{errors.password}</div>
              )}
            </div>
            <div className="mb-3 packing-card">
              <label htmlFor="exampleInputPassword2" className="form-label">
                Confirmar Senha:
              </label>
              <input
                name="confirmPassword"
                placeholder="confirmar senha"
                type="password"
                className="form-control"
                id="exampleInputPassword2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                autoComplete="off"
              />
              {errors.confirmPassword && (
                <div className="error-trick form-text">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </div>
          <div className="mb-3 form-check">
            <input
              onChange={(e) => setChecked(e.target.checked)}
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label
              className="form-check-label form-text"
              htmlFor="exampleCheck1"
            >
              concordo com os termos de uso
            </label>
            <br />
            <br />
            <h4 className="form-text">
              já possuí conta?{" "}
              <Link className="form-text" to="/login">
                Faça seu login
              </Link>{" "}
            </h4>
          </div>
          {confirmTerms ? (
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          ) : (
            <button disabled type="submit" className="btn btn-secondary">
              Submit
            </button>
          )}
        </form>
      </div>
    </RegisterContainer>
  );
}
