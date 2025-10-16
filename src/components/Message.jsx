const Message = ({ type = "info", children }) => {
    const colors = {
        success: "bg-green-50 border-green-300 text-green-800",
        error: "bg-red-50 border-red-300 text-red-800",
        warning: "bg-yellow-50 border-yellow-300 text-yellow-800",
        info: "bg-blue-50 border-blue-300 text-blue-800",
    };

    return (
        <div className={`p-4 mb-4 text-sm border rounded-lg ${colors[type]}`}>
            {children}
        </div>
    );
};

export default Message;
