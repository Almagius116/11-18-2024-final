function SkeletonCard() {
  return (
    <div className="p-4 border rounded-md shadow-md bg-white animate-pulse">
      <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-4 bg-gray-300 rounded-md mb-2 mx-auto w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded-md mb-2 mx-auto w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded-md mb-4 mx-auto w-1/2"></div>
      <div className="flex items-center justify-between my-4">
        <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
      </div>
      <div className="h-8 bg-gray-300 rounded-md"></div>
    </div>
  );
}

export default SkeletonCard;
