const FormContainer = ({children}) => {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-md px-4 w-full">
              <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
                  {children}
              </div>
          </div>
      </div>
  );
}
export default FormContainer