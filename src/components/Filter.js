
const Filter = ({ newFilter, handleFilter }) => {
    return (
      <div>
        Filter shown with <input value={newFilter}
        onChange={handleFilter}
        />
      </div>
    )
  }
export default Filter