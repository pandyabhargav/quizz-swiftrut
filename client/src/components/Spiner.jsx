const Spiner = () => {
  return (
    <div className="spinner absolute z-20 top-0 left-0 w-full h-full flex items-center justify-center bg-transparent">
      <div className="circle w-16 h-16 rounded-full border-4 border-t-4 border-green-600 border-solid animate-spin"></div>
    </div>
  );
};

export default Spiner;
