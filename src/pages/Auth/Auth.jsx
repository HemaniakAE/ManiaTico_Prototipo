import React, { useState, useContext } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useTranslate from "../../Context/useTranslate";
import { AuthContext } from "../../Context/AuthContext";

export default function Auth() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("cliente");

  const [googleLoading, setGoogleLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    studio: ""
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function validate() {
    const error = {};

    if (!form.email.includes("@")) error.email = "Correo inválido";
    if (form.password.length < 6) error.password = "Mínimo 6 caracteres";

    if (mode === "register") {
      if (!form.name.trim()) error.name = "Nombre requerido";
      if (form.password !== form.confirm) error.confirm = "No coinciden";
      if (role === "dev" && !form.studio.trim())
        error.studio = "Estudio requerido";
    }

    return error;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) return setErrors(v);

    // Crear objeto de usuario
    const userData = {
      name: form.name || form.email.split("@")[0],
      email: form.email,
      role: mode === "register" ? role : "cliente",
      studio: role === "dev" ? form.studio : null
    };

    // Guardar sesión
    login(userData);
    
    // Navegar al home
    navigate("/");
  }

  // ------------------
  // GOOGLE LOGIN FAKE
  // ------------------
  function handleGoogleLogin() {
    setGoogleLoading(true);

    setTimeout(() => {
      setGoogleLoading(false);
      
      // Simular usuario de Google
      const googleUser = {
        name: "Google",
        email: "usuario@gmail.com",
        role: "cliente",
        studio: null
      };
      
      login(googleUser);
      navigate("/");
    }, 1600);
  }

  return (
    <div className="auth-container">
      {/* Panel izquierdo */}
      <aside className="auth-left">
        <button className="auth-back-btn" onClick={() => navigate("/")}>
          <img src="/Logo_ManiaTico.png" alt="Home" className="auth-back-img" />
        </button>

        <h1 className="left-title">
          El portal del desarrollo de videojuegos en Costa Rica
        </h1>
      </aside>

      {/* Panel derecho */}
      <main className="auth-right">
        <div className="auth-card">
          {/* Cambiar entre login y register */}
          <div className="auth-modes">
            <button
              className={mode === "login" ? "active" : ""}
              onClick={() => setMode("login")}
            >
              {t("login")}
            </button>

            <button
              className={mode === "register" ? "active" : ""}
              onClick={() => setMode("register")}
            >
              {t("register")}
            </button>
          </div>

          <h2 className="form-title">
            {mode === "login" ? t("welcome") : t("register")}
          </h2>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            {/* Nombre - solo registro */}
            {mode === "register" && (
              <>
                <label>
                  {t("fullName")}
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("fullName")}
                  />
                </label>
                {errors.name && <p className="error">{errors.name}</p>}

                {/* Roles */}
                <div className="role-selector">
                  <button
                    type="button"
                    className={role === "cliente" ? "role active" : "role"}
                    onClick={() => setRole("cliente")}
                  >
                    {t("client")}
                  </button>

                  <button
                    type="button"
                    className={role === "dev" ? "role active" : "role"}
                    onClick={() => setRole("dev")}
                  >
                    {t("developer")}
                  </button>
                </div>
              </>
            )}

            {/* Correo */}
            <label>
              {t("email")}
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
              />
            </label>
            {errors.email && <p className="error">{errors.email}</p>}

            {/* Contraseña */}
            <label>
              {t("password")}
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
            </label>
            {errors.password && <p className="error">{errors.password}</p>}

            {/* Confirmar contraseña - solo registro */}
            {mode === "register" && (
              <>
                <label>
                  {t("confirm")}
                  <input
                    name="confirm"
                    type="password"
                    value={form.confirm}
                    onChange={handleChange}
                  />
                </label>
                {errors.confirm && <p className="error">{errors.confirm}</p>}

                {/* Estudio si es dev */}
                {role === "dev" && (
                  <>
                    <label>
                      {t("studio")}
                      <input
                        name="studio"
                        value={form.studio}
                        onChange={handleChange}
                      />
                    </label>
                    {errors.studio && (
                      <p className="error">{errors.studio}</p>
                    )}
                  </>
                )}
              </>
            )}

            {/* BOTÓN PRINCIPAL */}
            <button className="submit-btn">
              {mode === "login" ? t("enter") : t("create")}
            </button>

            {/* GOOGLE BUTTON (solo LOGIN) */}
            {mode === "login" && (
              <button
                type="button"
                className="google-btn"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
              >
                <FcGoogle size={22} style={{ marginRight: "8px" }} />
                {googleLoading ? "Conectando..." : t("googleLogin")}
              </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}