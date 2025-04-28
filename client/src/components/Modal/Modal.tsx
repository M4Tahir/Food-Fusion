import React, {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode, RefObject,
  useCallback,
  useContext,
  useEffect, useLayoutEffect,
  useMemo,
  useState
} from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { useClickOutside } from "../../hooks";
import { mergeRefs } from "../../utils";

interface ModalContextType {
  open: (modalName: string) => void;
  close: () => void;
  openModalName: string;
}

const throwFn = () => {
  throw new Error("ModalContext used outside of provider");
};

const ModalContext = createContext<ModalContextType>({
  open: throwFn,
  close: throwFn,
  openModalName: ""
});

const Overlay = ({ children, backdropFilter = true }: { children: ReactNode; backdropFilter?: boolean }) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-20 bg-background/5",
        backdropFilter && "backdrop-blur-[2px]"
      )}>
      {children}
    </div>
  );
};

const Modal = ({ children, lockScroll = true }: { children: ReactNode; lockScroll?: boolean; }) => {
  const [openModalName, setOpenModalName] = useState("");

  const open = useCallback((modalName: string) => {
    setOpenModalName(modalName);
  }, []);

  const close = useCallback(() => {
    setOpenModalName("");
  }, []);

  // Lock scroll on modal open
  useEffect(() => {
    /* The problem with this is when overflow is hidden then scrollbar disappears, causing layout shift to prevent that
    * we can either add scroll listener and prevent scrolling or a clean solution will be to add padding right equal to
    * scroll bar with so when it disappears then it won't cause any layout shift. */

    // const scrollWidth = innerWidth-document.documentElement.clientWidth
    const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
    if (lockScroll && openModalName) {
      document.body.style.paddingRight = `${scrollWidth}px`;
      document.body.style.overflow = "hidden";
      // document.body.classList.add("overflow-hidden");
      return () => {
        // document.body.classList.remove("overflow-hidden");
        document.body.style.paddingRight = ``;
        document.body.style.overflow = "";
      };
    }
  }, [openModalName, lockScroll]);

  // Close on an Escape key
  useEffect(() => {
    function handleClick(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener(("keydown"), handleClick);
    return () => document.removeEventListener("keydown", handleClick);
  }, [close]);

  const contextValue = useMemo(() => ({ open, close, openModalName }), [open, close, openModalName]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

interface WindowProps {
  backdropFilter?: boolean;
  children: ReactNode;
  triggerRef?: RefObject<HTMLButtonElement | null>;
  modalName: string;
  showCloseButton?: boolean;
  size?: { height: string; width: string };
}

const Dialog = ({
                  children,
                  modalName,
                  size,
                  triggerRef,
                  backdropFilter = true,
                  showCloseButton = true
                }: WindowProps) => {
  const { openModalName, close } = useContext(ModalContext);
  const ref = useClickOutside<HTMLDivElement>(close);
  const dialogRef = useClickOutside<HTMLDivElement>(close);

  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const isOpen = modalName === openModalName;

  // Position calculation logic
  /* Its batter to use `useLayoutEffect` instead of `useEffect` as useEffect execute after browser paint, so let say that our model doesn't fit in the specified position then
  * it move somewhere and when the useEffect execute and calculate its position then we get it to correct pos which case mode to move form one place to other, we need something which run before
  * the browser paint and calculate the position, that's exactly what useLayoutEffect() does it run before the browser paint.
  *  */
  useLayoutEffect(() => {
    if (!isOpen) return;

    const trigger = triggerRef?.current;
    const dialog = dialogRef.current;

    if (trigger && dialog) {
      const triggerRect = trigger.getBoundingClientRect();
      const dialogRect = dialog.getBoundingClientRect();

      // const x = triggerRect.left + (triggerRect.width/2) - (dialogRect.width/2); // center align
      const x = triggerRect.left + (triggerRect.width) - (dialogRect.width);
      const y = triggerRect.bottom + 8;

      setPos({ x, y });
    }
  }, [dialogRef, isOpen, triggerRef]);


  if (modalName !== openModalName)
    return null;

  return createPortal(
    <Overlay backdropFilter={backdropFilter}>
      <div
        ref={mergeRefs(dialogRef, ref)} // can't have multiple refs so have to merge.
        role="dialog"
        aria-modal="true"
        className={clsx(
          "z-30 border bg-surface border-border rounded-xl absolute",
          !pos && "left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        )}
        style={{
          left: pos?.x,
          top: pos?.y,
          width: size?.width ?? "auto",
          height: size?.height ?? "auto"
        }}
      >
        {showCloseButton && (
          <button
            className="absolute top-1 right-1 z-30 cursor-pointer active:scale-75 ease-out duration-300"
            onClick={close}
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-foreground"
            >
              <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        )}
        <div>{children}</div>
      </div>
    </Overlay>,
    document.body
  );
};

const Open = ({ children, modalName }: {
  children: ReactElement<{ onClick?: () => void }>;
  modalName: string;
}) => {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => open(modalName)
  });
};


Modal.Dailog = Dialog;
Modal.Open = Open;

export default Modal;
