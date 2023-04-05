import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          setCards={setCards}
          cards={cards}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name="add"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText="Создать"
          children={
            <>
              <input className="popup__input" id="placename-input" type="text" name="name" placeholder="Название" required
                minLength="2" maxLength="30" />
              <span className="popup__error placename-input-error"></span>
              <input className="popup__input" id="placesrc-input" type="url" name="link" placeholder="Ссылка на картинку"
                required />
              <span className="popup__error placesrc-input-error"></span>
            </>
          }
        />
        <PopupWithForm
          name="changeAvatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
          children={
            <>
              <input className="popup__input" id="avatarsrc-input" type="url" name="link" placeholder="Ссылка на фотографию"
                required />
              <span className="popup__error avatarsrc-input-error"></span>
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
    </CurrentUserContext.Provider>
  );
}

export default App;
