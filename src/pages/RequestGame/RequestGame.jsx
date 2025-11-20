import React, { useEffect, useRef, useState } from "react";
import "./requestGame.css";
import Header from "../../Components/Header";
import SettingsPanel from "../../Components/SettingsPanel";
import { CiCircleCheck } from "react-icons/ci";
import useTranslate from "../../Context/useTranslate";
export default function RequestGame() {
  const [form, setForm] = useState({
    name: "",
    categories: [],
    description: "",
    price: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const { t } = useTranslate();

  const ASPECT_TARGET = 2;
  const TOLERANCE = 0.02;

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function toggleCategory(value) {
    setForm((p) => {
      const exists = p.categories.includes(value);
      if (exists) {
        return { ...p, categories: p.categories.filter((c) => c !== value) };
      } else {
        if (p.categories.length >= 3) return p;
        return { ...p, categories: [...p.categories, value] };
      }
    });
  }

  function validateImageFile(file) {
    return new Promise((resolve, reject) => {
      if (!file) return reject("No se envió archivo");
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const aspect = img.width / img.height;
        URL.revokeObjectURL(url);
        if (Math.abs(aspect - ASPECT_TARGET) <= TOLERANCE) {
          resolve(true);
        } else {
          reject(
            `Relación de aspecto inválida: ${img.width}×${img.height} (${(
              aspect
            ).toFixed(2)}). Se necesita ≈ ${ASPECT_TARGET}:1`
          );
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject("No se pudo leer la imagen");
      };
      img.src = url;
    });
  }

  async function handleFile(file) {
    if (!file) return;
    setError("");
    try {
      await validateImageFile(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setImageFile(file);
    } catch (err) {
      setPreviewUrl(null);
      setImageFile(null);
      setError(typeof err === "string" ? err : "Imagen inválida");
    }
  }

  function onFileInputChange(e) {
    const file = e.target.files && e.target.files[0];
    handleFile(file);
  }

  function onDragOver(e) {
    e.preventDefault();
    setDragOver(true);
  }

  function onDragLeave(e) {
    e.preventDefault();
    setDragOver(false);
  }

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function removeImage() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setImageFile(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError(t('requestGame.errors.noName'));
    if (!form.categories.length) return setError(t('requestGame.errors.noCategories'));
    if (!form.description.trim()) return setError(t('requestGame.errors.noDescription'));
    if (!imageFile) return setError(t('requestGame.errors.noImage'));

    setSubmitting(true);

    try {
      const payload = {
        id: Date.now(),
        name: form.name.trim(),
        developer: "TuNombreDeSesion",
        categories: form.categories,
        description: form.description.trim(),
        price: Number(form.price) || 0,
        imageName: imageFile.name,
      };

      const raw = localStorage.getItem("mt_requests");
      const existing = raw ? JSON.parse(raw) : [];
      existing.unshift(payload);
      localStorage.setItem("mt_requests", JSON.stringify(existing));

      try {
        window.dispatchEvent(
          new CustomEvent("mt_new_request", { detail: payload })
        );
      } catch (err) {}

      try {
        window.dispatchEvent(
          new CustomEvent("mt_new_notification", { 
            detail: { 
              title: "Solicitud de juego", 
              message: `${payload.name} en revisión` 
            } 
          })
        );
      } catch (err) {}

      setTimeout(() => {
        setSubmitting(false);
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
        }, 2000);
        setForm({ name: "", categories: [], description: "", price: "" });
        removeImage();
      }, 700);
    } catch (err) {
      setSubmitting(false);
      setError(t('requestGame.errors.submitError'));
    }
  }

  const CATEGORY_LIST = [
    { value: "action", label: t('action') },
    { value: "adventure", label: t('adventure') },
    { value: "sports", label: t('sports') },
    { value: "rpg", label: t('rpg') },
    { value: "simulation", label: t('simulation') },
    { value: "strategy", label: t('strategy') },
    { value: "arcade", label: t('arcade') },
    { value: "platforms", label: t('platforms') },
    { value: "music", label: t('music') },
    { value: "puzzles", label: t('puzzles') },
    { value: "shooter", label: t('shooter') },
    { value: "beat", label: t('beat') },
    { value: "survival", label: t('survival') },
    { value: "hack", label: t('hack') },
    { value: "graphic", label: t('graphic') },
    { value: "openworld", label: t('openworld') },
    { value: "interactive", label: t('interactive') },
    { value: "football", label: t('football') },
    { value: "basketball", label: t('basketball') },
    { value: "racing", label: t('racing') },
    { value: "skate", label: t('skate') },
    { value: "actionrpg", label: t('actionrpg') },
    { value: "jrpg", label: t('jrpg') },
    { value: "mmorpg", label: t('mmorpg') },
    { value: "strategyrpg", label: t('strategyrpg') },
    { value: "life", label: t('life') },
    { value: "business", label: t('business') },
    { value: "flight", label: t('flight') },
    { value: "builder", label: t('builder') },
    { value: "rts", label: t('rts') },
    { value: "turns", label: t('turns') },
    { value: "cards", label: t('cards') },
    { value: "tactical", label: t('tactical') },
  ];

  return (
    <>
      <Header />

      <div className="request-game-layout">
        <div className="request-game-content">
          <h1 className="request-title">{t('requestGame.title')}</h1>

          <form className="request-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('requestGame.nameLabel')}</label>
              <input
                type="text"
                placeholder={t('requestGame.namePlaceholder')}
                name="name"
                value={form.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>{t('requestGame.categoriesLabel')}</label>
              <div className="multi-select-box">
                {CATEGORY_LIST.map((cat) => (
                  <div
                    key={cat.value}
                    className={`multi-option ${
                      form.categories.includes(cat.value) ? "selected" : ""
                    }`}
                    onClick={() => toggleCategory(cat.value)}
                  >
                    {cat.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>{t('requestGame.descriptionLabel')}</label>
              <textarea
                placeholder={t('requestGame.descriptionPlaceholder')}
                name="description"
                rows={5}
                value={form.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label>{t('requestGame.priceLabel')}</label>
              <input
                type="number"
                placeholder={t('requestGame.pricePlaceholder')}
                name="price"
                value={form.price}
                onChange={handleInputChange}
                min={0}
              />
            </div>

            <div className="form-group">
              <label>{t('requestGame.imageLabel')}</label>
              <div
                className={`image-dropzone ${
                  dragOver ? "drag-over" : ""
                } ${error ? "error" : ""}`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => inputRef.current && inputRef.current.click()}
              >
                {previewUrl ? (
                  <>
                    <img src={previewUrl} alt="preview" className="preview-img" />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={(ev) => {
                        ev.stopPropagation();
                        removeImage();
                      }}
                    >
                      {t('requestGame.removeImage')}
                    </button>
                  </>
                ) : (
                  <p>{t('requestGame.dropzoneText')}</p>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={onFileInputChange}
                />
              </div>

              {error && <p className="error-message">{error}</p>}
            </div>

            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? t('requestGame.submitting') : t('requestGame.submit')}
            </button>
          </form>

          <SettingsPanel />
        </div>
        {successMessage && (
          <div className="success-toast">
            <CiCircleCheck size={48} />
            <span>{t('requestGame.success')}</span>
          </div>
        )}
      </div>
    </>
  );
}