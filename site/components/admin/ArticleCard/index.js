import React, { useState, useEffect, useRef } from 'react';
import { useForm, defaultImageSrc } from 'helpers/form';
import { Editor } from '@tinymce/tinymce-react';

export default function ArticleCard({ addOrEdit, recordForEdit }) {
  const promoRef = useRef(null);
  const contentRef = useRef(null);
  const [editorValues, setEditorValues] = useState({ promo: null, content: null });
  const {
    reset, values, onChange,
  } = useForm({
    init: {
      title: '',
      promo: '',
      content: '',
      imageSrc: defaultImageSrc,
    },
    recordForEdit,
  });
  useEffect(() => {
    setEditorValues({ promo: values.promo, content: values.content });
  }, [values.promo, values.content]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    addOrEdit({
      id: values.id || '',
      title: values.title,
      promo: promoRef.current.getContent(),
      content: contentRef.current.getContent(),
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
              name="title"
              placeholder="title"
              className="form-control"
              value={values.title}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <h2>Promo:</h2>
            <Editor
              onInit={(evt, editor) => {
                promoRef.current = editor;
              }}
              initialValue={editorValues.promo}
              init={{
                height: 300,
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
            <h2>Content:</h2>
            <Editor
              onInit={(evt, editor) => {
                contentRef.current = editor;
              }}
              initialValue={editorValues.content}
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
            <button type="submit" className="btn">Сохранить</button>
          </div>
        </div>
      </form>
      <style jsx>
        {`
        
        h2 {
        color: black;
        }
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
