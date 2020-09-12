import React from "react";
import LinkPreview from "./LinkPreview";

const LinksBlock = (props) => {
  const { links, togglePopup, blockIndex, userData } = props;

  const roundInfo = userData.registeredLinks[blockIndex];
  console.log(roundInfo);
  const blockClassAdd = roundInfo ? "secondary mute" : "";
  return (
    <>
      {links ? (
        <div className="link-block flex column align-center space-start">
          <p className={`block-title ${blockClassAdd}`}>{`ROUND ${blockIndex}`}</p>
          <div className="block-links flex wrap align-center space-evenly">
            {links.map((link, index) => {
              let classAdd = "";
              if (roundInfo) {
                if (link.id !== roundInfo.id) classAdd = "hidden-link";
                else classAdd = "chosen-link";
              }
              
              return (
                <LinkPreview
                  key={index}
                  link={link}
                  index={index}
                  togglePopup={() => togglePopup(link)}
                  classAdd={classAdd}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LinksBlock;
