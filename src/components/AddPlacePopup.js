import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup(props) {

  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
    nameRef.current.value = '';
    linkRef.current.value = '';
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      buttonText="Создать"
      children={
        <>
          <input className="popup__input" ref={nameRef} id="placename-input" type="text" name="name" placeholder="Название" required
            minLength="2" maxLength="30" />
          <span className="popup__error placename-input-error"></span>
          <input className="popup__input" ref={linkRef} id="placesrc-input" type="url" name="link" placeholder="Ссылка на картинку"
            required />
          <span className="popup__error placesrc-input-error"></span>
        </>
      }
    />
  );
}

export default AddPlacePopup;
