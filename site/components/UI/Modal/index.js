import { useState } from 'react';

import { send } from 'emailjs-com';

import { Container, Button, Row } from 'components/UI';

import styles from './styles.scss';

const Modal = ({ modal, setModal }) => {
  const [open, setOpen] = useState(true);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [optional, setOptional] = useState('');

  const [answerOpen, setAnswerOpen] = useState(false);

  const formSubmit = (e) => {
    e.preventDefault();

    send(
      'service_r8grzfh',
      'template_4x4xxmr',
      {
        from_name: 'fwd',
        to_name: 'gfnrf3@yandex.ru',
        message: `
          Имя: ${name}\n
          Номер телефона: ${phone}
          ${`\n${optional}` || ''}
        `,
        reply_to: '',
      },
      'user_4s4j8tTr9vQhRxXOswUqL',
    ).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    })
      .catch((err) => {
        console.log('FAILED...', err);
      });

    setOpen(false);
    setAnswerOpen(true);

    setName('');
    setPhone('');
    setOptional('');
  };

  function close() {
    setOpen(false);
    setModal(false);
  }

  function closeAnswer() {
    setAnswerOpen(false);
    setModal(false);
  }

  function changePhone(value) {
    if (!value.startsWith('+7')) {
      setPhone('+7');
    } else {
      setPhone(value);
    }
  }

  return (
    <>

      <div className={`modal${open ? ' open' : ''}`}>
        <Container>
          <Row>
            <div className="dialog-window">
              <div className="dialog-window__header" style={{ backgroundImage: 'url(img/dialog-window/bg.jpg)', backgroundPosition: 'top'  }}>
                <h2 className="dialog-window__title">
                  Запись / Консультация
                </h2>
                <button type="button" onClick={close} className="close-btn">
                  Х
                </button>
              </div>
              <div className="dialog-window__content-wrapper">
                <form className="dialog-window__content" onSubmit={formSubmit}>
                  <div className="input-item">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Имя"
                      required
                    />
                  </div>

                  <div className="input-item">
                    <input
                      required
                      id="phone"
                      name="phone"
                      type="tel"
                      maxLength="50"
                      value={phone}
                      onChange={(e) => changePhone(e.target.value)}
                      pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  <div className="optional-info">
                  <textarea
                    className="optional-info__textarea"
                    id="optional"
                    cols="60"
                    name="optional"
                    value={optional}
                    onChange={(e) => setOptional(e.target.value)}
                    placeholder="Дополнительная информация (необязательно)"
                  />
                  </div>
                  <Button type="submit" caption="Перезвонить мне" />
                </form>
              </div>
            </div>
          </Row>
        </Container>
      </div>

      <div className={`modal${answerOpen ? ' open' : ''}`} style={{ backgroundColor: '#010101' }}>
        <Container>
          <Row>
            <div className="answer-window">
              <div className="answer-window__header">
                <img
                  className="bg"
                  src="/img/dialog-window/bg.jpg"
                  alt="сексуальная девушка, которая тебе подмигивает"
                />
                <h2 className="answer-window__title">
                  Спасибо за обращение!
                </h2>
                <Button caption="Закрыть" onClick={closeAnswer} />
              </div>
            </div>
          </Row>
        </Container>
      </div>

      <style jsx>{styles}</style>
    </>
  );
};
export default Modal;
