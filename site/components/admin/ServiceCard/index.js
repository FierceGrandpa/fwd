import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const defaultImageSrc = '/img/image_placeholder.png';

const initialFieldValues = {
  id: 0,
  title: '',
  offers: [],
  alt: '',
  width: '',
  height: '',
  imageName: '',
  imageSrc: defaultImageSrc,
  imageFile: null,
};

export default function ServiceCard({ addOrEdit, recordForEdit }) {
  const editorRef = useRef(null);
  const [initialValue, setInitialValue] = useState(undefined);
  const [offer, setOffer] = useState({ id: 0, name: '', price: '' });
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (recordForEdit != null) {
      setValues(recordForEdit);
      setInitialValue(recordForEdit.description);
    }
  }, [recordForEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleOfferChange = (e) => {
    const { name, value } = e.target;
    setOffer({
      ...offer,
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
    temp.title = values.title !== '';
    temp.alt = values.alt !== '';
    temp.offers = values.offers !== [];
    temp.width = values.width > 0;
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
    if (validate()) {
      const formData = new FormData();
      formData.append('id', values.id);
      formData.append('title', values.title);
      if (editorRef.current) {
        formData.append('description', editorRef.current.getContent());
      }
      formData.append('offers', JSON.stringify(values.offers));
      formData.append('alt', values.alt);
      formData.append('height', values.height);
      formData.append('width', values.width);
      formData.append('imageName', values.imageName);
      formData.append('imageFile', values.imageFile);
      addOrEdit(formData, resetForm);
    }
  };

  const handleOfferSubmit = () => {
    if (offer && offer.name && offer.name !== '' && offer.price && offer.price !== '' && offer.price > 0) {
      offer.id = values.offers.length;
      values.offers.push(offer);
      setOffer({ id: 0, name: '', price: '' });
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
              placeholder="title"
              name="title"
              value={values.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <Editor
              onInit={(evt, editor) => {
                editorRef.current = editor;
              }}
              initialValue={initialValue}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar: 'undo redo | formatselect | '
                  + 'bold italic backcolor | alignleft aligncenter '
                  + 'alignright alignjustify | bullist numlist outdent indent | '
                  + 'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
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
            <div className="separator" />
            <h6 className="form-group__subtitle">Offers</h6>
            <ul className="form-list">
              {values.offers.map((e) => (
                <li key={e.id}>
                  <div>
                    <span>
                      {e.name}
                    </span>
                    <span>
                      Цена:
                      {' '}
                      {e.price}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn close"
                    onClick={() => {
                      setValues({
                        ...values,
                        offers: values.offers.filter((u) => u.id != e.id),
                      });
                    }}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            <div className="fwd-form">
              <div className="form-group" style={{ marginBottom: '0.25rem' }}>
                <input
                  className="form-control"
                  placeholder="name"
                  name="name"
                  value={offer.name}
                  onChange={handleOfferChange}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '0.25rem' }}>
                <input
                  className="form-control"
                  placeholder="100"
                  name="price"
                  value={offer.price}
                  onChange={handleOfferChange}
                />
              </div>
              <div className="form-group">
                <button type="button" className="btn" onClick={handleOfferSubmit}>Добавить</button>
              </div>
            </div>
            <div className="separator" />
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
          display: flex;
          flex-direction: column;
          width: 100%;
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
        
        .separator {
          width: 100%;
          height: 1px;
          background-color: #ced4da;
        }
        
        .form-group__subtitle {
          color: #212529;
          padding-top: 10px;
          padding-bottom: 5px;
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-list {
            color: #495057;
                list-style: none;
    padding: 0;
    
          li {
               display: flex;
    align-items: center;
    justify-content: space-between;
            width: 100%;
            padding: .375rem .75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #333;
            border-radius: .25rem;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            margin-bottom: 5px;
            div {
              display: flex;
              flex-direction: column;
            }
          }
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
        
        .btn.close {
          border: 0;
          padding: 0;
            &:hover {
              background-color: transparent;
            }
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
