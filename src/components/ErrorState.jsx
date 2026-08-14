function ErrorState({ message }) {
  return (
    <div className="error-state">
      <h2>Oops! Something went wrong.</h2>

      <p>
        {message || "Unable to load the news right now."}
      </p>

      <button
        type="button"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorState;