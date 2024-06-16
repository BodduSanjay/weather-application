import './index.css'

const ButtonItem = ({btn, handleButtonClick, isActive}) => {
  
  const {id, text} = btn;

  const btnClicked = ()=> {
    handleButtonClick(id, text)
  }

  const btnStyle =  isActive ? 'active-btn' : 'normal-btn';

  return (
    <button className={btnStyle} onClick={btnClicked}>{text}</button>
  )
}

export default ButtonItem