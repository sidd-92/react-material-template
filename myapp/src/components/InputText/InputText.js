import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
const SIZES = {
  BIG: {
    className: " pl-3 pr-2 py-2 text-xl ",
    labelClassName: "text-xl",
  },
  SMALL: {
    className: " text-base ",
    labelClassName: "text-base",
  },
  NORMAL: {
    className: " pl-2 py-1 pr-1 text-lg ",
    labelClassName: "text-lg",
  },
};

class InputText extends React.Component {
  render() {
    let {
      size,
      label,
      placeholder,
      name,
      required,
      type,
      hasError,
      isWarning,
      isSucess,
      isLoading,
    } = this.props;
    let inputClassName =
      " border-2 border-blue-300 rounded-md transition duration-300 focus:bg-gray-200 outline-none focus:outline-none " +
      SIZES[size].className;

    inputClassName =
      inputClassName +
      (hasError && !isSucess && !isWarning
        ? " border-red-600 placeholder-red-600 "
        : "");

    inputClassName =
      inputClassName +
      (isSucess && !hasError && !isWarning
        ? " border-green-600 placeholder-green-600 "
        : "");

    inputClassName =
      inputClassName +
      (isWarning && !isSucess && !hasError
        ? " border-yellow-500 placeholder-yellow-500 "
        : "");
    return (
      <div className="flex flex-col relative">
        <label className={SIZES[size].labelClassName} htmlFor={name}>
          <b>{label}</b>
        </label>
        <input
          className={inputClassName}
          type={type}
          placeholder={placeholder}
          name={name}
          required={required}
        ></input>
        {isLoading ? (
          <div className="absolute" style={{ top: "33px", right: "10px" }}>
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin
              className="text-blue-600"
            />
          </div>
        ) : (
          ""
        )}

        {hasError ? (
          <div className="text-sm text-red-600">Error Message</div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

InputText.propTypes = {
  size: PropTypes.oneOf(["BIG", "SMALL", "NORMAL"]).isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isWarning: PropTypes.bool,
  isSucess: PropTypes.bool,
  hasError: PropTypes.bool,
  name: PropTypes.string,
  isLoading: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.oneOf([
    "text",
    "email",
    "number",
    "date",
    "datetime-local",
    "password",
  ]).isRequired,
};

export default InputText;
