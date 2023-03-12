import React, {useState} from 'react'


    const SearchBar = (people) => {

        const [searchInput, setSearchInput] = useState("");
        const handleChange = (e) => {
          e.preventDefault();
          setSearchInput(e.target.value);
        };
        if (searchInput.length > 0) {
          people.filter((people) => {
          return people.firstname.match(searchInput);
      });
      }
      
      
  return (

    <div>
         <input className='frds-search' placeholder='search frds'onChange={handleChange}
   value={searchInput}/>
        {people.map((people, key) => (

        <div>
          <div>
            {/* <td>{people.profile.myfile}</td> */}
            <div>{people.firstname}</div>
          </div>
        </div>
        ))}
        </div>
  )

  }
export default SearchBar