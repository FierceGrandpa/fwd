import React, { useState, useEffect } from 'react';

const defaultImageSrc = '/img/image_placeholder.png';

const initialFieldValues = {
  id: 0,
  alt: '',
  width: '',
  height: '',
  imageName: '',
  imageSrc: defaultImageSrc,
  imageFile: null,
};

export default function MarkCard({ addOrEdit, recordForEdit }) {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (recordForEdit != null) { setValues(recordForEdit); }
  }, [recordForEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    const temp = {};
    // eslint-disable-next-line eqeqeq
    temp.alt = values.alt !== '';
    temp.window = values.window > 0;
    temp.height = values.height > 0;
    temp.imageSrc = values.imageSrc !== defaultImageSrc;
    setErrors(temp);
    return Object.values(temp).every((x) => x);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById('image-uploader').value = null;
    setErrors({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      const formData = new FormData();
      formData.append('id', values.id);
      formData.append('alt', values.alt);
      formData.append('height', values.height);
      formData.append('width', values.width);
      formData.append('imageName', values.imageName);
      formData.append('imageFile', values.imageFile);
      addOrEdit(formData, resetForm);
    }
  };

  const applyErrorClass = (field) => ((field in errors && !errors[field]) ? ' invalid-field' : '');

  return (
    <>
      <form autoComplete="off" className="fwd-form" noValidate onSubmit={handleFormSubmit}>
        <img src={values.imageSrc} className="fwd-form__img" />
        <div className="fwd-form__body">
          <div className="form-group">
            <input
              type="file"
              accept="image/*"
              className={`form-control-file${applyErrorClass('imageSrc')}`}
              onChange={showPreview}
              id="image-uploader"
            />
          </div>
          <div className="form-group">
            <input
              className={`form-control${applyErrorClass('alt')}`}
              placeholder="alt"
              name="alt"
              value={values.alt}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="height"
              name="height"
              value={values.height}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="width"
              name="width"
              value={values.width}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">Сохранить</button>
          </div>
        </div>
      </form>
      <style jsx>
        {`
        .fwd-form {
          position: relative;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-direction: column;
          flex-direction: column;
          min-width: 0;
          word-wrap: break-word;
          background-color: #fff;
          background-clip: border-box;
          border: 1px solid rgba(0,0,0,.125);
          border-radius: .25rem;
        
          &__img {
              border-top-left-radius: calc(.25rem - 1px);
              border-top-right-radius: calc(.25rem - 1px);
              flex-shrink: 0;
              width: 100%;
          }
          
          &__body {
              flex: 1 1 auto;
              min-height: 1px;
              padding: 1.25rem;
          }
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-control-file, .form-control-range {
            display: block;
            width: 100%;
        }
        
        .form-control {
            display: block;
            width: 100%;
            height: calc(1.5em + .75rem + 2px);
            padding: .375rem .75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: .25rem;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }
        
        .btn {
            color: #212529;
            background-color: #f8f9fa;
            border: 1px solid #ced4da;
            
            &:hover {
              background-color: #e5e4e4;
            }
            
            display: inline-block;
            font-weight: 400;
            text-align: center;
            vertical-align: middle;
            user-select: none;
            padding: .375rem .75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: .25rem;
            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }
      `}
      </style>
    </>
  );
}
