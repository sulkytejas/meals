export const ADD_RECEIPE = 'ADD_RECEIPE'
export const REMOVE_RECEIPE ='REMOVE_RECEIPE'

export function addReceipe ({day,meal,receipe}){
  return{
    type: ADD_RECEIPE,
    day,
    meal,
    receipe
  }

}
export function removeReceipe ({day,meal}){
  return{
    type: REMOVE_RECEIPE,
    day,
    meal
  }

}
