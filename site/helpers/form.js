import { useEffect, useState } from 'react';

export const defaultImageSrc = '/img/image_placeholder.png';

export const useForm = ({ init, recordForEdit }) => {
  const [values, setValues] = useState(init);

  useEffect(() => {
    if (recordForEdit) {
      setValues(recordForEdit);
    }
  }, [recordForEdit]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const reset = () => {
    setValues(init);
  };

  return {
    reset,
    values,
    onChange,
  };
};
