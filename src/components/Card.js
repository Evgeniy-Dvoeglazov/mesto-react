function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="element" >
      <div className="element__image" style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick}>
      </div>
      <div className="element__description">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__like">
          <button className="element__btn-like" type="button" aria-label="Кнопка поставить лайк"></button>
          <p className="element__like-quantity">{props.card.likes.length}</p>
        </div>
      </div>
      <button className="element__delete-btn" type="button" aria-label="Кнопка удаления карточки места"></button>
    </li>
  );
}

export default Card;
