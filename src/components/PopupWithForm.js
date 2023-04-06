import { validationConfig } from '../utils/utils.js';
import FormValidator from '../utils/FormValidator';

function PopupWithForm(props) {

  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} id={`popup_${props.name}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" id={`popup__form_${props.name}`} onSubmit={props.onSubmit} name={`${props.name}Form`} noValidate>
          {props.children}
          <button className="popup__button" disabled={props.isLoading} type="submit" id={`popup${props.name}__button`}>{props.isLoading ? 'Сохранение...' : props.buttonText}</button>
        </form>
        <button className="popup__close-btn" onClick={props.onClose} id={`popup__close-btn_${props.name}`} type="button"
          aria-label="Кнопка закрытия формы"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
