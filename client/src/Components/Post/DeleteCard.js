import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.action';
import deleteIcon from '../../assets/images/delete.svg';

const DeleteCard = ({post}) => {
  const dispatch = useDispatch();

  const deleteQuote = () => {
    dispatch(deletePost(post._id));
  }

  return (
    <div onClick={() => {
      if (window.confirm("Voulez-vous vraiment supprimer cet article ?")){
        deleteQuote();
      }
    }}>
      <img src={deleteIcon} alt=""/>
    </div>
  );
};

export default DeleteCard;