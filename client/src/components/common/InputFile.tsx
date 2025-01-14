import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import React,{useState} from 'react'

type InputFilePorps = {
    name: string;
    label: string;
    handleChange?: (file : File) => void;
};


const InputFile = (porps:InputFilePorps ) => {
    const {name , label , handleChange} =porps;
    const [selectedImage, setSelectedImage] = useState();
    const imageChange = (e:any) => {
      console.log(e.target.files)
      if (e.target.files && e.target.files.length > 0) {
        //setSelectedImage(e.target.files[0]);
        if (handleChange) {
          handleChange(e.target.files[0]);
        }
      }
    };
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
     {
      selectedImage &&(
          <img src={URL.createObjectURL(selectedImage)}
          className="mt-4 object-cover"
              alt="Thumb"></img>
      )
     } 
    <Label htmlFor={name}>{label}</Label>
    <Input id={name}         
         name={name}
         type="file"
         //required
         onChange={imageChange}
         accept="image/*"/>
  </div>
  )
}

export default InputFile



