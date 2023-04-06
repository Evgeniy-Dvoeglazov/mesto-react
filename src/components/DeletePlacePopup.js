function DeletePlacePopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.card);
  }

  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} id="popup_delete">
      <div className="popup__container">
        <h2 className="popup__title-delete">Вы уверены?</h2>
        <form className="popup__form" id="popup__form_delete" onSubmit={handleSubmit} name="deleteForm">
          <button className="popup__button" type="submit" id="popupDelete__button" disabled={props.isLoading}>{props.isLoading ? 'Сохранение...' : 'Да'}</button>
        </form>
        <button className="popup__close-btn" onClick={props.onClose} id="popup__close-btn_delete" type="button"
          aria-label="Кнопка закрытия формы"></button>
      </div>
    </div>
  );
}

export default DeletePlacePopup;
