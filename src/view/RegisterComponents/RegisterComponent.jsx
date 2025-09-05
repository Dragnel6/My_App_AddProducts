import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import {createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config";
import { useState } from "react";

const schema = yup.object({
  email: yup.string().email("Please enter a correct format").required(),
  password: yup.string().required().min(8, "please enter a min 8 char")
  .matches(/[A-Z]/, 'Must contain one uppercase letter')
  .matches(/[a-z]/, 'Must contain one lowercase letter')
  .matches(/[0-9]/, 'Must contain one number'),
  confirm_password: yup.string().oneOf([yup.ref("password"), null], 'Passwords must match')
})

export const RegisterComponent = () => {
 const {register, handleSubmit, formState: { errors }} = useForm({
   resolver: yupResolver(schema)
 })
 const [alert, setAlert] = useState({ type: "", message: "" });

 //validar los datos que se escribien en el form


 const onSubmitForm = (data)  =>{
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user)
      // ...
      setAlert({ type: "success", message: "¡Usuario registrado correctamente!" });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      // ..
      setAlert({ type: "danger", message: "Error al registrar: " + error.message });
    });
 }

  return (
    <section>
      <div className="card bg-dark text-light" style={{ maxWidth: '400px', margin: '0 auto', marginTop: '60px' }}>
        <div className="card-body">
          {alert.message && (
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
              {alert.message}
              <button type="button" className="btn-close" onClick={() => setAlert({ type: "", message: "" })}></button>
            </div>
          )}
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div>
                <label className="form-label" >Email:</label>
                <input className="form-control" name="input_email" type="email" {...register('email')} />
                <p>{errors.email && errors.email.message}</p>
              </div>
              <div>
                <label className="form-label" >Password:</label>
                <input className="form-control" name="input_password" type="password" {...register('password')} />
                <p>{errors.password && errors.password.message}</p>
              </div>
              <div>
                <label className="form-label" >Confirm Password:</label>
                <input className="form-control"  type="text" {...register('confirm_password')} />
                <p>{errors.confirm_password && errors.confirm_password.message}</p>
              </div>
              <button type='submit' className="btn btn-primary">Send</button>
            </form>
          </div>
      </div>
    </section>
  )
}
 
export default RegisterComponent;