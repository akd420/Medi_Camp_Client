// ConfirmToast.jsx
import { toast } from "react-hot-toast";

const ConfirmToast = ({
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
}) => {
  let confirmToastId = null;

  const showToast = () => {
    const confirmToast = toast.custom((t) => {
      confirmToastId = t.id;

      return (
        <div
          className={`max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {message || "Are you sure you want to proceed?"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => {
                onConfirm();
                toast.dismiss(t.id);
              }}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500"
            >
              {confirmText || "Confirm"}
            </button>
            <button
              onClick={() => {
                onCancel && onCancel();
                toast.dismiss(confirmToastId);
              }}
              className="w-full border border-transparent rounded-none p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none"
            >
              {cancelText || "Cancel"}
            </button>
          </div>
        </div>
      );
    });

    confirmToastId = confirmToast.id;
  };

  showToast();

  return confirmToastId;
};

export default ConfirmToast;
