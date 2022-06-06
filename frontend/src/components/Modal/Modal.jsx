import { Modal as RBModal, Button } from "react-bootstrap";
const Modal = ({show, onClose, children}) => {  
    return (
      <>  
        <RBModal show={show}  onHide={onClose}>
          <RBModal.Header closeButton>
            <RBModal.Title>Update your review</RBModal.Title>
          </RBModal.Header>
          <RBModal.Body>{children}</RBModal.Body>
          <RBModal.Footer>
            <Button variant="primary" onClick={onClose}>
              CLOSE
            </Button>
          </RBModal.Footer>
        </RBModal>
      </>
    );
}

export default Modal