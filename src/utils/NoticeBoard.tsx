import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState } from "react";
import apiInstance from "../../api";
import ButtonPrimary from "../components/Button";
import ModalNotice from "../components/ModalNotice";
import { ContainerButtonsModal } from "../components/ModalNotice/styles";
import { AdminNoticeBoard } from "../models/admin-notice-board.model";
import Clubs from "../services/clubs.service";

interface NoticeBoardProps {
  getNotice: () => void;
}

export const NoticeBoardContext = createContext<NoticeBoardProps>(
  {} as NoticeBoardProps
);

interface Props {
  children?: JSX.Element;
}

export const NoticeBoardProvider: React.FC<Props> = ({ children }) => {
  const [modalData, setModalData] = useState<AdminNoticeBoard>();

  const [modalNotice, setModalNotice] = useState<boolean>(false);

  const verifyingNoticeBoardLooked = async (
    noticeBoard: AdminNoticeBoard[]
  ) => {
    let json = await AsyncStorage.getItem("noticeBoard");
    let boardLooked: AdminNoticeBoard[];

    if (json !== null) {
      boardLooked = JSON.parse(json);
      const boardTratment = noticeBoard.find(
        (item2) => !boardLooked.some((item1) => item1.id === item2.id)
      );

      if (boardTratment !== null) {
        setModalData(boardTratment);
        setModalNotice(true);
      }
    } else {
      setModalData(noticeBoard[0]);
      setModalNotice(true);
    }
  };

  const setAdminNoticesBoard = async (noticeBoard: AdminNoticeBoard) => {
    let json = await AsyncStorage.getItem("noticeBoard");
    let boardLooked: AdminNoticeBoard[];

    if (json !== null) {
      boardLooked = JSON.parse(json);
      boardLooked.push(noticeBoard);
      AsyncStorage.setItem("noticeBoard", JSON.stringify(boardLooked));
    } else {
      AsyncStorage.setItem("noticeBoard", JSON.stringify([noticeBoard]));
    }
    setModalNotice(false);
  };

  const getNotice = async () => {
    const result = await Clubs.getAdminNoticesBoard();
    if (result?.data?.results) {
      verifyingNoticeBoardLooked(result?.data?.results);
    }
  };

  return (
    <NoticeBoardContext.Provider value={{ getNotice }}>
      {children}
      {modalNotice && modalData && (
        <ModalNotice
          text={modalData?.content || ""}
          title={modalData?.title || ""}
        >
          <ContainerButtonsModal>
            <ButtonPrimary
              title={"entendi, valeu!"}
              width={"half"}
              padding="8px"
              onPressAction={() => setAdminNoticesBoard(modalData)}
            />
          </ContainerButtonsModal>
        </ModalNotice>
      )}
    </NoticeBoardContext.Provider>
  );
};
