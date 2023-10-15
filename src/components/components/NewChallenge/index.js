import React, { useRef, useState } from "react";
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
import "./NewChallenge.scss";
// import { useSelector } from "react-redux";

function NewChallenge({onCloseNewPost, isOpenNewPost}) {
  
  const TitleLimit = 65;
  const desLimit = 500;

  const [titleCounter, setTitleCounter] = useState(0);
  const [desCounter, setDesCounter] = useState(0);
  const [rulesCounter, setRulesCounter] = useState(0);
  const [prizeCounter, setPrizeCounter] = useState(0);
  const [isUploadImageInputEmpty, setisUploadImageInputEmpty] = useState(false);
  const [isTitleInputEmpty, setisTitleInputEmpty] = useState(false);
  const [isDecEmpty, setisDecEmpty] = useState(false);
  const [isRulesEmpty, setIsRulesEmpty] = useState(false);
  const [isPrizeEmpty, setIsPrizeEmpty] = useState(false);
  const [isStartEmpty, setIsStartEmpty] = useState(false);
  const [isEndEmpty, setIsEndEmpty] = useState(false);

  // const role = useSelector(state=> state.user.token);
  
  const toast = useToast();
  const fileInputRef = useRef(null);

  const handleFileInputChange = () => {
    const fileNameSpan = document.getElementById("fileName");
    const fileInput = fileInputRef.current;

    if (fileInput.files.length > 0) {
      fileNameSpan.textContent = fileInput.files[0].name;
    } else {
      fileNameSpan.textContent = "";
    }
    setisUploadImageInputEmpty(false);
  };

  const onChangeTitle = (e) => {
    setTitleCounter(e.target.value.length);
    setisTitleInputEmpty(false);
  };

  const onChangeDes = (e) => {
    setDesCounter(e.target.value.length);
    setisDecEmpty(false);
  };
  
  const onChangerules = (e) => {
    setRulesCounter(e.target.value.length);
    setIsRulesEmpty(false);
  };

  const onChangePrize = (e) => {
    setPrizeCounter(e.target.value.length);
    setIsPrizeEmpty(false);
  };
  
  const onChangeStart = (e) => {
    setPrizeCounter(e.target.value.length);
    setIsStartEmpty(false);
  };

  const onChangeEnd = (e) => {
    setPrizeCounter(e.target.value.length);
    setIsEndEmpty(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    e.target.elements.fileInput.value ? setisUploadImageInputEmpty(false) : setisUploadImageInputEmpty(true);
    if(e.target.elements.title.value === '') setisTitleInputEmpty(true);
    if(e.target.elements.descript.value === '') setisDecEmpty(true);
    if(e.target.elements.rules.value === '') setIsRulesEmpty(true);
    if(e.target.elements.prize.value === '') setIsPrizeEmpty(true);
    if(e.target.elements.startDate.value === '') setIsStartEmpty(true);
    if(e.target.elements.endDate.value === '') setIsEndEmpty(true);

    const newChallenge = {
      imgurl: e.target.elements.fileInput.value,
      title: e.target.elements.title.value,
      brief: e.target.elements.descript.value,
      rules: e.target.elements.rules.value,
      prize: e.target.elements.prize.value,
      startDate: e.target.elements.startDate.value,
      endDate: e.target.elements.endDate.value
    };

    if (newChallenge.imgurl || newChallenge.title || newChallenge.brief || newChallenge.rules || newChallenge.prize || newChallenge.startDate || newChallenge.endDate) {
    try {
      const response = await axios.post(
        "http://localhost:3002/v1/challenagesCollection",
        newChallenge
      );
      if(response.status === 201){
        onCloseNewPost();
        toast({
          position:'top-left',
          title: 'challenge created',
          description: "the challenge has been created succefully",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("error when adding a new challenge: ", error);
    }

  }
  };

  const validateTitleInput = isTitleInputEmpty ?  'empty-title-input' : 'title-input';
  const validateDecInput = isDecEmpty ?  'empty-title-input' : 'title-input';
  const validateRulesInput = isRulesEmpty ?  'empty-title-input' : 'title-input';
  const validatePrizeInput = isPrizeEmpty ?  'empty-title-input' : 'title-input';
  const validateStartInput = isStartEmpty ?  'empty-title-input' : 'title-input';
  const validateEndInput = isEndEmpty ?  'empty-title-input' : 'title-input';

  return (
    <>

    {/* {role.role==='admin' &&  */}

      <Modal isOpen={isOpenNewPost} onClose={onCloseNewPost} size="xl">
        <ModalOverlay />
        <ModalContent className="modal">
          <ModalHeader className="modal-title">Add Challenge</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={onSubmitHandler}>
            <ModalBody>
              <div className="modal-form">
                <div className="upload-image-container modal-item">
                  <input
                    type="file"
                    name="fileInput"
                    id="fileInput"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                  />
                  <div className="ulpoad-dec">
                    <p>Upload your image here</p>
                    <label
                      htmlFor="fileInput"
                      className="upload-image-container_ulpoader"
                    >
                      Ulpoad image
                    </label>
                  </div>
                  {isUploadImageInputEmpty && <span className="empty-img-input">!! you must upload an image !!</span>}
                  <span id="fileName"></span>
                </div>

                <div className="modal-item">
                  <div className="counter-flex">
                    <label>Title</label>
                    <small>
                      {titleCounter}/{TitleLimit}
                    </small>
                  </div>
                  <input
                    type="text"
                    name="title"
                    placeholder="write the title here...."
                    className={validateTitleInput}
                    onChange={onChangeTitle}
                    maxLength={TitleLimit}
                  />
                </div>

                <div className="modal-item">
                  <div className="counter-flex">
                    <label>Description</label>
                    <small>
                      {desCounter}/{desLimit}
                    </small>
                  </div>
                  <textarea name="descript"
                    className={validateDecInput}
                    maxLength={desLimit}
                    placeholder="write the description here...."
                    onChange={onChangeDes}></textarea>
                </div>
                
                <div className="modal-item">
                  <div className="counter-flex">
                    <label>Rules</label>
                    <small>
                      {rulesCounter}/{desLimit}
                    </small>
                  </div>
                  <textarea name="rules"
                    className={validateRulesInput}
                    maxLength={desLimit}
                    placeholder="write the Rules here...."
                    onChange={onChangerules}></textarea>
                </div>
                
                <div className="modal-item">
                  <div className="counter-flex">
                    <label>Prize</label>
                    <small>
                      {prizeCounter}/{desLimit}
                    </small>
                  </div>
                  <textarea name="prize"
                    className={validatePrizeInput}
                    maxLength={desLimit}
                    placeholder="write the Prize here...."
                    onChange={onChangePrize}></textarea>
                </div>
                
                <div className="modal-item">
                  <div className="date-flex-1">
                   <div className="date-flex-2">
                   <label>Start:</label>
                   <input type="date" className={validateStartInput} name="startDate" onChange={onChangeStart}/>
                   </div>
                   <div className="date-flex-2">
                   <label>End:</label>
                   <input type="date" className={validateEndInput} name="endDate" onChange={onChangeEnd}/>
                   </div>
                  </div>
                </div>

              </div>
            </ModalBody>

            <ModalFooter className="modal-buttons-nc">
              <Button variant="ghost" onClick={onCloseNewPost}>
                Close
              </Button>
              <Button type="submit" colorScheme="blue" mr={3}>
                Done
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      {/* } */}
    </>
  );
}

export default NewChallenge;

