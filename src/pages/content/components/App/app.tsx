import useFileUploader from "@src/hooks/useFileUploader";
import useGoogleAnalytics from "@src/hooks/useGoogleAnalytics";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import BuyMeACoffee from "../BuyMeACoffee";
import StopIcon from "../Icons/StopIcon";
import UploadIcon from "../Icons/UploadIcon";
import Popup from "../Popup";
import ProgressBar from "../ProgressBar";

export default function App() {
  const {
    isSubmitting,
    onFileChange,
    onUploadButtonClick,
    fileInputRef,
    currentPart,
    totalParts,
    chunkSize,
    onChunkSizeChange,
    basePrompt,
    singleFilePrompt,
    multipleFilesPrompt,
    lastPartPrompt,
    setSingleFilePrompt,
    setMultipleFilesPrompt,
    setLastPartPrompt,
    setBasePrompt,
    updateLocalStorageSettings,
    blacklist,
    ignoreExtensions,
    setBlacklist,
    setIgnoreExtensions,
    updateBlackListAndIgnoreExtensions,
    setIsStopRequested,
    handleFileInput,
    multipleFilesUpPrompt,
    setMultipleFilesUpPrompt,
    overlapSize,
    onOverlapSizeChange,
  } = useFileUploader();

  const { firePageViewEvent } = useGoogleAnalytics();

  useEffect(() => {
    firePageViewEvent(document.title, document.location.href);
  }, []);

  return (
    <>
      <Toaster containerStyle={{ zIndex: 99999 }} />

      <Popup title="Wanna make a donation?">
        <div
          className="flex flex-col items-center justify-between gap-6"
          style={{
            marginTop: "10px",
          }}
        >
          <span className="text-gray-700 dark:text-gray-200 text-sm text-center">
            If you like the File Uploader extension,
            <br />
            you can support me with a coffee ☕
          </span>

          <BuyMeACoffee referrer="popup" />

          <span className="text-gray-700 dark:text-gray-200 text-xs">
            You will not see this message again after you close it.
          </span>
        </div>
      </Popup>
      <div
        className="flex flex-col items-center justify-center w-full h-full"
        style={{ marginLeft: 4 }}
      >
        <div
          className="py-2 flex flex-col md:flex-row items-center gap-2 w-full"
          style={{ justifyContent: "end" }}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={onFileChange}
            accept="*"
          />

          <div className="flex flex-row items-center justify-start gap-1">
            <button
              className={`text-white rounded-md w-fit hover:opacity-80 transition-all ${isSubmitting ? "cursor-not-allowed bg-gray-900" : "bg-green-500"
                }`}
              onClick={onUploadButtonClick}
              disabled={isSubmitting}
              style={{ height: "36px", padding: "0 8px" }}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFileInput(e.dataTransfer.files);
              }}
            >
              <UploadIcon />
            </button>

            {isSubmitting && (
              <button
                className="text-white rounded-md w-fit hover:opacity-80 transition-all bg-red-500"
                onClick={() => setIsStopRequested(true)}
                style={{ height: "36px", padding: "0 8px" }}
              >
                <StopIcon />
              </button>
            )}
          </div>
        </div>
        <span className="text-gray-600 dark:text-gray-300 text-xs">
          {chunkSize} chars
        </span>
        {isSubmitting && totalParts > 0 && (
          <div className="progressbar-container flex flex-col items-center justify-center gap-2">
            <ProgressBar completed={currentPart} total={totalParts} />
            <span className="text-gray-600 dark:text-gray-300 text-xs">
              {currentPart} of {totalParts} parts uploaded
            </span>
          </div>
        )}
      </div>
    </>
  );
}
