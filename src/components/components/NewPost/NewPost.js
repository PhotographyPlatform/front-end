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
  useDisclosure,
  Input,
  Textarea,
} from "@chakra-ui/react";
import "./NewPost.scss";
import axios from "axios";

function NewPost() {
  
  const TitleLimit = 65;
  const desLimit = 200;

  const [titleCounter, setTitleCounter] = useState(0);
  const [desCounter, setDesCounter] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const fileInputRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const allowedTags = [
    "animals",
    "nature",
    "tech",
    "sport",
    "colors",
    "anime",
    "movies",
    "games",
    "country",
    "Books",
    "house",
  ];

  const handleFileInputChange = () => {
    const fileNameSpan = document.getElementById("fileName");
    const fileInput = fileInputRef.current;

    if (fileInput.files.length > 0) {
      fileNameSpan.textContent = fileInput.files[0].name;
    } else {
      fileNameSpan.textContent = "";
    }
  };

  const onChangeTitle = (e) => {
    setTitleCounter(e.target.value.length);
  };

  const onChangeDes = (e) => {
    setDesCounter(e.target.value.length);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      imgurl: e.target.elements.fileInput.value,
      userid: 2,
      title: e.target.elements.title.value,
      contant: e.target.elements.descript.value,
      category: tags,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/v1/newPostCOll",
        newPost
      );
      console.log(response);
    } catch (error) {
      console.error("error when adding a new post: ", error);
    }
  };

  const addTagHandler = (e) => {
    const value = e.target.value;
    if (e.key === "Enter" && value.trim() !== "") {
      if (allowedTags.includes(value.trim())) {
        setTags([...tags, value]);
        e.target.value = "";
        setSuggestedTags([]);
      }
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((item) => item !== index));
  };

  const suggestTag = (e) => {
    setTagInput(e.target.value);
    const matchingTags = allowedTags.filter((tag) =>
      tag.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSuggestedTags(matchingTags);
  };

  const handleSuggestionClick = (suggestion) => {
    setTags([...tags, suggestion]);
    setTagInput("");
    setSuggestedTags([]);
  };

  return (
    <>
      <Button onClick={onOpen}>Add post</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent className="modal">
          <ModalHeader className="modal-title">Add post</ModalHeader>
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
                  <div>
                    <label
                      htmlFor="fileInput"
                      className="upload-image-container_ulpoader"
                    >
                      Choose File
                    </label>
                  </div>
                  <span id="fileName"></span>
                </div>

                <div className="modal-item">
                  <div className="counter-flex">
                    <label>Title</label>
                    <small>
                      {titleCounter}/{TitleLimit}
                    </small>
                  </div>
                  <Input
                    name="title"
                    className="modal-input"
                    onChange={onChangeTitle}
                    maxLength={TitleLimit}
                  />
                </div>

                <div className="modal-item">
                  <div className="counter-flex">
                    <label>Descript</label>
                    <small>
                      {desCounter}/{desLimit}
                    </small>
                  </div>
                  <Textarea
                    name="descript"
                    className="modal-input"
                    maxLength={desLimit}
                    onChange={onChangeDes}
                  />
                </div>

                <div className="modal-item">
                  <label>Tags</label>
                  <div className="tags">
                    <div className="tags-container">
                      {tags.map((item, index) => (
                        <div className="tags-item" key={index}>
                          <span className="text">{item}</span>
                          <span
                            onClick={() => removeTag(item)}
                            className="close"
                          >
                            &times;
                          </span>
                        </div>
                      ))}
                      <input
                        className="tag-input"
                        type="search"
                        placeholder="write tag.."
                        onKeyDown={addTagHandler}
                        onChange={suggestTag}
                        value={tagInput}
                      />
                    </div>

                    <ul className="suggestions">
                      {suggestedTags.map(
                        (suggestion, index) =>
                          !tags.includes(suggestion.trim()) && (
                            <li
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="suggestion"
                            >
                              {suggestion}
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>
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

export default NewPost;
