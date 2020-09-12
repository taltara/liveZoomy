import React from "react";

import TiltButton from "../cmps/TiltButton/TiltButton";

const rcolor = require("rcolor");
const goldenRatio = 0.618;
const LINK_LIMIT = 8;

const LinkPreview = (props) => {
  const { index, link, togglePopup, classAdd } = props;

  if (index) {
    rcolor.reSeed();
  }
  const bgc = rcolor({
    hue: (Math.random() + goldenRatio) % 1,
    saturation: 0.5,
    value: 1,
  });
  const radius = Math.floor(Math.random() * 51);
  const shadow = classAdd === "chosen-link" ? "0px 0px 7px 0px rgba(231, 166, 26, 0.75)" : `0px 0px ${Math.floor(
    Math.random() * 7
  )}px 0px rgba(0, 0, 0, ${Math.random()})`;
  const indicatorClass = link.users === LINK_LIMIT ? "full" : "";

  return (
    <div className={`link-preview ${classAdd}`}>
      <div className={`full-indicator ${indicatorClass}`}></div>
      <TiltButton
        key={index}
        buttonType="button"
        label={link.title}
        buttonStyle={{
          backgroundColor: bgc,
          borderRadius: `${radius}%`,
          boxShadow: shadow,
        }}
        isLinkToExact={true}
        onClick={() => togglePopup(link)}
        buttonClass="tilt-button"
        isTilt={true}
        tiltOptions={{ scale: 1.1, reversed: true }}
        animation="general"
      />
    </div>
  );
};

export default LinkPreview;
