import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect (() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const filteredPersons = persons.filter(person => person.name === newName)
    //console.log(persons.filter(person => person.name === nameObject.name).length)
    
    if (filteredPersons.length > 0) {
      setErrorMessage(`${newName} is already added to phonebook, replace the old number with a new one?`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      
      const previousPerson = persons.find(person => person.name === newName)
      //console.log(persons.find(person => person.name === newName))
      const changeNumber = { ...previousPerson, number: newNumber }
      
      personService
        .update(previousPerson.id, changeNumber)
          .then(updatePerson => {
            setPersons(persons.map(person => person.name !== newName ? person : updatePerson))
          })
          .catch(error => {
            setErrorMessage(
              `${newName} was already deleted from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
    }
    else {
      personService
        .create(nameObject)
          .then(newPerson => {
            setPersons(persons.concat(newPerson))
            setNewName(newName)
            setNewNumber(newNumber)
          })
          setErrorMessage(`${newName} is successfully added to phonebook`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
    }
  }

  const deletePerson = (id) => {
    personService
      .deletePerson(id)
        .then(deletedPerson => {
          deletedPerson = persons.filter(person => person.id !== id)
          setPersons(deletedPerson)
        })
        setErrorMessage(`${newName} is successfully deleted from phonebook`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value) 
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={newFilter} 
        handleFilter={handleFilter}
        />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        value={newName + newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons}
        newFilter={newFilter}
        deletePerson={deletePerson}
      />
    </div>
  )

}

export default App