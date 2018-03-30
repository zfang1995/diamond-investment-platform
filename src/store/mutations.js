let mutations = {
  setUserPhoneNumber (state, string) {
    state.userPhoneNumber = string
  },
  setUserLogInState (state, string) {
    state.userLogInState = string
  },
  setUserId (state, string) {
    state.userId = string
  },
  setPopupPromptContent (state, content) {
    state.infoOfPopupPrompt.content = content
  },
  togglePopupPromptOuterCover (state, boolean) {
    state.infoOfPopupPrompt.outerUseCover = boolean
  },
  togglePopupPromptAutoPosition (state, boolean) {
    state.infoOfPopupPrompt.autoPosition = boolean
  },
  setPopupPromptTheme (state, string) {
    state.infoOfPopupPrompt.theme = string
  },
  setPopupPromptTimeout (state, timeoutFn) {
    state.infoOfPopupPrompt.timer = timeoutFn
  },
  clearPopupPromptTimeout (state) {
    clearTimeout(state.infoOfPopupPrompt.timer)
    state.infoOfPopupPrompt.timer = null
  },
  setPopupPromptComponentProps (state, object) {
    state.infoOfPopupPrompt.componentProps = object
  }
}

export default mutations
