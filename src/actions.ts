import {createWrap, reactions} from 'redux-from-void'


export const wrap = createWrap()


const {
    openLoginModal,
    closeLoginModal,
    logout,
    resetComplete
} = reactions(wrap)

const {
    loginSubmit,
    registrationSubmit,
    addPlanet,
    planetListInit
} = reactions(wrap, [ 'success', 'failed' ])

export {
    loginSubmit,
    logout,
    registrationSubmit,
    openLoginModal,
    closeLoginModal,
    addPlanet,
    planetListInit,
    resetComplete
}