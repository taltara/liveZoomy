import React, { useState } from "react";

import { ReactComponent as LinksIcon } from "../../assets/link.svg";
import UserLinks from "./UserLinks";

import OutsideClickHandler from "react-outside-click-handler";

const Header = (props) => {
  const { userData } = props;
  const [linksOpen, setLinksOpen] = useState(false);
  //   console.log(userData);

  const areLinksRegistered = () => {
    const hasLink1 = userData
      ? userData.registeredLinks["1"]
        ? true
        : false
      : false;
    const hasLink2 = userData
      ? userData.registeredLinks["2"]
        ? true
        : false
      : false;

    return { hasLink1, hasLink2 };
  };

  const getTextByLinks = (registered) => {
    let topText = "";
    let text = "";

    if (registered.hasLink1) {
      if (registered.hasLink2) {
        topText = "All set!";
        text = "Check out your event links in 'my events', or in your mailbox.";
      } else
        text =
          "please select your 2nd event from Round 2 to complete registration";
    } else {
      if (registered.hasLink2) {
        text = "please select an event from Round 1 to complete registration";
      } else text = "select 1 event from each round";
    }
    return { text, topText };
  };

  const handleClickAway = () => {
    // console.log(linksOpen);

    if (linksOpen === "unset") {
      setLinksOpen(true);
      setTimeout(() => {
        setLinksOpen("unset");
      }, 300);
    } else if (linksOpen) {
      setLinksOpen(false);
    }
  };

  const userRegistered = areLinksRegistered();
  const introText = getTextByLinks(userRegistered);
  const toggleIconClass =
    !userRegistered.hasLink1 && !userRegistered.hasLink2
      ? "no-links"
      : "has-links";

  const finishedTextClass =
    introText.text && introText.topText ? "finish-bold" : "";
  return (
    <div className="header flex column align-center space-center">
      <div className="header-top flex align-center space-center">
        <p className="header-title">jump into events</p>
        <div className="links-toggle-button">
          <span
            className={`toggle-icon ${toggleIconClass} flex column align-center space-center`}
            onClick={(event) => {
              event.preventDefault();
              setLinksOpen((prevState) => !prevState);
            }}
          >
            <LinksIcon className="links-toggle-icon" />
            <p>my events</p>
          </span>
          <OutsideClickHandler
            onOutsideClick={handleClickAway}
            display={"contents"}
          >
            <UserLinks
              userData={userData}
              linksOpen={linksOpen}
              toggleOpen={setLinksOpen}
            />
          </OutsideClickHandler>
        </div>
      </div>
      <p className={`header-intro-text ${finishedTextClass}`}>{introText.topText}</p>
      <p className={`header-intro-text ${finishedTextClass}`}>{introText.text}</p>
    </div>
  );
};

export default Header;
