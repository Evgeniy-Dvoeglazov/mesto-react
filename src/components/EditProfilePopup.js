import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      children={
        <>
          <input className="popup__input" value={name ?? ''} onChange={handleChangeName} id="name-input" type="text" name="name" placeholder="Имя" required minLength="2"
            maxLength="40" />
          <span className="popup__error name-input-error"></span>
          <input className="popup__input" value={description ?? ''} onChange={handleChangeDescription} id="info-input" type="text" name="info" placeholder="О себе" required
            minLength="2" maxLength="200" />
          <span className="popup__error info-input-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
