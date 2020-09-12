import React from "react";

import TextCopy from "../TextCopy/TextCopy";

const LinksContainer = (props) => {
  const { userData, linksOpen } = props;

  let links = [];
  if (userData) {
    if (userData.registeredLinks["1"] || userData.registeredLinks["2"]) {
      links = Object.keys(userData.registeredLinks);
    }
  }
  const userLinksClass = linksOpen === true ? "open-links" : "";
  console.log(links);
  return (
    <div className={`user-links ${userLinksClass}`}>
      {links.length ? (
        links.map((linkKey, index) => {
          return userData.registeredLinks[linkKey] ? (
            <div key={index} className="link-group">
              <p className="link-title">
                {userData.registeredLinks[linkKey].title}
              </p>
              <TextCopy key={index} data={userData.registeredLinks[linkKey]} />
            </div>
          ) : null;
        })
      ) : (
        <p className="links-empty-text">start selecting events to have them appear here</p>
      )}
    </div>
  );
};

export default LinksContainer;
