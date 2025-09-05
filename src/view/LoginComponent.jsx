import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link } from "react-router";
import { useState } from "react";

const schema = yup.object({
  email: yup.string().email("Por favor ingresa un formato correcto").required("El email es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria").min(8, "Mínimo 8 caracteres")
});

const LoginComponent = () => {
  const [alert, setAlert] = useState({ type: "", message: "" });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmitForm = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setAlert({ type: "success", message: "¡Has iniciado sesión correctamente!" });
        console.log(user);
      })
      .catch((error) => {
        setAlert({ type: "danger", message: "Error al iniciar sesión: " + error.message });
        console.log(error.code, error.message);
      });
  };

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
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                type="email"
                {...register('email')}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                type="password"
                {...register('password')}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>
            <button type='submit' className="btn btn-primary w-100">Enviar</button>
          </form>
          <div className="mt-3 text-center">
            <span>¿Aún no estás registrado? </span>
            <Link to="/register" className="text-info">Regístrate aquí</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginComponent;