import { ADD_RECEIPE, REMOVE_RECEIPE } from '../actions'
import { combineReducers } from 'redux'

function food (state = {}, action) {
  switch (action.type) {
    case ADD_RECEIPE :
      const { receipe } = action

      return {
        ...state,
        [receipe.label]: receipe,
      }
    default :
      return state
  }
}

const InitialState = {
  sunday: {
    breakfast: null,
    lunch: null,
    dinner :null,
  },
  monday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  tuesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  wednesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  thursday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  friday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  saturday: {
    breakfast:null,
    lunch:null,
    dinner:null,
  },
}
function calendar (state = InitialState, action) {
  const { day, receipe, meal } = action

  switch (action.type) {
    case ADD_RECEIPE :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: receipe.label,
        }
      }
    case REMOVE_RECEIPE :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: null,
        }
      }
    default :
      return state
  }
}

export default combineReducers({ food,calendar })
