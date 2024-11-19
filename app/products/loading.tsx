import LoadingProduct from "@/components/LoadingProduct";

function loading() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
      {Array(9)
        .fill(null)
        .map((_, index) => (
          <LoadingProduct key={index} />
        ))}
    </div>
  );
}

export default loading;
