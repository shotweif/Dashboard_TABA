
const ErrorComponent: React.FC = () => {
    const handleRetry = () => {
        window.location.reload()
      }
    
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <p className="text-xl mb-8">Ha ocurrido un error al obtener los datos</p>
        <button 
          onClick={handleRetry}
          className="bg-green-700 hover:bg-green-900 text-white font-bold py-3 px-6 rounded"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
      )
};

export default ErrorComponent;