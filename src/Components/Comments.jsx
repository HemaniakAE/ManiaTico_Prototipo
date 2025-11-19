import "./Comments.css";
import commentsData from '../data/commets.json'

export default function Comments({ gameId }) {
  const comments = commentsData.filter(c => c.gameId === gameId);

  return (
    <div className="comments-container">
      <h2 className="comments-title">Comentarios</h2>

      {comments.length === 0 && (
        <p className="no-comments">Sé el primero en comentar este juego.</p>
      )}

      <div className="comments-list">
        {comments.map((c) => (
          <div key={c.id} className="comment-card">
            <img src={c.avatar} className="comment-avatar" />

            <div className="comment-content">
              <div className="comment-header">
                <span className="comment-user">{c.user}</span>
                <span className="comment-date">
                  {new Date(c.date).toLocaleDateString()}
                </span>
              </div>
              <p className="comment-text">{c.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
