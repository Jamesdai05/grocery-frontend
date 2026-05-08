const FormContainer = ({children}) => {
  return (
      <div className="flex flex-col items-center justify-start min-h-screen min-w-6xl pt-16">
          <div className="md:w-1/3 px-4 w-full mx-auto">
              <div className="bg-white px-8 pt-6 pb-8 mb-4">
                  {children}
              </div>
          </div>
      </div>
  );
}
export default FormContainer