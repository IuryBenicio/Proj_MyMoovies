import { AlertContainer } from "./styles";

type alertType = {
  type: " " | "success" | "error" | "secondary";
  closeAlert: () => void;
  messageText: string;
};
export default function AlertModal(props: alertType) {
  return (
    <AlertContainer
      className={
        props.type === "success" //+
          ? "alert alert-success" //+
          : props.type === "error" //+
          ? "alert alert-danger" //+
          : props.type === "secondary" //+
          ? "alert alert-secondary" //+
          : "alert alert-dark" //+
      }
    >
      <i onClick={() => props.closeAlert()} className="bi bi-x-circle"></i>
      {props.messageText}
    </AlertContainer>
  );
}
