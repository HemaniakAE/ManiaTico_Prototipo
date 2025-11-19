import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useTranslate from "../Context/useTranslate";


export default function Auth() {
  const navigate = useNavigate();
  const { t } = useTranslate();

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

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/"); // Simula login para entrega
  }

  function handleGoogleLogin() {
    setGoogleLoading(true);

    setTimeout(() => {
      setGoogleLoading(false);
      navigate("/");
    }, 2000);
  }

  return (
    <div className="auth-container">

      {/* BOTÓN PARA VOLVER A HOME */}
      <aside className="auth-left">
        <button className="auth-back-btn" onClick={() => navigate("/")}>
          <img src="/Logo_ManiaTico.png" className="auth-back-img" />
        </button>

        <h1 className="left-title">{t("welcome_title")}</h1>
        <p className="left-sub">{t("welcome_sub")}</p>
      </aside>

      {/* PANEL DERECHA / FORM */}
      <main className="auth-right">
        <div className="auth-card">

          {/* SWITCH LOGIN / REGISTER */}
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
            {mode === "login" ? t("login") : t("create_account")}
          </h2>

          <form onSubmit={handleSubmit}>

            {/* CAMPOS SOLO EN REGISTRO */}
            {mode === "register" && (
              <>
                <label>
                  {t("full_name")}
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("placeholder_name")}
                  />
                </label>

                {/* ROL (cliente/dev) */}
                <div className="role-selector">
                  <button
                    type="button"
                    className={role === "cliente" ? "role active" : "role"}
                    onClick={() => setRole("cliente")}
                  >
                    {t("role_client")}
                  </button>

                  <button
                    type="button"
                    className={role === "dev" ? "role active" : "role"}
                    onClick={() => setRole("dev")}
                  >
                    {t("role_dev")}
                  </button>
                </div>
              </>
            )}

            {/* CAMPOS COMUNES */}
            <label>
              {t("email")}
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t("placeholder_email")}
                type="email"
              />
            </label>

            <label>
              {t("password")}
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
              />
            </label>

            {mode === "register" && (
              <>
                <label>
                  {t("confirm_password")}
                  <input
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    type="password"
                  />
                </label>

                {role === "dev" && (
                  <label>
                    {t("studio")}
                    <input
                      name="studio"
                      value={form.studio}
                      onChange={handleChange}
                      placeholder={t("placeholder_studio")}
                    />
                  </label>
                )}
              </>
            )}

            {/* BOTÓN PRINCIPAL */}
            <button className="submit-btn">
              {mode === "login" ? t("enter") : t("create_account")}
            </button>

            {/* GOOGLE LOGIN SOLO EN LOGIN */}
            {mode === "login" && (
              <button
                type="button"
                className="google-btn"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  t("google_loading")
                ) : (
                  <>
                    <FcGoogle className="google-icon" />
                    <span>{t("google_login")}</span>
                  </>
                )}
              </button>
            )}

          </form>
        </div>
      </main>
    </div>
  );
}
