import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const Backdrop = ({ children, onClick }: Props) => {
  useEffect(() => {
    // Prevent body scroll when backdrop is mounted
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // Restore original scroll behavior when backdrop unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-screen flex items-center justify-center bg-black/60 backdrop-blur-sm z-9999 overflow-hidden"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Backdrop;
