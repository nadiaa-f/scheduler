import React from "react";
import classNames from "classnames";

import "components/Button.scss";
//renders button before saving/cancelling
export default function Button(props) {
  const { confirm, danger, onClick, disabled, children } = props;
  const buttonClass = classNames("button", {
    "button--confirm": confirm,
    "button--danger": danger
  });

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}