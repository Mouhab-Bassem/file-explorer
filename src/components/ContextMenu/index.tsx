import React, { useEffect, useRef } from "react";

import "./style.css";

type TAction = {
  name: string;
  onClick: () => void;
};

type TContextMenuProps = {
  visible: boolean;
  y: number;
  x: number;
  actions: TAction[];
  onClose: any;
};

const ContextMenu: React.FC<TContextMenuProps> = ({
  visible,
  y,
  x,
  onClose,
  actions,
}) => {
  const contextRef = useRef<any>(null);
  const handleOutsideClick = (event: any) => {
    if (contextRef.current && !contextRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div ref={contextRef} className="context-menu" style={{ top: y, left: x }}>
      <ul className="context-menu-list">
        {actions.map((action: TAction, index: number) => (
          <li
            aria-hidden
            className="context-menu-list-item"
            key={index}
            onClick={action.onClick}
          >
            {action.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
