import { useState,useEffect } from "react";
import Filter from "./components/Filter";
import Button from "./components/Button";
import Name from "./components/name";
import Number from "./components/Number";
import axios from 'axios';




const App=()=>{
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Arto Hella')
  const [newPhone, setNewPhone] = useState([])
  const [searchName, setSearchName] = useState("")


  const placeholder = 'Search for names'
  useEffect(() => {
    console.log('effect')

    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  const addPerson=(event)=>{
    event.preventDefault()

 
    const personObject = {
      name: newName,
      number: newPhone,
      
      id: persons.length + 1,
    
   
    }  
    const phoneNumber = {
       number : newPhone
    } 
    const existing_names = persons.map(person => person.name)
    if(existing_names.includes(newName)){
      alert(`${newName} is already added to the phonebook`)
      
    }
    else {
       setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhone(phoneNumber)
    setNewPhone('')
    }
    


  
  }



  const handlePersonChange=(event) =>{
    // console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange= (event)=>{
    // console.log(event.target.value);
    setNewPhone(event.target.value)
    
  }


  const handleName = (event)=>{
    // console.log(event.target.value);
    setSearchName(event.target.value)

    const filteredNames= persons.map(nombre => {
      return nombre.name.toLocaleLowerCase();
    });
    
    if(filteredNames.includes(searchName.toLocaleLowerCase())){
      console.log(`${searchName} exists brother`)
      const nowName= persons.filter(person=>person.name===searchName)
      setPersons(nowName)
    }else{
      console.log(filteredNames, searchName)
  }
 
  }
 

   

  return(
    <div>
      <h1>Phonebook</h1>
      <Filter  value={searchName} onChange={handleName} placeholder={placeholder}/>
      <form onSubmit={addPerson}>
        <div>
         <Name value={newName} onChange={handlePersonChange}/>
         
          <Number value={newPhone} onChange={handleNumberChange}/>
        </div>
     
        <Button />
      </form>       
     
      <h3>Numbers</h3>
      <div>
        <ul>
      {persons.map((person,i)=>
      
            <h4 key={i}>{person.name} { person.number}</h4>
          )}
          
        </ul>
         
      </div>

    </div>
  )
}


export default App;
