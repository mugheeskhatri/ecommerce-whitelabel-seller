const main = {
    data: 'check',

}

const Reduser = (state = main, action) => {
    console.log(action)
    switch (action.type) {
        case "user":
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}

export default Reduser

