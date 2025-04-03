import { useSelector } from "react-redux";
import { RootReducer } from "../../../store";
import { EditImageContainer } from "./styles";
import { useState } from "react";

export default function EditImageModel() {
  const { user } = useSelector((state: RootReducer) => state.user);

  const [imageFile, setImageFile] = useState<File | null>(null); // Guarda o arquivo
  const [preview, setPreview] = useState<string | null>(null); // Guarda a URL do preview

  return (
    <EditImageContainer>
      <div className="image">
        <img src={user.profileImage.path} alt="" />
      </div>
      <div className="trocar-imagem">
        <div className="input">
          <input type="file" accept="image/*" name="" id="" />
          <button type="button" className="btn btn-outline-secondary">
            Clique para selecionar uma nova imagem
          </button>
        </div>
      </div>
    </EditImageContainer>
  );
}
