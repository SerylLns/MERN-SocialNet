import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../actions/post.action";
import Card from './Post/Card';
import { isEmpty } from './utils';

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (loadPost) {
      dispatch(getPost());
      setLoadPost(false);
    }
  }, [loadPost]);

  return (
    <div className="thread-container">
      <ul>
        { !isEmpty(posts[0]) && posts.map((post) => {
          return <Card post={post} key={ post._id }/>
        })
        }
      </ul>
    </div>  
  );
};

export default Thread;