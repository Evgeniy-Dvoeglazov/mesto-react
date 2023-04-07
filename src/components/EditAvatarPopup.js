import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from 'react-hook-form';

function EditAvatarPopup(props) {

  const linkRef = React.useRef();

  const { register, formState: { errors, isValid }, reset } = useForm({ mode: 'onChange', criteriaMode: 'all' });

  const { ref } = register('link');

  const errorClassname = (name) => `popup__error ${errors[name] ? 'popup__error_visible' : ''}`;

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: linkRef.current.value
    });
    reset();
  }

  const onClosePopup = () => {
    props.onClose();
    reset();
  }

  return (
    <PopupWithForm
      name="changeAvatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={onClosePopup}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      isValid={isValid}
      children={
        <>
          <input className="popup__input" id="avatarsrc-input" type="url" placeholder="Ссылка на фотографию"
            {...register('link', {
              required: 'Заполните это поле.',
              pattern: {
                value: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                message: 'Введите ссылку'
              }
            })} ref={(evt) => {
              ref(evt)
              linkRef.current = evt
            }}
          />
          {errors.link && <span className={errorClassname('link')}>{errors.link.message}</span>}
        </>
      }
    />
  );
}

export default EditAvatarPopup;
