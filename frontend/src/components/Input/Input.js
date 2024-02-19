import React from 'react'
import InputContainer from '../InputContainer/InputContainer';
import classes from './input.module.css';
function Input(
    {label, type, defaultValue, onChange, onBlur, name, error},ref
) {
    const getErrorMessage = () =>{
        // no error
        if(!error) return;
        //specific error
        if(error.message) return error.message;
        //default
        switch(error.type){
            case 'required':
                return 'This Field Is Requried';
            case 'minLength':
                return 'Field Is Too Short';
            default:
                return '*';
        }
    }
  return (
    <InputContainer label={label}>
    <input
      defaultValue={defaultValue}
      className={classes.input}
      type={type}
      placeholder={label}
      ref={ref}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
    />
    {error && <div className={classes.error}>{getErrorMessage()}</div>}
  </InputContainer>
  )
}

export default React.forwardRef(Input);