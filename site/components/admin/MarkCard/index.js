import React from 'react';
import { useForm } from '../../../helpers/form';

const defaultImageSrc = '/img/image_placeholder.png';

export default function MarkCard({ addOrEdit, recordForEdit }) {
  const {
    reset, values, onChange,
  } = useForm({
    init: {
      alt: '',
      width: '',
      height: '',
      imageSrc: defaultImageSrc,
    },
    recordForEdit,
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    addOrEdit({
      id: values.id || '',
      alt: values.alt,
      width: values.width,
      height: values.height,
      imageSrc: values.imageSrc,
    }, reset);
  };

  return (
    <>
      <form autoComplete="off" className="fwd-form" onSubmit={onFormSubmit}>
        <img src={values.imageSrc} className="fwd-form__img" />
        <div className="fwd-form__body">
          <div className="form-group">
            <input
              name="imageSrc"
              placeholder="image link"
              className="form-control"
              value={values.imageSrc}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="alt"
              name="alt"
              value={values.alt}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="height"
              name="height"
              value={values.height}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="width"
              name="width"
              value={values.width}
              onChange={onChange}
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
