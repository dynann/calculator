import { calculateNewValue } from "@testing-library/user-event/dist/utils"
import { useState} from "react"

const Grid = () => {

    const [display, setDisplay] = useState('')
    const [newNum, setNewNum] = useState(true)
    const [total, setTotal] = useState(0)
    const [lastOperator, setOperator] = useState(null)
    const [firstNum, setFirstNum] = useState(true)


    const numberClick = (number) => {
      if(newNum){
        setDisplay(number)
        setNewNum(false)
      } else {
        setDisplay(display + number)
      }
  
    }
    const acClick = () => {
        setDisplay('')
        setNewNum(true)
        setTotal(0)
    }


    const operatorClick = (operator) => {
      let currentValue = parseInt(display) || 0
      if(firstNum){
        setTotal(currentValue)
        setFirstNum(false)
      } else {
        const result = calculateResult(total, currentValue, operator)
        setTotal(result)
        setDisplay(String(result))
      }
      setOperator(operator)
      setNewNum(true)
    }


    const calculateResult = (currentTotal, current, operator) => {
      const currentValue = parseInt(current)
      switch(operator){
        case '+' : 
          return currentTotal + currentValue
        case '-' :
          return currentTotal - currentValue
        case '*' :
          return currentTotal * currentValue
        case '/' : 
          return currentTotal / currentValue
        default : 
          return currentValue
      }
    }

    const equalClick = () => {
      if(!lastOperator || newNum) return 
      const currentValue = parseInt(display) || 0
      const result = calculateResult(total, currentValue, lastOperator)
      setTotal(result)
      setDisplay(String(result))
      setNewNum(true)
      setFirstNum(true)
      setOperator(null)
    }

    return(
      <div>
        <table border={0}>
          <thead>
          <th colSpan={4}><input type="text" value={display} disabled></input></th>
          </thead>
          <tbody>
            <tr>
              <td><button onClick={() => operatorClick('+')}  type="button" class="button-22" >+</button></td>
              <td><button onClick={() => operatorClick('-')}  type="button" class="button-22" >-</button></td>
              <td><button onClick={() => operatorClick('*')}  type="button" class="button-22" >*</button></td>
              <td><button onClick={() => operatorClick('/')}  type="button" class="button-22" >/</button></td>
              
            </tr>
            <tr>
              <td><button onClick={() => numberClick('9')}  type="button" class="button-22" >9</button></td>
              <td><button onClick={() => numberClick('8')}  type="button" class="button-22" >8</button></td>
              <td><button onClick={() => numberClick('7')}  type="button" class="button-22" >7</button></td>
              <td rowSpan={4}><button onClick={() => equalClick()} type="button" class="button-22">=</button></td>
              
            </tr>
            <tr>
              <td><button onClick={() => numberClick('6')}  class="button-22" >6</button></td>
              <td><button onClick={() => numberClick('5')}  class="button-22" >5</button></td>
              <td><button onClick={() => numberClick('4')}  class="button-22" >4</button></td>
            </tr>
            <tr>
              <td><button onClick={() => numberClick('3')}  class="button-22" >3</button></td>
              <td><button onClick={() => numberClick('2')}  class="button-22" >2</button></td>
              <td><button onClick={() => numberClick('1')}  class="button-22" >1</button></td>
            </tr>
            <tr>
              
              <td><button onClick={() => acClick()}  type="button" class="button-22" >ac</button></td>
              <td colSpan={2}><button onClick={() => numberClick('0')} type="button" class="button-22" >0</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}

export default Grid