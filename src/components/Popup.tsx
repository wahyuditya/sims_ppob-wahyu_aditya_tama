import Button from "./Button";

interface PopupProps {
  isSuccess: boolean;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

function Popup({ isSuccess, message, onConfirm, onCancel }: PopupProps) {
  return (
    <div className="fixed inset-0 bg-[#00000065] flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
        <img src="#" alt="" />
        <p className="text-lg font-semibold mb-4">{message}</p>
        {!isSuccess ? (
          <div className="flex justify-between gap-4">
            <Button lable="Ya" onClick={onConfirm} />
            <Button lable="Tidak" onClick={onCancel} secondary />
          </div>
        ) : (
          <Button lable="Tutup" onClick={onCancel} />
        )}
      </div>
    </div>
  );
}

export default Popup;
