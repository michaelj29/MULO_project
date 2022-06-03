import { Modal as RBModal, Button } from "react-bootstrap";
const Modal = ({show, onClose, children}) => {  
    return (
      <>  
        <RBModal show={show} onHide={onClose}>
          <RBModal.Header closeButton>
            <RBModal.Title>Modal heading</RBModal.Title>
          </RBModal.Header>
          <RBModal.Body>{children}</RBModal.Body>
          <RBModal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onClose}>
              Save Changes
            </Button>
          </RBModal.Footer>
        </RBModal>
      </>
    );
}

export default Modal