import React, { useCallback } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import { setModal } from "../../redux/commons";
import { COLORS } from "../../ultis/constants";

const modalInfo = (type?: string) => {
  switch (type) {
    case "danger":
      return {
        header: "Error",
        color: COLORS.DANGER,
      };

    case "warning":
      return {
        header: "Warning",
        color: COLORS.WARNING,
      };

    case "success":
      return {
        header: "Success",
        color: COLORS.SUCCESS,
      };

    default:
      return {
        header: "Information",
        color: COLORS.INFO,
      };
  }
};

const NotificationModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state: any) => {
    return state.commons.modal;
  });

  const { isOpen, type, message, onConfirm } = modal;

  const toggle = useCallback(() => {
    dispatch(setModal({ isOpen: !isOpen, type, message: "" }));
  }, [isOpen]);

  const headerStyle = { backgroundColor: modalInfo(type).color };

  const confirm = () => {
    onConfirm && onConfirm();
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} fade>
      <ModalHeader toggle={toggle} style={headerStyle}>
        {modalInfo(type).header}
      </ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        {onConfirm && (
          <Button color={type} onClick={confirm}>
            Confirm
          </Button>
        )}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NotificationModal;
