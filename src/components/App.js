import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  React.useEffect(() => {
    function ClosePopupOnEsc(evt) {
      if ((evt.key === 'Escape') && (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen)) {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', ClosePopupOnEsc);

    return () => {
      document.removeEventListener('keydown', ClosePopupOnEsc);
    };
  });

  React.useEffect(() => {
    function ClosePopupOnOverlay(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }

    document.addEventListener('mousedown', ClosePopupOnOverlay);

    return () => {
      document.removeEventListener('mousedown', ClosePopupOnOverlay);
    };
  });

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input className="popup__input" id="name-input" type="text" name="name" placeholder="Имя" required minLength="2"
              maxLength="40" />
            <span className="popup__error name-input-error"></span>
            <input className="popup__input" id="info-input" type="text" name="info" placeholder="О себе" required
              minLength="2" maxLength="200" />
            <span className="popup__error info-input-error"></span>
            <button className="popup__button" type="submit" id="popupEdit__button">Сохранить</button>
          </>
        }
      />
      <PopupWithForm
        name="add"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input className="popup__input" id="placename-input" type="text" name="name" placeholder="Название" required
              minLength="2" maxLength="30" />
            <span className="popup__error placename-input-error"></span>
            <input className="popup__input" id="placesrc-input" type="url" name="link" placeholder="Ссылка на картинку"
              required />
            <span className="popup__error placesrc-input-error"></span>
            <button className="popup__button" type="submit" id="popupAdd__button">Создать</button>
          </>
        }
      />
      <PopupWithForm
        name="changeAvatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input className="popup__input" id="avatarsrc-input" type="url" name="link" placeholder="Ссылка на фотографию"
              required />
            <span className="popup__error avatarsrc-input-error"></span>
            <button className="popup__button" type="submit" id="popupChangeAvatar__button">Сохранить</button>
          </>
        }
      />
      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <div className="popup" id="popup_delete">
        <div className="popup__container">
          <h2 className="popup__title-delete">Вы уверены?</h2>
          <form className="popup__form" id="popup__form_delete" name="deleteForm">
            <button className="popup__button" type="submit" id="popupDelete__button">Да</button>
          </form>
          <button className="popup__close-btn" id="popup__close-btn_delete" type="button"
            aria-label="Кнопка закрытия формы"></button>
        </div>
      </div>
    </div>
  );
}

export default App;
