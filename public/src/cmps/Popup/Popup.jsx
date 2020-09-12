import React, { useState, useEffect } from "react";

import LoadingRing from "./LoadingRing";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import LinkRegister from "./LinkRegister";
import TextCopy from "../TextCopy/TextCopy";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SimpleDialogDemo = (props) => {
  const { isOpen, handleClose, link, onRegister, userData } = props;
  const [value, setValue] = useState(link);
  const [isSelected, setIsSelected] = useState(false);

  const LINK_LIMIT = 8;

  useEffect(() => {}, []);

  useEffect(() => {
    if (isOpen) {
      // setTimeout(() => {
      console.log(link);
      setValue(link);
      if (link) {
        let selected = false;
        if (userData.registeredLinks[link.round]) {
          selected = userData.registeredLinks[`${link.round}`].id === link.id;
        }

        setIsSelected(selected);
      }
      // }, 500);
    } else {
      setValue(null);
      if (isSelected) {
        setIsSelected(false);
      }
    }
  }, [isOpen]);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
  }));

  const SimpleDialog = (props) => {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleRegisterClick = () => {
      onRegister(value);
      setIsSelected(true);
    };

    // console.log(link);
    const isLinkFull = link ? link.users === LINK_LIMIT : true;
    // console.log(value);
    const linkTitleClass = isSelected ? "selected-title" : "";
    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        TransitionComponent={Transition}
        classes={classes.dialog}
        PaperProps={{
          style: {
            overflowY: "unset",
            height: 250,
            width: 500,
          },
        }}
      >
        <CloseIcon className="close-icon" onClick={handleClose} />
        {value ? (
          <section className="popup-content flex column align-center space-start">
            <p
              className={`link-title ${linkTitleClass} flex align-center space-center`}
            >
              {value.title}
            </p>
            {isSelected ? (
              <div className="selected-content flex column align-center space-around">
                <p className="selected-text">
                  <span>Awesome</span>, you're registered!
                </p>
                <p>
                  feel free to copy the event url or view all your events in 'my
                  events'
                </p>
                <div className="link-open">
                  <a
                    href={value.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in new tab
                  </a>
                </div>
                <div className="link-copy-container">
                  <TextCopy data={value.link} size={"large"} />
                </div>
              </div>
            ) : isLinkFull ? (
              <div className="full-content flex column align-center space-around">
                <p>we're sorry, this event is full.</p>
                <p>please try another!</p>
              </div>
            ) : (
              <LinkRegister
                value={value}
                handleClick={null}
                onClose={handleClose}
                onRegisterConfirm={handleRegisterClick}
              />
            )}
          </section>
        ) : (
          <LoadingRing />
        )}
      </Dialog>
    );
  };

  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

  //   const handleClose = (value) => {
  //     setSelectedValue(value);
  //   };

  return <SimpleDialog open={isOpen} onClose={handleClose} />;
};

export default SimpleDialogDemo;
