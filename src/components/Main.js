import { api } from '../utils/Api.js';
import React from 'react';
import Card from './Card.js';

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
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

  return (
    <main className="main">

      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar">
            <button className="profile__avatar-btn" onClick={props.onEditAvatar} type="button" aria-label="Кнопка изменения аватара"></button>
            <div className="profile__avatar-image" style={{ backgroundImage: `url(${userAvatar})` }}>
            </div>
          </div>
          <div className="profile__description">
            <div className="profile__title">
              <h1 className="profile__title-text">{userName}</h1>
              <button className="profile__edit-btn" onClick={props.onEditProfile} type="button"
                aria-label="Кнопка открытия формы редактирования профиля"></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-btn" onClick={props.onAddPlace} type="button" aria-label="Кнопка создания новой карточки места"></button>
      </section>

      <section className="elements" aria-label="Подборка карточек с фотографиями и названиями красивых мест">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} />
          ))}
        </ul>
      </section>
      <section className="elements" aria-label="Подборка карточек с фотографиями и названиями красивых мест">
      </section>
    </main>
  );
}

export default Main;
