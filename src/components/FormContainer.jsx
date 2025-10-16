const FormContainer = ({children}) => {
  return (
      <div className="flex flex-col items-center justify-start min-h-screen min-w-6xl pt-16">
          <div className="max-w-xl px-4 w-full">
              <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
                  {children}
              </div>
          </div>
      </div>
  );
}
export default FormContainer