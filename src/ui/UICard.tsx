import React from "react";
import UIFlexBox from "./UIFlexbox";

type Props = {
  children?: JSX.Element[] | JSX.Element;
  className?: string;
  style?: React.CSSProperties;
};

function UICard({ children, style, className }: Props) {
  return (
    <div className={"ui-card " + (className ?? "")} style={style}>
      {children}
    </div>
  );
}

export default UICard;
