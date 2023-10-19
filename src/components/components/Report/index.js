import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Report.scss";
import cookies from 'react-cookies';
import jwtDecode from "jwt-decode";
function Report({ onCloseReport, isOpenReport, actionId, actionType }) {



  // Cookies  
  const session_user = cookies.load('user_session');
  let decoded = null;
  if (session_user) {
    decoded = jwtDecode(session_user);
  }
  const userId = decoded.userId;


  const desLimit = 200;

  const [desCounter, setDesCounter] = useState(0);

  const toast = useToast();

  const onChangeDetails = (e) => {
    setDesCounter(e.target.value.length);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const report = {
      userId: userId,
      actionId: actionId,//props
      actionType: actionType,//props
      categories: e.target.elements.categories.value,
      details: e.target.elements.details.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/v1/reportCollection",
        report
      );
      if (response.status === 201) {
        onCloseReport();
        toast({
          position: 'top-left',
          title: 'Submitted',
          description: "thanks for your feedback",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("error when submiting a report", error);
    }
  };

  return (
    <>

      <Modal isOpen={isOpenReport} onClose={onCloseReport} size="xl">
        <ModalOverlay />
        <ModalContent className="modal modal-report">
          <ModalHeader className="modal-title">Report</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={onSubmitHandler}>
            <ModalBody>
              <div className="modal-form">

                <div className="modal-item">
                  <div className="counter-flex">
                    <label>What type of issue are you reporting?</label>
                  </div>
                  <select
                    name="categories"
                    placeholder="write the title here...."
                    className='title-input'
                  >
                    <option vlaue="Spam">Spam</option>
                    <option vlaue="Inappropriate pictures">Inappropriate pictures</option>
                    <option vlaue="Hate Speech">Hate Speech</option>
                    <option vlaue="Violence">Violence</option>
                    <option vlaue="Abuse">Abuse</option>
                    <option vlaue="Misinformation">Misinformation</option>
                    <option vlaue="Other">Other</option>
                  </select>
                </div>

                <div className="modal-item">
                  <div className="counter-flex">
                    <label>more details</label>
                    <small>
                      {desCounter}/{desLimit}
                    </small>
                  </div>
                  <textarea name="details"
                    className='title-input'
                    maxLength={desLimit}
                    placeholder="tell us more...."
                    onChange={onChangeDetails}></textarea>
                </div>

              </div>
            </ModalBody>

            <ModalFooter className="modal-buttons-r">
              <Button variant="ghost" onClick={onCloseReport}>
                Close
              </Button>
              <Button type="submit" colorScheme="blue" mr={3}>
                Done
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Report;

