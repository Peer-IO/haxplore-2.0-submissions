/* eslint-disable */
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import { auth } from '../plugins/firebase'
const BASE_URL = 'https://arcane-mountain-95630.herokuapp.com'

export const state = () => ({
  snackbar: {
    show: false,
    color: 'blue',
    message: '',
  },
})

export const mutations = {
  snackbar(state, payload) {
    state.snackbar = payload
  },
}

export const actions = {
  async SignUp({ commit }, payload) {
    let condition = true
    await axios
      .post(`${BASE_URL}/auth/signup`, payload)
      .then((token) => {
        commit('snackbar', {
          show: true,
          color: 'green',
          message: 'Account Created succesfully',
        })
        condition = true
      })
      .catch((err) => {
        commit('snackbar', {
          show: true,
          color: 'red',
          message: 'An Account with this email Alredy exists ! ',
        })
        condition = false
      })
    return condition
  },

  async editUser({ commit, state }, payload) {
    const config = {
      headers: {
        Authorization: payload.token,
      },
    }
    await axios
      .put(`${BASE_URL}/user/`, payload.updatedUser, config)
      .then((res) => {
        commit('snackbar', {
          show: true,
          color: 'success',
          message: 'Name Updated Succesfully ! ',
        })
      })
      .catch((err) => {
        commit('snackbar', {
          show: true,
          color: 'red',
          message: err.message,
        })
      })
  },

  async editProfileImage({ commit }, payload) {
    const user = firebase.auth().currentUser

    await firebase
      .storage()
      .ref('users/' + user.uid)
      .put(payload.file)
      .then(async (fileData) => {
        const imageUrl = await firebase
          .storage()
          .ref('users')
          .child(fileData.metadata.name)
          .getDownloadURL()

        user
          .updateProfile({
            photoURL: imageUrl,
          })
          .then(function () {
            localStorage.setItem('photoUrl', imageUrl)
            commit('snackbar', {
              show: true,
              color: 'success',
              message: 'Profile Image Updated Succesfully ! ',
            })
          })
          .catch((err) => {
            commit('snackbar', {
              show: true,
              color: 'red',
              message: err.message,
            })
          })
      })
  },
  snackbar({ commit }, payload) {
    commit('snackbar', payload)
  },
  async logout({ commit }, payload) {
    await auth.signOut()
  },
}

export const getters = {
  snackbar(state) {
    return state.snackbar
  },
}
