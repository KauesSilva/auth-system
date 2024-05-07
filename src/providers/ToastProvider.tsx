import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        success: {
          iconTheme: {
            primary: "green",
            secondary: "#FAFAFA",
          },
        },
        error: {
          iconTheme: {
            primary: "red",
            secondary: "#FAFAFA",
          },
        },
        className:
          "p-4 border border-solid bg-white text-[#09090B] border-[#F4F4F5] dark:bg-[#09090B] dark:text-[#FAFAFA] dark:border-[#27272A]",
      }}
    />
  );
}
