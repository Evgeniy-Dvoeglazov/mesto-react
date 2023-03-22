function ImagePopup(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} id="popup_photo">
      <div className="popup__photo-container">
        <figure className="popup__figure">
          <img src={props.card.link} className="popup__large-photo" alt={props.card.name} />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
        <button className="popup__close-btn" onClick={props.onClose} id="popup__close-btn_largePhoto" type="button"
          aria-label="Кнопка закрытия формы"></button>
      </div>
    </div>
  );
}

export default ImagePopup;
