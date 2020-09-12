import React, { useState, useEffect } from "react";

import Popup from "../cmps/Popup/Popup";
import LinksBlock from "../cmps/LinksBlock";
import Header from "../cmps/Header/Header";
import socketService from "../services/socketService";
import storageService from "../services/storageService";
import { KEY_USER } from "../services/auth";

import { connect } from "react-redux";
import { loadBoard, save, setBoard } from "../store/actions/boardActions";

const Zoomy = (props) => {
  const { loadBoard, save, setBoard, board } = props;
  const [popupOpen, setPopupOpen] = useState(false);
  const [currLink, setCurrLink] = useState(null);
  const [userData, setUserData] = useState(
    storageService.loadFromStorage(KEY_USER)
  );

  useEffect(() => {
    socketService.setup();
    socketService.emit("setBoard");
    socketService.on("loadBoard", setBoard);
    loadBoard();

    if (!userData) {
      storageService.saveToStorage(KEY_USER, {
        email: "",
        registeredLinks: { 1: null, 2: null },
      });
      setUserData({
        email: "",
        registeredLinks: { 1: null, 2: null },
      });
    }

    // return socketUnsubscribe();
  }, []);

  const socketUnsubscribe = () => {
    socketService.off("loadBoard", setBoard);
    socketService.terminate();
  };

  const onRegister = (link) => {
    // console.log(link);
    updateUser(link);

    let currBoard = { ...board };
    let currRound = [...currBoard.links[link.round - 1]];
    const idx = currRound.findIndex((aLink) => {
      return aLink.id === link.id;
    });
    currRound[idx].users += 1;
    currBoard.links[link.round - 1] = currRound;
    save(currBoard);
  };

  const updateUser = (link) => {
    let userData = storageService.loadFromStorage(KEY_USER);
    userData.registeredLinks[link.round] = { url: link.link, id: link.id, title: link.title };
    // console.log(userData);
    setUserData(userData);
    storageService.saveToStorage(KEY_USER, userData);
  };

  useEffect(() => {
    if (board) {
      console.log("BOARD");
      // console.log(board);
    }
  }, [board]);

  const togglePopup = (tab = null) => {
    setCurrLink(tab);
    setPopupOpen((prevState) => !prevState);
  };

  const buttonsHeight = window.innerHeight - 80;

  
  return (
    <div className="zoomy">
      <Header userData={userData} />
      <main
        className="zoomy-buttons flex column align-center space-center"
        style={{ maxHeight: `${buttonsHeight}px` }}
      >
        {board && board.links
          ? board.links.map((linkBlock, index) => {
              return (
                <LinksBlock
                  key={index}
                  links={linkBlock}
                  togglePopup={togglePopup}
                  blockIndex={index + 1}
                  userData={userData}
                />
              );
            })
          : null}
      </main>
      <Popup
        link={currLink}
        isOpen={popupOpen}
        handleClose={togglePopup}
        onRegister={onRegister}
        userData={userData}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    board: state.board.board,
    // loggedInUser: state.user.loggedInUser
  };
};

const mapDispatchToProps = {
  loadBoard,
  save,
  setBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(Zoomy);
