import React, { useState } from "react";
import "./Auth.css";


export default function Auth() {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("cliente");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    studio: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function validate() {
    const err = {};

    if (!form.email.includes("@")) err.email = "Correo inválido";
    if (form.password.length < 6) err.password = "Mínimo 6 caracteres";

    if (mode === "register") {
      if (!form.name.trim()) err.name = "Nombre requerido";
      if (form.password !== form.confirm) err.confirm = "No coinciden";
      if (role === "dev" && !form.studio.trim()) err.studio = "Estudio requerido";
    }

    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) return setErrors(v);

    console.log("PAYLOAD →", {
      mode,
      role,
      ...form,
    });

  }

  return (
    <div className="auth-container">

      <aside className="auth-left">
        <aside className="auth-left">
        {/* AQUI TIENE QUE IR EL PUTO BOTON PARA REGRESAR DE INICIO DE SESION DE MIERDA */}

        </aside>

        <h1 className="left-title">La tienda costarricens de videojuegos.  
          Accede como cliente o publica tus juegos como desarrollador.</h1>
        </aside>

      <main className="auth-right">
        <div className="auth-card">
          <div className="auth-modes">
            <button
              className={mode === "login" ? "active" : ""}
              onClick={() => setMode("login")}
            >
              Iniciar Sesión
            </button>

            <button
              className={mode === "register" ? "active" : ""}
              onClick={() => setMode("register")}
            >
              Registrarse
            </button>
          </div>

          <h2 className="form-title">
            {mode === "login" ? "Bienvenido" : "Crear Cuenta"}
          </h2>

          <form onSubmit={handleSubmit}>
            {mode === "register" && (
              <>
                <label>
                  Nombre Completo
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                  />
                </label>
                {errors.name && <p className="error">{errors.name}</p>}

                {/* se elije el rol de la cuenta */}
                <div className="role-selector">
                  <button
                    type="button"
                    className={role === "cliente" ? "role active" : "role"}
                    onClick={() => setRole("cliente")}
                  >
                    Cliente
                  </button>

                  <button
                    type="button"
                    className={role === "dev" ? "role active" : "role"}
                    onClick={() => setRole("dev")}
                  >
                    Desarrollador
                  </button>
                </div>
              </>
            )}

            <label>
              Correo
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                type="email"
              />
            </label>
            {errors.email && <p className="error">{errors.email}</p>}

            <label>
              Contraseña
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
              />
            </label>
            {errors.password && <p className="error">{errors.password}</p>}

            {mode === "register" && (
              <>
                <label>
                  Confirmar contraseña
                  <input
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    type="password"
                  />
                </label>
                {errors.confirm && <p className="error">{errors.confirm}</p>}

                {role === "dev" && (
                  <>
                    <label>
                      Nombre del Estudio
                      <input
                        name="studio"
                        value={form.studio}
                        onChange={handleChange}
                        placeholder="Ejemplo: TicoGames"
                      />
                    </label>
                    {errors.studio && <p className="error">{errors.studio}</p>}
                  </>
                )}
              </>
            )}

            <button className="submit-btn">
              {mode === "login" ? "Entrar" : "Crear Cuenta"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
