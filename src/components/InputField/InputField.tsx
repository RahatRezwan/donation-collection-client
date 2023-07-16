/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
   label?: string;
   name?: string;
   type?: string;
   placeholder?: string;
   required?: boolean;
   register?: UseFormRegister<FieldValues>;
   setValue?: any;
   errorField?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
   disabled?: boolean;
   defaultValue?: string | number;
   labelFieldColumn?: boolean | undefined;
}

const InputField = ({
   label,
   name,
   type,
   placeholder,
   required,
   register,
   setValue,
   errorField,
   disabled,
   defaultValue,
}: InputFieldProps) => {
   /* set default value in the field register */
   React.useEffect(() => {
      if (defaultValue) {
         setValue && setValue(name ? name : 'noName', defaultValue);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [defaultValue]);

   return (
      <div className={`w-full flex gap-1 flex-col`}>
         {label && (
            <div className='flex gap-1 items-center'>
               <label className={`${errorField ? 'label_text2' : 'label_text'}`}>
                  {label} {required && <span className='text-red-500'>*</span>}
               </label>
            </div>
         )}
         {register && (
            <input
               type={type ? type : 'text'}
               placeholder={placeholder}
               disabled={disabled}
               defaultValue={defaultValue ? defaultValue : ''}
               className={`
                  ${errorField ? 'input_text2' : 'input_text'}
               `}
               {...register(name ? name : 'noName', {
                  required: required ? true : false,
               })}
            />
         )}
         {errorField && <span className='text-red-500 text-xs'>{label} is required</span>}
      </div>
   );
};

export default InputField;
