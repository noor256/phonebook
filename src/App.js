import { useState,useEffect } from "react";
import Filter from "./components/Filter";
import Button from "./components/Button";
import Name from "./components/name";
import Number from "./components/Number";
import axios from 'axios';
import personService from './services/persons';
import Delete from "./components/Delete";
import Notification from "./components/Notification";
import Error from "./components/Error";
import './index.css'




const App=()=>{
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Arto Hella')
  const [newPhone, setNewPhone] = useState([])
  const [searchName, setSearchName] = useState("")
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)



  const placeholder = 'Search for names'
  useEffect(() => {
   


    personService
    .getAll()
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
       
    }  
   
    const phoneNumber = {
       number : newPhone
    } 
    const existing_number = persons.map(person =>person.number)
    console.log(existing_number)
    if(existing_number.includes(newPhone)){
    window.confirm(`${newPhone} is already added to the phonebook replace the old one with the new one`)


    }
    const existing_names = persons.map(person => person.name)
    if(existing_names.includes(newName)){
      alert(`${newName} is already added to the phonebook`)
      setPersons(persons.filter(item => item !==newName))
     
 
    }
    else {
       
    personService
    .create(personObject)
    .then(response => {
     setPersons(persons.concat(response.data))
    }).then(response =>{
      setSuccessMessage(`${newName} is successfully added `)
      
    })
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)

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
    console.log(event.target.value);
    setSearchName(event.target.value)

    const filteredNames= persons.map(nombre => {
      return nombre.name.toLowerCase();
    });
    
    if(filteredNames.includes(searchName.toLowerCase())){
      // console.log(`${searchName} exists brother`)
      
      const nowName= persons.filter(person=>person.name===searchName)
      setPersons(nowName)
    }else{
      console.log(filteredNames, searchName)
      
  }
 
  }
 

  const deletePerson = (id) =>{
    if(  window.confirm("Do you want to delete this person?")){

        console.log(`hello ${id}`)
    const url = `http://localhost:3001/persons/${id}`
    const person= persons.find(n => n.id ===id)
    const changedNote = {...person}

    axios.delete(url, changedNote).then(response => {
      setPersons(persons.map(person => person.id !== id ? person: response.data))
      console.log(id)
      window.location.reload(false);
    })
    .catch(error => {
      setErrorMessage(
        `${person}' has been already removed from server`
      )
      setTimeout(() =>{
        setErrorMessage(null)
      },5000)
      setPersons(persons.map(person => person.id !== id ? person: response.data))
    })
    }
  
  
  }

   

  return(
    <div>
      <h1>Phonebook</h1>
      <Notification  message ={successMessage}/>
      <Error error = {errorMessage}/>
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
           <div>
            <h4 key={i}>{person.name} { person.number}  <Delete onClick={()=>deletePerson(person.id)}/></h4> 
            </div>
          )}
          
        </ul>
         
      </div>

    </div>
  )
}


export default App;
