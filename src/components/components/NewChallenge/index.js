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
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import "./NewChallenge.scss";

function NewChallenge({ onCloseNewPost, isOpenNewPost }) {
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
  const [imageInput, setimageInput] = useState("");
  const [step, setStep] = useState(1);
  const [uploadingChallenge, setUploadingChallenge] = useState(false);
  const [showPlaceholderImg, setShowPlaceholderImg] = useState(true);

  const toast = useToast();
  const fileInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    const fileNameSpan = document.getElementById("fileName");
    const previewImage = document.getElementById("previewImage");
    const fileInput = fileInputRef.current;

    if (fileInput.files.length > 0) {
      fileNameSpan.textContent = fileInput.files[0].name;
      const selectedFile = fileInput.files[0];
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImage.src = e.target.result;
          previewImage.style.display = "block";
        };
        reader.readAsDataURL(selectedFile);
        setShowPlaceholderImg(false);
      }
    } else {
      fileNameSpan.textContent = "";
      previewImage.style.display = "none";
    }
    setisUploadImageInputEmpty(false);
    setimageInput(e.target.value);
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

    if (e.target.elements.title.value === "") setisTitleInputEmpty(true);
    if (e.target.elements.descript.value === "") setisDecEmpty(true);
    if (e.target.elements.rules.value === "") setIsRulesEmpty(true);
    if (e.target.elements.prize.value === "") setIsPrizeEmpty(true);
    if (e.target.elements.startDate.value === "") setIsStartEmpty(true);
    if (e.target.elements.endDate.value === "") setIsEndEmpty(true);

    const newChallenge = {
      imgurl: imageInput,
      title: e.target.elements.title.value,
      brief: e.target.elements.descript.value,
      rules: e.target.elements.rules.value,
      prize: e.target.elements.prize.value,
      startDate: e.target.elements.startDate.value,
      endDate: e.target.elements.endDate.value,
    };

    if (
      imageInput &&
      newChallenge.title &&
      newChallenge.brief &&
      newChallenge.rules &&
      newChallenge.prize &&
      newChallenge.startDate &&
      newChallenge.endDate
    ) {
      try {
        setUploadingChallenge(true);
        const response = await axios.post(
          "http://localhost:3002/v1/challenagesCollection",
          newChallenge
        );
        if (response.status === 201) {
          setUploadingChallenge(false);
          onCloseNewPost();
          toast({
            position: "top-left",
            title: "challenge created",
            description: "the challenge has been created succefully",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("error when adding a new challenge: ", error);
      }
    }
  };

  const validateTitleInput = isTitleInputEmpty
    ? "empty-title-input"
    : "title-input";
  const validateDecInput = isDecEmpty ? "empty-title-input" : "title-input";
  const validateRulesInput = isRulesEmpty ? "empty-title-input" : "title-input";
  const validatePrizeInput = isPrizeEmpty ? "empty-title-input" : "title-input";
  const validateStartInput = isStartEmpty ? "empty-title-input" : "title-input";
  const validateEndInput = isEndEmpty ? "empty-title-input" : "title-input";

  const onNetCLick = () => {
    if (!imageInput) {
      setisUploadImageInputEmpty(true);
      return;
    }
    setStep(2);
  };

  return (
    <>
      <Modal isOpen={isOpenNewPost} onClose={onCloseNewPost} size="xl">
        <ModalOverlay />
        <ModalContent className="modal modal-ch">
          <ModalHeader className="modal-title">Add Challenge</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={onSubmitHandler} className="modal-flex-con">
            <ModalBody>
              <div className="modal-form">
                {step !== 2 ? (
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
                      <div className="review-img-title">
                        {showPlaceholderImg && (
                          <div className="placeholder-con">
                            <img
                              src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3431627/picture-icon-md.png"
                              alt="yourimage"
                              className="image-placeholder"
                            />
                            <p>your image goes here</p>
                          </div>
                        )}
                        <img
                          id="previewImage"
                          src=""
                          alt="yourimage"
                          className="review-img review-img-ch"
                        />

                        <span id="fileName"></span>
                      </div>
                      <label
                        htmlFor="fileInput"
                        className="upload-image-container_ulpoader"
                      >
                        Ulpoad image
                      </label>
                    </div>
                    {isUploadImageInputEmpty && (
                      <span className="empty-img-input">
                        !! you must upload an image !!
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="section2">
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
                      <textarea
                        name="descript"
                        className={validateDecInput}
                        maxLength={desLimit}
                        placeholder="write the description here...."
                        onChange={onChangeDes}
                      ></textarea>
                    </div>

                    <div className="modal-item">
                      <div className="counter-flex">
                        <label>Rules</label>
                        <small>
                          {rulesCounter}/{desLimit}
                        </small>
                      </div>
                      <textarea
                        name="rules"
                        className={validateRulesInput}
                        maxLength={desLimit}
                        placeholder="write the Rules here...."
                        onChange={onChangerules}
                      ></textarea>
                    </div>

                    <div className="modal-item">
                      <div className="counter-flex">
                        <label>Prize</label>
                        <small>
                          {prizeCounter}/{desLimit}
                        </small>
                      </div>
                      <textarea
                        name="prize"
                        className={validatePrizeInput}
                        maxLength={desLimit}
                        placeholder="write the Prize here...."
                        onChange={onChangePrize}
                      ></textarea>
                    </div>

                    <div className="modal-item">
                      <div className="date-flex-1">
                        <div className="date-flex-2">
                          <label>Start:</label>
                          <input
                            type="date"
                            className={validateStartInput}
                            name="startDate"
                            onChange={onChangeStart}
                          />
                        </div>
                        <div className="date-flex-2">
                          <label>End:</label>
                          <input
                            type="date"
                            className={validateEndInput}
                            name="endDate"
                            onChange={onChangeEnd}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>

            <ModalFooter className="modal-buttons-nc">
              {step !== 2 ? (
                <Button variant="ghost" onClick={onCloseNewPost}>
                  Close
                </Button>
              ) : (
                <Button variant="ghost" onClick={() => setStep(1)}>
                  Previous
                </Button>
              )}
              {step !== 2 && (
                <Button colorScheme="blue" mr={3} onClick={onNetCLick}>
                  Next
                </Button>
              )}
              {step === 2 && (
                <Button type="submit" colorScheme="blue" mr={3}>
                  {!uploadingChallenge ? "Done" : <Spinner />}
                </Button>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      {/* } */}
    </>
  );
}

export default NewChallenge;
