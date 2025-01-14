
import { Button } from '../ui/button';
// import { useRouter } from 'next/navigation';



type btnSize = "default" | "lg" | "sm";
// const roitai:string = 'tam'
type ButtonProps = {
  handleClick?: () => void;
  className?: string;
  size?: btnSize;
  text?: string;
};

// type LinkButtonProps = {
//     className?: string;
//     size?: btnSize;
//     text?: string;
//     href?: string;
//   };

// type SubmitButtonProps = {
//     className?: string;
//     size?: btnSize;
//     text?: string;
//   };


export const DeleteButton = ({handleClick,  className, size, text }: ButtonProps) => {

  

    return (
      <div>   <Button  onClick={handleClick} className={`${className} capitalize`}  size={size}>{text}</Button></div>
    )
  }


 export const EditButton = ({handleClick ,className, size, text }: ButtonProps) => {
    return (
      <div> <Button  onClick={handleClick} className={`${className} capitalize`}  size={size} >{text}</Button>
               </div>
    )
  }

  export const AddButton = ({ handleClick ,className, size, text }: ButtonProps) => {
    return (
      <div> <Button onClick={handleClick}  className={`${className} capitalize`} size={size} >{text}</Button>
               </div>
    )
  }