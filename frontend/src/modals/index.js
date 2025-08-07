import ModalAddChannel from "./ModalAddChannel";
import ModalRenameChannel from "./ModalRenameChannel";
import ModalRemoveChannel from "./ModalRemoveChannel";

const modals = {
  adding: ModalAddChannel,
  renaming: ModalRenameChannel,
  removimg: ModalRemoveChannel,
};

export default modalName => modals[modalName];