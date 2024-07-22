const PredictionResult = ({ predictionResult }) => (
    <div className="mt-8 space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg shadow-lg border border-green-200">
        <h3 className="text-2xl font-bold mb-6 text-green-800 border-b-2 border-green-300 pb-2">
          Prediction Result
        </h3>
        <div className="flex items-center justify-center">
          <div
            className={`w-64 h-64 rounded-full flex items-center justify-center ${
              predictionResult === 0
                ? "bg-gradient-to-br from-green-400 to-green-600"
                : "bg-gradient-to-br from-red-400 to-red-600"
            }`}
          >
            <div className="text-white text-center">
              <div className="text-4xl font-bold mb-2">
                {predictionResult === 0 ? "No" : "Yes"}
              </div>
              <div className="text-xl">
                Maintenance
                <br />
                Needed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default PredictionResult;