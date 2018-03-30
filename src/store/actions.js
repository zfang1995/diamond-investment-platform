import humanProperties from '@/assets/script/humanProperties.js'
import api from '@/api'

export function userLogIn ({commit, state}, {phoneNumber}) {
// params === {
//  id, phoneNumber
// }
  commit('setUserPhoneNumber', phoneNumber)
  commit('setUserLogInState', 'loggedIn')
  return Promise.resolve('succeed')
}

export var appPrompt = function ({ commit, state }, arg1) {
  if (arg1 === undefined) {
    // restore appPrompt data
    commit('setPopupPromptComponentProps', undefined)
    commit('setPopupPromptContent', '')
    commit('togglePopupPromptOuterCover', false)
    commit('togglePopupPromptAutoPosition', true)
    commit('setPopupPromptTheme', 'normal')
    commit('clearPopupPromptTimeout')
  }
  if (typeof arg1 === 'object') {
    var { content, options } = arg1
  } else if (typeof arg1 === 'string') {
    content = arg1
  } else {
    return [false, 'data type error']
  }
  if (options) {
    var { useOuterCover, useAutoPosition, theme, timeout, stateAtNextTick } = options
  }
  switch (typeof content) {
    case 'string':
      commit('setPopupPromptContent', content)
      commit('togglePopupPromptOuterCover', !!(useOuterCover === undefined || false))
      commit('togglePopupPromptAutoPosition', !!(useAutoPosition === undefined || true))
      commit('setPopupPromptTheme', theme === undefined ? 'normal' : theme)
      return new Promise(resolve => {
        commit('setPopupPromptTimeout', setTimeout(() => {
          commit('clearPopupPromptTimeout')
          commit('setPopupPromptContent', '')
          resolve(stateAtNextTick)
        }, timeout === undefined ? (content.length * 1000 / humanProperties.readingSpeedInChinese() + 500) : timeout))
      })

    case 'object':
      let {props} = options
      commit('setPopupPromptComponentProps', props)
      commit('setPopupPromptContent', content)
      commit('togglePopupPromptOuterCover', !!(useOuterCover === undefined || false))
      commit('togglePopupPromptAutoPosition', !!(useAutoPosition === undefined || true))
      commit('setPopupPromptTheme', theme === undefined ? 'normal' : theme)
      return new Promise((resolve) => {
        commit('setPopupPromptTimeout', setTimeout(() => {
          commit('clearPopupPromptTimeout')
          commit('setPopupPromptContent', '')
          resolve(stateAtNextTick)
        }, timeout === undefined ? (5000) : timeout))
      })
  }
}

export function userSignOut ({commit, state}) {
  api.userSignOut()
  .then(res => {
    commit('setUserLogInState', 'notLoggedIn')
    location.href = '/'
  })
}
