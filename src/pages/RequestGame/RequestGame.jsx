import React, { useEffect, useRef, useState } from "react";
import "./requestGame.css";
import Header from "../../Components/Header";
import SettingsPanel from "../../Components/SettingsPanel";
import { CiCircleCheck } from "react-icons/ci";

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

  // ✅ NUEVO: alternar categoría sin usar Ctrl
  function toggleCategory(value) {
    setForm((p) => {
      const exists = p.categories.includes(value);

      if (exists) {
        // Si ya existe, lo removemos
        return { ...p, categories: p.categories.filter((c) => c !== value) };
      } else {
        // Solo agregamos si hay menos de 3 categorías
        if (p.categories.length >= 3) return p; // ignorar si ya hay 3
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

    if (!form.name.trim()) return setError("El nombre del juego es requerido.");
    if (!form.categories.length)
      return setError("Selecciona al menos una categoría.");
    if (!form.description.trim()) return setError("La descripción es requerida.");
    if (!imageFile) return setError("Sube una imagen con relación 2:1.");

    setSubmitting(true);

    try {
      const payload = {
        id: Date.now(),
        name: form.name.trim(),
        developer: "TuNombreDeSesion",
        categories: form.categories,
        description: form.description.trim(),
        price: Number(form.price) || 0, // convertir a número o 0
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

      // Notificación para el botón de notificaciones
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

        // Ocultarlo después de 2 segundos
        setTimeout(() => {
          setSuccessMessage(false);
        }, 2000);
        setForm({ name: "", categories: [], description: "", price: "" });
        removeImage();
      }, 700);
    } catch (err) {
      setSubmitting(false);
      setError("Error al enviar la solicitud.");
    }
  }

  const CATEGORY_LIST = [
  // Principales
  { value: "action", label: "Acción" },
  { value: "adventure", label: "Aventura" },
  { value: "sports", label: "Deportes" },
  { value: "rpg", label: "RPG" },
  { value: "simulation", label: "Simulación" },
  { value: "strategy", label: "Estrategia" },
  { value: "arcade", label: "Arcade" },
  { value: "platforms", label: "Plataformas" },
  { value: "music", label: "Música" },
  { value: "puzzles", label: "Puzzles" },

  // Subcategorías de action
  { value: "shooter", label: "Shooter" },
  { value: "beat", label: "Beat" },
  { value: "survival", label: "Survival" },
  { value: "hack", label: "Hack" },

  // Subcategorías de adventure
  { value: "graphic", label: "Graphic" },
  { value: "openworld", label: "Openworld" },
  { value: "interactive", label: "Interactive" },

  // Subcategorías de sports
  { value: "football", label: "Football" },
  { value: "basketball", label: "Basketball" },
  { value: "racing", label: "Racing" },
  { value: "skate", label: "Skate" },

  // Subcategorías de rpg
  { value: "actionrpg", label: "ActionRPG" },
  { value: "jrpg", label: "JRPG" },
  { value: "mmorpg", label: "MMORPG" },
  { value: "strategyrpg", label: "StrategyRPG" },

  // Subcategorías de simulation
  { value: "life", label: "Life" },
  { value: "business", label: "Business" },
  { value: "flight", label: "Flight" },
  { value: "builder", label: "Builder" },

  // Subcategorías de strategy
  { value: "rts", label: "RTS" },
  { value: "turns", label: "Turns" },
  { value: "cards", label: "Cards" },
  { value: "tactical", label: "Tactical" },
];


  return (
    <>
      <Header />

      <div className="request-game-layout">
        <div className="request-game-content">
          <h1 className="request-title">Solicitud de nuevo juego</h1>

          <form className="request-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre del juego</label>
              <input
                type="text"
                placeholder="Ej: Don Memo"
                name="name"
                value={form.name}
                onChange={handleInputChange}
              />
            </div>

            {/* ✅ MultiSelect mejorado */}
            <div className="form-group">
              <label>Categorías</label>

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
              <label>Descripción</label>
              <textarea
                placeholder="Explica brevemente tu juego…"
                name="description"
                rows={5}
                value={form.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Precio (₡)</label>
              <input
                type="number"
                placeholder="Ej: 100"
                name="price"
                value={form.price}
                onChange={handleInputChange}
                min={0}
              />
            </div>

            <div className="form-group">
              <label>Imagen del juego (relación 2:1)</label>

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
                      Quitar imagen
                    </button>
                  </>
                ) : (
                  <p>Arrastra una imagen aquí o haz clic para subirla (2:1)</p>
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
              {submitting ? "Enviando..." : "Enviar solicitud"}
            </button>
          </form>

          <SettingsPanel />
        </div>
        {successMessage && (
          <div className="success-toast">
            <CiCircleCheck size={48} />
            <span>¡Solicitud enviada correctamente!</span>
          </div>
        )}

      </div>
    </>
  );
}
