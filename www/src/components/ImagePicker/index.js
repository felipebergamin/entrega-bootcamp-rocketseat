import React, { useState, useEffect } from 'react';
import { FaImage, FaUpload } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { Container } from './styles';

function ImagePicker({ onChangeFile, inputRef, previewUrl }) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState();

  useEffect(() => {
    if (inputRef)
      inputRef.current = {
        reset: () => setImagePreviewUrl(null),
      };
  }, [inputRef]);

  useEffect(() => {
    setImagePreviewUrl(previewUrl);
  }, [previewUrl]);

  const handleImageChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const [imageFile] = e.target.files;

    reader.onloadend = () => {
      onChangeFile(imageFile);
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(imageFile);
  };

  return (
    <Container>
      {imagePreviewUrl ? (
        <>
          <img src={imagePreviewUrl} alt="Avatar" />
          <label htmlFor="avatar" style={{ position: 'absolute', right: -45 }}>
            <FaUpload />
            <input
              onChange={handleImageChange}
              className="fileinput"
              name="avatar"
              id="avatar"
              type="file"
            />
          </label>
        </>
      ) : (
        <>
          <FaImage size="2rem" />
          <label htmlFor="avatar">
            Adicionar Foto
            <input
              onChange={handleImageChange}
              className="fileinput"
              name="avatar"
              id="avatar"
              type="file"
            />
          </label>
        </>
      )}
    </Container>
  );
}

ImagePicker.defaultProps = {
  inputRef: null,
  previewUrl: null,
};

ImagePicker.propTypes = {
  previewUrl: PropTypes.string,
  onChangeFile: PropTypes.func.isRequired,
  inputRef: PropTypes.shape({
    current: PropTypes.shape({}),
  }),
};

export default ImagePicker;
