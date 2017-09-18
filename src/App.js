import React, { Component } from 'react';
import '../src/App.css';
import { connect } from 'react-redux'
import {addReceipe,removeReceipe} from '../src/actions'
import { capitalize } from './utils/helper'
import CalendarIcon  from 'react-icons/lib/fa/calendar-plus-o'
import Modal from 'react-modal'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right'
import Loading from 'react-loading'
import { fetchRecipes } from '../src/utils/api'
import FoodList from './components/foodlist'
import ShoppingList from './components/shoppinglist'

class App extends Component {

  state={
    openModal: false,
    day: null,
    meal:null,
    food:null,
    ingredientsModalOpen: false,
    loadingFood:false,

  }

  openFoodModal = (day,meal)=>{
    this.setState(()=>({
      openModal: true,
      day,
      meal,
    }))
  }

  closeFoodModal = ()=>{
    this.setState(()=>({
      openModal: false,
      day:null,
      meal:null,
      food:null
    }))
  }

  openIngredientsModal = () => this.setState(() => ({ ingredientsModalOpen: true }))
  closeIngredientsModal = () => this.setState(() => ({ ingredientsModalOpen: false }))

  generateShoppingList = () => {
    return this.props.calendar.reduce((result, { meals }) => {
      const { breakfast, lunch, dinner } = meals

     breakfast && result.push(breakfast)
     lunch && result.push(lunch)
     dinner && result.push(dinner)
     console.log(result)
     return result
     }, [])
    .reduce((ings, { ingredientLines }) => ings.concat(ingredientLines), [])
 }

  searchFood = (e) =>{
    if(!this.input.value){
        return
    }
    e.preventDefault()

    this.setState(()=>({
      loadingFood:true
    }))

    fetchRecipes(this.input.value)
      .then((food) => this.setState(() => ({
        food,
        loadingFood: false,
      })))
  }

  render() {

    const mealOrder =['breakfast','lunch','dinner']
    const {food,openModal,loadingFood,ingredientsModalOpen} = this.state
    const { calendar,remove,selectRecipe} = this.props
    return (
      <div className="container">
        <div className='nav'>
            <h1 className='header'>Meals For Tejas</h1>
            <button
              className='shopping-list'
              onClick={this.openIngredientsModal}>
              Shopping List
            </button>
        </div>
        <ul className="meal-types">
          {mealOrder.map((meal)=> <li key={meal} className="sub-header"> {capitalize(meal) } </li>)}
        </ul>
        <div className="calendar">
          <div className="days">
            {calendar.map(({ day }) => <h3 key={day} className='subheader'>{capitalize(day)}</h3>)}
          </div>
          <div className="icon-grid">
            {calendar.map(({day,meals}) =>
            <ul key={day}>
              {mealOrder.map((meal)=>
                <li className="meal" key={meal}>
                  {meals[meal]?
                    <div className='food-item'>
                      <img src={meals[meal].image} alt={meals[meal].label}/>
                      <button onClick={() => remove({meal, day})}>Clear</button>
                    </div> :
                    <button onClick={()=>this.openFoodModal({day,meal})} className='icon-btn'>
                      <CalendarIcon size={30}/>
                    </button>
                  }
                </li>
              )}
            </ul>
          )}
          </div>
        </div>
         <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={openModal}
          onRequestClose={this.closeFoodModal}
          contentLabel='Modal'
        >
          <div>
            {loadingFood === true
              ? <Loading delay={200} type='spin' color='#222' className='loading' />
              : <div className='search-container'>
                  <h3 className='subheader'>
                    Find a meal for {capitalize(this.state.day)} {this.state.meal}.
                  </h3>
                  <div className='search'>
                    <input
                      className='food-input'
                      type='text'
                      placeholder='Search Foods'
                      ref={(input) => this.input = input}
                    />
                    <button
                      className='icon-btn'
                      onClick={this.searchFood}>
                        <ArrowRightIcon size={30}/>
                    </button>
                  </div>
                  {food !== null && (
                    <FoodList
                     food={food}
                     onSelect={(receipe) => {
                       selectRecipe({ day: this.state.day, meal: this.state.meal,receipe })
                       this.closeFoodModal()
                     }}
                   />)}
                </div>}
          </div>
        </Modal>
        <Modal
           className='modal'
           overlayClassName='overlay'
           isOpen={ingredientsModalOpen}
           onRequestClose={this.closeIngredientsModal}
           contentLabel='Modal'
      >
           {ingredientsModalOpen && <ShoppingList list={this.generateShoppingList()}/>}
        </Modal>
     </div>
    );
  }
}

function mapStateToProps ({calendar,food}) {

  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

 return {
   calendar: dayOrder.map((day) => ({
     day,
     meals: Object.keys(calendar[day]).reduce((meals, meal) => {
       meals[meal] = calendar[day][meal]
         ? food[calendar[day][meal]]
         : null

       return meals
     }, {})
   })),
 }
 }

 function mapDispatchToProps (dispatch) {
   return {
     selectRecipe: (data) => dispatch(addReceipe(data)),
     remove: (data) => dispatch(removeReceipe(data))
   }
 }

export default connect(mapStateToProps,mapDispatchToProps)(App);
