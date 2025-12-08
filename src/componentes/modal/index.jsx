/*import { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalAlert() {

    
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShow(false);
  
    <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button> 

    useEffect(() => {

        setShowModal(true);


    }, []);
    return (
        <div>
          
            {showModal && (
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal Automático</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Este modal apareceu sem um clique de botão, usando useEffect!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );


}*/