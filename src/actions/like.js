import database from '../firebase/firebase';

export const addLike = (like) => ({
  type: "ADD_LIKE",
  likes: like
})

export const startAddLike = (likeData = {}) => {
  return (dispatch, getState) => {
    console.log('hi')
    const uid = getState().auth.uid;
    const {
      likeid = '',
      likes = 0
    } = likeData;
    const like = { likeid, likes };

    return database.ref(`users/${uid}/likes`).push(like).then((ref) => {
      dispatch(addLike({
        id: ref.key,
        likeid: like.likeid,
        ...like
      }));
    });
  };
};

export const setLikeKeys = (likekey) => ({
  type: "SET_LIKE_KEY",
  likekey
});

export const startSetLikeKey = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/liked`).once('value').then((snapshot) => {

      const likeKeys = [];
      snapshot.forEach(childSnapshot => {
          likeKeys.push({
            id:childSnapshot.key,
            ...childSnapshot.val()
          })
    })
      dispatch(setLikeKeys(likeKeys));
    });
  };
};

export const editLike = (like, updates) => ({
  type: 'EDIT_LIKE',
  like,
  updates
});

export const startEditLike = ( like, updates ) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/liked/${like}`).update(updates).then(() => {
      dispatch(editLike( like, updates ));
    });
  };
}

export const editLikesKey = (like, updates) => ({
  type: 'EDIT_LIKES_KEY',
  like,
  updates
});

export const startEditLikesKey = ( like, updates ) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/liked/${like}`).update(updates).then(() => {
      dispatch(editLike( like, updates ));
    });
  };
}
