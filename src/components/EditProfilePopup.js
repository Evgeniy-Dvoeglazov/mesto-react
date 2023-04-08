import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormValidation } from '../utils/useFormValidation';

function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, setValue, reset, formRef } = useFormValidation();

  const errorClassname = (name) => `popup__error ${errors[name] ? 'popup__error_visible' : ''}`;

  const onClosePopup = () => {
    props.onClose();
    reset({ 'userName': currentUser.name, 'userDescription': currentUser.about })
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: values.userName,
      about: values.userDescription
    });
  }

  useEffect(() => {
    setValue('userName', currentUser.name)
    setValue('userDescription', currentUser.about)
  }, [currentUser]);

  return (
    <PopupWithForm
      ref={formRef}
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={onClosePopup}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      isValid={isValid}
      children={
        <>
          <input className="popup__input" value={values.userName ?? ''} onChange={handleChange} id="name-input" type="text" name="userName" placeholder="Имя" required minLength="2"
            maxLength="40" />
          <span className={errorClassname('userName')}>{errors.userName}</span>
          <input className="popup__input" value={values.userDescription ?? ''} onChange={handleChange} id="info-input" type="text" name="userDescription" placeholder="О себе" required
            minLength="2" maxLength="200" />
          <span className={errorClassname('userDescription')}>{errors.userDescription}</span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
