import { useEffect, useState } from "react";
import "./Comments.css";
import { MdDelete } from "react-icons/md";
import commentsData from "../data/commets.json";
import useTranslate from "../Context/useTranslate";

export default function Comments({ gameId }) {
  const initial = commentsData.filter((c) => c.gameId === gameId);

  const [localComments, setLocalComments] = useState([]);
  const [text, setText] = useState("");
  const [canComment, setCanComment] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const { t } = useTranslate();

  // Ver si el usuario ya comentó
  const userComment = localComments.find((c) => c.user === "Tú");

  // Cargar comentarios persistentes
  useEffect(() => {
    try {
      const raw = localStorage.getItem("mt_comments");
      const saved = raw ? JSON.parse(raw) : {};

      if (saved[gameId]) {
        setLocalComments(saved[gameId]);
      } else {
        setLocalComments([]);
      }
    } catch {
      setLocalComments([]);
    }
  }, [gameId]);

  // Verificar si el juego está en la biblioteca
  useEffect(() => {
    try {
      const raw = localStorage.getItem("mt_library");
      const library = raw ? JSON.parse(raw) : [];
      const owns = library.some((g) => g.id === gameId);
      setCanComment(owns);
    } catch {
      setCanComment(false);
    }
  }, [gameId]);

  const comments = [...initial, ...localComments];

  function handleAddComment() {
    if (text.trim() === "" || userComment) return;

    setIsPosting(true);

    setTimeout(() => {
      const newComment = {
        id: Date.now(),
        gameId,
        user: "Tú",
        avatar: "/public/Avatar Usuario.png",
        comment: text,
        date: new Date().toISOString(),
      };

      const updated = [...localComments, newComment];
      setLocalComments(updated);
      setText("");

      try {
        const raw = localStorage.getItem("mt_comments");
        const all = raw ? JSON.parse(raw) : {};
        all[gameId] = updated;
        localStorage.setItem("mt_comments", JSON.stringify(all));
      } catch {}

      setIsPosting(false);
    }, 1000);
  }

  function handleDeleteComment(id) {
    const updated = localComments.filter((c) => c.id !== id);
    setLocalComments(updated);

    try {
      const raw = localStorage.getItem("mt_comments");
      const all = raw ? JSON.parse(raw) : {};
      all[gameId] = updated;
      localStorage.setItem("mt_comments", JSON.stringify(all));
    } catch {}
  }

  return (
    <div className="comments-container">
      <h2 className="comments-title">{t('comments.title')}</h2>

      {!canComment && (
        <p className="no-comments">
          {t('comments.buyToComment')}
        </p>
      )}

      {canComment && !userComment && (
        <div className="comment-input-box">
          <textarea
            className="comment-textarea"
            placeholder={t('comments.writeComment')}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <button
            className={`comment-button ${isPosting ? "loading" : ""}`}
            onClick={handleAddComment}
            disabled={isPosting}
          >
            {isPosting ? <div className="spinner"></div> : t('comments.publish')}
          </button>
        </div>
      )}

      {canComment && userComment && (
        <p className="no-comments">
          {t('comments.alreadyCommented')}
        </p>
      )}

      <div className="comments-list">
        {comments.length === 0 && (
          <p className="no-comments">
            {t('comments.firstToComment')}
          </p>
        )}

        {comments.map((c) => (
          <div key={c.id} className="comment-card">
            <img src={c.avatar} className="comment-avatar" />

            <div className="comment-content">
              <div className="comment-header">
                <span className="comment-user">{c.user}</span>
                <span className="comment-date">
                  {new Date(c.date).toLocaleDateString()}
                </span>

                {c.user === "Tú" && (
                  <MdDelete
                    className="delete-comment-btn"
                    onClick={() => handleDeleteComment(c.id)}
                    title={t('comments.delete')}
                  />
                )}
              </div>

              <p className="comment-text">{c.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}