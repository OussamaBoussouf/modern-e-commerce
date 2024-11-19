function LoadingProduct() {
  return (
    <div className="max-w-[350px] animate-pulse">
      {/* IMAGE */}
      <div className="bg-gray-300 aspect-square rounded-lg">
      </div>
      {/* CONTENT */}
      <div className="mt-2 flex flex-col gap-2">
        <div className="font-bold bg-gray-300 w-1/2 h-5 rounded-lg"></div>
        <div className="flex items-center justify-between">
          <div className="w-20 h-5 inline-flex items-center gap-1 bg-gray-300 rounded-lg"></div>
          <div className="w-20 h-5 font-bold bg-gray-300 rounded-lg"></div>
        </div>
        <div className="text-sm bg-gray-300 rounded-lg h-5 w-full">
        </div>
      </div>
      {/* GROUP BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center mt-4 gap-2">
        <div className="bg-gray-300 rounded-lg h-10 flex-grow"></div>
        <div className="bg-gray-300 rounded-lg h-10 flex-grow"></div>
      </div>
    </div>
  );
}

export default LoadingProduct;
