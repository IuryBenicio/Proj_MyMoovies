export default function SuccessModal(message: string) {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  );
}
