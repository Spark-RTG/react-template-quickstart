import {
  privateAddModal,
  privateRemoveModal,
  privateUpdateModal,
} from "./state_slices/modalState"
import { useDispatch, useSelector, useStore } from "react-redux";
import { useEffect, useState } from "react";

import SLIconSource from "../assets/SLIconSource";
import { SLState } from "../SLReduxStore";
import UICard from "./UICard";
import UIImage from "./UIImage";

export type ModalPropsWithID = {
  id: number;
} & ModalProps;

export type ModalProps = {
  isShown: boolean;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
};

// Modal element
export function UIModal({ isShown, children, onClose }: ModalProps) {
  const dispatch = useDispatch();
  const store = useStore<SLState>();
  const [id, setId] = useState<number>(-1);
  useEffect(() => {
    const nextId = store.getState().modalState.nextID;
    setId(nextId);
  }, []);
  useEffect(() => {
    dispatch(
      privateAddModal({
        isShown,
        children,
        onClose,
      })
    );
    return () => {
      dispatch(
        privateRemoveModal({
          id,
        })
      );
    };
  }, []);
  useEffect(() => {
    dispatch(
      privateUpdateModal({
        id,
        isShown,
        children,
        onClose,
      })
    );
  }, [isShown, children, onClose]);
  return <></>;
}

// Modal List shown from the root
export function GlobalUIModal() {
  const modalList = useSelector(
    (state: SLState) => state.modalState.modalList
  );
  const modalListJSX = modalList.map((modal) => {
    const { id, isShown, children, onClose } = modal;
    return (
      <div
        className="modal-wrapper"
        key={id}
        style={isShown ? undefined : { display: "none" }}
      >
        <UICard>
          <>
            <div className="modal-close-button">
              <UIImage
                src={SLIconSource.CloseIcon}
                color="dark-blue"
                onClick={() => {
                  onClose();
                }}
              />
            </div>
            {children}
          </>
        </UICard>
      </div>
    );
  });
  return <div className="modal-list">{modalListJSX}</div>;
}
