const Persons = ({ persons, newFilter, deletePerson }) => {
    const personShow = persons.filter(
    person => person.name.toLowerCase().includes(newFilter.toLowerCase()
      )
    )
      return (
        <div>
          {personShow.map(person =>
          <li key={person.id}>
            {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button>
          </li>
          )}
        </div>
      )
  }
  export default Persons