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
import { useSelector } from "react-redux";
import "./NewPost.scss";

function NewPost({ onCloseNewPost, isOpenNewPost }) {

  const TitleLimit = 65;
  const desLimit = 200;

  const [titleCounter, setTitleCounter] = useState(0);
  const [desCounter, setDesCounter] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [isUploadImageInputEmpty, setisUploadImageInputEmpty] = useState(false);
  const [isTitleInputEmpty, setisTitleInputEmpty] = useState(false);
  const [isDecEmpty, setisDecEmpty] = useState(false);
  const [isTagInputEmpty, setIsTagInputEmpty] = useState(false);

  const toast = useToast();
  const fileInputRef = useRef(null);

  const allowedTags = useSelector((state) => state.search.categories.map(item => item.name));

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (e.target.elements.title.value === '') setisTitleInputEmpty(true);
    if (e.target.elements.descript.value === '') setisDecEmpty(true);
    if (tags.length === 0) setIsTagInputEmpty(true);
    e.target.elements.fileInput.value ? setisUploadImageInputEmpty(false) : setisUploadImageInputEmpty(true);

    const newPost = {
      imgurl: e.target.elements.fileInput.value,
      userid: 1,
      title: e.target.elements.title.value,
      contant: e.target.elements.descript.value,
      category: tags,
    };

    if (newPost.imgurl && newPost.title && newPost.contant && newPost.category.length) {
      try {
        const response = await axios.post(
          "http://localhost:3002/v1/newPostCOll",
          newPost
        );
        if (response.status === 201) {
          onCloseNewPost();
          toast({
            position: 'top-left',
            title: 'Post created',
            description: "your post has been created succefully",
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          setTags([]);
        }
      } catch (error) {
        console.error("error when adding a new post: ", error);
      }

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
    setIsTagInputEmpty(false)
  };

  const handleSuggestionClick = (suggestion) => {
    setTags([...tags, suggestion]);
    setTagInput("");
    setSuggestedTags([]);
  };

  const validateTagInput = isTagInputEmpty ? 'empty-tag-input' : 'tags-container';
  const validateTitleInput = isTitleInputEmpty ? 'empty-title-input' : 'title-input';
  const validateDecInput = isDecEmpty ? 'empty-title-input' : 'title-input';

  return (
    <>

      <Modal isOpen={isOpenNewPost} onClose={onCloseNewPost} size="xl">
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
                  <label>Tags</label>
                  <div className="tags">
                    <div className={validateTagInput}>
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
                        placeholder="Ex: nature, country, food..."
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
    </>
  );
}

export default NewPost;

