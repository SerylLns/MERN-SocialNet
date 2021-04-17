import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.action";
import EditIcon from "../../assets/images/edit.svg";
import deleteIcon from "../../assets/images/delete.svg";

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (comment.commenterId === uid) {
      setIsAuthor(true);
    }
  }, [uid, comment.commenterId]);

  const handleEdit = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(editComment(postId, comment._id, text));
    }
    setEdit(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id));

  };

  return (
    <div className="edit-comment">
      {isAuthor && !edit && (
        <span
          onClick={(e) => {
            setEdit(!edit);
          }}
        >
          <img
            src={EditIcon}
            alt="edit-comment"
          ></img>
        </span>
      )}
      {isAuthor && edit && (
        <form onSubmit={handleEdit}>
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer :
          </label>
          <br />
          <input
            defaultValue={comment.text}
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
          />
          <div className="btn-delete-comment">
            <div
              onClick={() => {
                if (
                  window.confirm("Voulez-vous vraiment supprimer ce commentaire ?")
                ) {
                  handleDelete();
                }
              }}
            >
              <img src={deleteIcon} alt="" />
            </div>
            <input type="submit" value="Valider les modifs" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
