import React, { useState, useEffect } from "react";

import TiltButton from "../TiltButton/TiltButton";

import { CopyToClipboard } from "react-copy-to-clipboard";

const TextCopy = (props) => {
  const { data, size } = props;

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  let buttonClassAdd = copied ? "copied " : "";
  buttonClassAdd += size ? size === "large" ? "large" : "" : "";

  console.log(data);
  const showingLink = data.url ? data.url : data;
  return (
    <div
      className={`textcopy ${buttonClassAdd} flex align-center space-between`}
    >
      <input className="textcopy-input" type="text" value={showingLink} disabled={true} />
      <CopyToClipboard text={showingLink} onCopy={() => setCopied(true)}>
        <TiltButton
          buttonType="button"
          label={"copy"}
          isLinkToExact={true}
          onClick={null}
          buttonClass="tilt-button"
          isTilt={false}
          tiltOptions={{ scale: 1 }}
          animation="general"
        />
      </CopyToClipboard>
    </div>
  );
};

export default TextCopy;
