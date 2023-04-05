import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      children={
        <>
          <input className="popup__input" id="name-input" type="text" name="name" placeholder="Имя" required minLength="2"
            maxLength="40" />
          <span className="popup__error name-input-error"></span>
          <input className="popup__input" id="info-input" type="text" name="info" placeholder="О себе" required
            minLength="2" maxLength="200" />
          <span className="popup__error info-input-error"></span>
        </>
      }
    />
  )
}

export default EditProfilePopup;
