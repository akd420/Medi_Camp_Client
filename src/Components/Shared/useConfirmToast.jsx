import { toast } from 'react-hot-toast';

const confirmToast = (message, color, onYes, onNo) => {
  const toastId = toast.custom({
    duration: Infinity,
    t: ({ id, visible }) => (
      <div key={id} className={`transition-opacity ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-10px]'} max-w-3xl w-full bg-white rounded-lg pointer-events-auto py-6 px-8 flex items-center justify-between flex-wrap`}>
        {visible && (
          <>
            <div>{message}</div>
            <div className="flex items-center">
              <button
                className={`px-4 py-2 ${color ? 'bg-red-500' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  onYes();
                  toast.dismiss(toastId);
                }}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 rounded-full font-semibold text-sm ml-2"
                onClick={() => {
                  onNo();
                  toast.dismiss(toastId);
                }}
              >
                No
              </button>
            </div>
          </>
        )}
      </div>
    ),
  });

  return toastId;
};

export default confirmToast;
