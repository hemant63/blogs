import React, {useState} from 'react'

function Search({handleSearchField}) {
    const [searchArr, setSearchArr] = useState(handleSearchField())
    console.log(searchArr)
  return (
    <div className='search-modal'>
        <div className='search-modal-content'>
            
        </div>
    </div>
  )
}

export default Search