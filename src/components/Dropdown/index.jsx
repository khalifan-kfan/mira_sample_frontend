import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { ReactComponent as DownArrow } from "../../assets/img/down-arrow-black.svg";
import { ReactComponent as StackIcon } from "../../assets/img/stack.svg";
import { ReactComponent as HtmlIcon } from "../../assets/img/html.svg";
import { ReactComponent as ReactIcon } from "../../assets/img/react.svg";
import { ReactComponent as NodeIcon } from "../../assets/img/nodejs.svg";
import styles from "./Dropdown.module.css";

const Dropdown = ({ required, name, placeholder, options, onChange }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setValue] = useState(
    `${placeholder}${required ? " *" : ""}`
  );
  const openSelectRef = useRef(null);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleChange = (selectedOption) => {
    setValue(selectedOption);
    toggleOptions();
    onChange(selectedOption);
  };

  const handleClickOutside = (event) => {
    if (
      openSelectRef.current &&
      !openSelectRef.current.contains(event.target)
    ) {
      setShowOptions(false);
    }
  };

  // componentWillMount & componentWillUnmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={openSelectRef} className={styles.SelectWrapper}>
      <div className={styles.SelectInputRow}>
        <div
          className={styles.SelectElementMain}
          onClick={toggleOptions}
          role="presentation"
        >
          <div
            className={`${styles.SelectElementValue} ${(selected.startsWith(placeholder) || showOptions) &&
              `${styles.SelectElementPlaceholder}`
              }`}
          >
            {showOptions ? `${placeholder} ${required ? "*" : ""}` : selected}
            <div
              className={`${styles.SelectArrow} ${showOptions && `${styles.SelectArrowShowOptions}`}`}
            >
              <DownArrow />
            </div>
          </div>
        </div>
        <div className={styles.FrameworkLogo}>
          {selected.startsWith('Framework') && <StackIcon className={styles.FrameworkIcon} />}
          {selected === 'Html-CSS-JS' && <HtmlIcon className={styles.FrameworkIcon} />}
          {selected === 'React' && <ReactIcon className={styles.FrameworkIcon} />}
          {selected === 'NodeJS' && <NodeIcon className={styles.FrameworkIcon} />}
        </div>
      </div>
      {showOptions && (
        <div className={styles.SelectOptionsWrapper}>
          {options.map((option, index) => (
            <div
              name={name}
              key={index}
              className={styles.SelectOption}
              onClick={() => handleChange(option)}
              role="presentation"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  required: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  required: false,
};

export default Dropdown;
