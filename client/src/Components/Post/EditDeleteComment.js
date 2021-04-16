import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import { useDispatch, useSelector } from "react-redux";
import { editComment } from "../../actions/post.action";


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
      setEdit(false);
    }
  };

  return (
    <div className="edit-comment">
      {isAuthor && !edit && (
        <span
          onClick={(e) => {
            setEdit(!edit);
          }}
        >
          imgEdit
        </span>
      )}
      {isAuthor && edit && (
        <form onSubmit={handleEdit}>
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br/>
          <input
            defaultValue={comment.text}
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
          />
          <input type="submit" value="Valider les modifs"/>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
