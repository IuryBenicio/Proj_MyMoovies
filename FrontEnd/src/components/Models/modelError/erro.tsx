export default function errorModal(message: string) {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  );
}
