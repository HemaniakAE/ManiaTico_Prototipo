import React, { useState, useEffect, useRef } from "react";
import { IoIosNotifications } from "react-icons/io";
import "./NotificationsButton.css";

export default function NotificationsButton() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasNew, setHasNew] = useState(false);

  const trayRef = useRef(null);

  // Cargar datos persistentes
  useEffect(() => {
    const rawNotifs = localStorage.getItem("mt_notifications");
    const rawHasNew = localStorage.getItem("mt_notifications_new");

    if (rawNotifs) setNotifications(JSON.parse(rawNotifs));
    if (rawHasNew === "true") setHasNew(true);
  }, []);

  // Listener de nuevas notificaciones
  useEffect(() => {
    const handler = (ev) => {
      const notif = ev.detail;

      setNotifications((prev) => {
        const updated = [notif, ...prev];
        localStorage.setItem("mt_notifications", JSON.stringify(updated));
        return updated;
      });

      setHasNew(true);
      localStorage.setItem("mt_notifications_new", "true");
    };

    window.addEventListener("mt_new_notification", handler);
    return () => window.removeEventListener("mt_new_notification", handler);
  }, []);

  // Cerrar si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (trayRef.current && !trayRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOpen = () => {
    const newState = !open;

    // Si la bandeja se está abriendo → marca como "visto"
    if (newState === true) {
      setHasNew(false);
      localStorage.setItem("mt_notifications_new", "false");
    }

    setOpen(newState);
  };

  return (
    <div className="notif-container" ref={trayRef}>
      <button
        className={`notif-button ${hasNew ? "new" : ""}`}
        onClick={toggleOpen}
      >
        <IoIosNotifications size={30} />
      </button>

      <div className={`notif-tray ${open ? "open" : ""}`}>
        <h4>Notificaciones</h4>

        {notifications.length === 0 && (
          <p className="no-notifs">No hay notificaciones</p>
        )}

        <ul>
          {notifications.map((n, idx) => (
            <li key={idx}>
              <strong>{n.title}</strong><br />
              {n.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
