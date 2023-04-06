import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="changeAvatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      children={
        <>
          <input className="popup__input" ref={avatarRef}  id="avatarsrc-input" type="url" name="link" placeholder="Ссылка на фотографию"
            required />
          <span className="popup__error avatarsrc-input-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
