import { ADD_COMMENT, DELETE_POST, GET_POST, LIKE_POST, UNLIKE_POST, UPDATE_POST } from "../actions/post.action";

export const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return action.payload;

    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers],
          };
        }
        return post;
      });

    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => { return id !== action.payload.userId
          })
          };
        }
        return post;
      });

    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message
          }  
        }
        return post;
      })
    
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId)
    
    case ADD_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: action.payload.comments
          }
        }
        return post
      })
    default:
      return state;
  }
}
