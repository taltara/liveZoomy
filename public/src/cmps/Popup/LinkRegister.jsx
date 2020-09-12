import React, { useState, useEffect } from "react";

import TiltButton from "../../cmps/TiltButton/TiltButton";

const LinkRegister = (props) => {
  const { onRegisterConfirm } = props;
  const [openRegister, setOpenRegister] = useState(false);
  const [registerClass, setRegisterClass] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRegisterClass(openRegister ? "open-register" : "");
    }, 0);
  }, [openRegister]);

  return (
    <>
      {!isRegistering ? (
        <>
          <div className="free-content flex column align-center space-start">
            <p className="free-content-text">
              room is available, claim your place now!
            </p>
            <TiltButton
              buttonType="button"
              label={"register"}
              isLinkToExact={true}
              onClick={() => {
                if (!openRegister) setOpenRegister(true);
              }}
              buttonClass="tilt-button"
              //   buttonStyle={{ pointerEvents: openRegister ? "none" : "auto" }}
              linkClass={openRegister ? "inactive" : ""}
              isTilt={false}
              tiltOptions={{ scale: openRegister ? 1 : 1.15 }}
              animation="general"
            />

            {/* <p>{value.link}</p> */}
          </div>
          {openRegister ? (
            <footer
              className={`free-content-register ${registerClass} flex column align-center space-start`}
            >
              <p className="register-text">are you sure?</p>
              <div className="register-confirm flex align-center space-around">
                <TiltButton
                  buttonType="button"
                  label={"yes"}
                  isLinkToExact={true}
                  onClick={onRegisterConfirm}
                  buttonClass="tilt-button"
                  buttonStyle={{
                    backgroundColor: "lightgreen",
                    color: "unset",
                  }}
                  isTilt={false}
                  tiltOptions={{ scale: 1.1 }}
                  animation="activeTab"
                />
                <TiltButton
                  buttonType="button"
                  label={"no"}
                  isLinkToExact={true}
                  onClick={() => setOpenRegister(false)}
                  buttonClass="tilt-button"
                  buttonStyle={{ backgroundColor: "tomato", color: "unset" }}
                  isTilt={false}
                  tiltOptions={{ scale: 1.1 }}
                  animation="activeTab"
                />
              </div>
            </footer>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default LinkRegister;
