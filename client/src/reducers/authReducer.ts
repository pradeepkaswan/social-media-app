import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  posts: [],
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, { payload }) => {
      state.user = payload.user
      state.token = payload.token
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setFriendList: (state, { payload }) => {
      if (state.user) {
        state.user.friendList = payload.friendList
      } else {
        console.log('user friend list not found')
      }
    },
    setPosts: (state, { payload }) => {
      state.posts = payload.posts
    },
    setPost: (state, { payload }) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === payload.post._id) {
          return payload.post
        }
        return post
      })
      state.posts = updatedPosts
    },
  },
})

export const { setLogin, setLogout, setFriendList, setPosts, setPost } =
  authSlice.actions

export default authSlice.reducer
