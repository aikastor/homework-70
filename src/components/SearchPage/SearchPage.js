import React, {useEffect, useState} from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Spinner
} from "reactstrap";
import axios from 'axios';

import {useDebounce} from "../../useDebounse";
import {useHistory} from "react-router";

import './SearchPage.css';

const SearchPage = () => {

  const [input,setInput] = useState({search: ''});
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showList, setShowList] = useState(true);

  const handleInputChange =  (e) =>  {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const debouncedSearchItem = useDebounce(input.search, 500);
  let history = useHistory();
  useEffect(

      ()=> {
        const fetchData = async (queryString)=>{
          return await axios.get(`http://api.tvmaze.com/search/shows?q=${queryString}`);
        };

        if (debouncedSearchItem) {
          setIsSearching(true);
          fetchData(input.search).then(response=> {
            setShowList(true);
            setIsSearching(false);
            setSearchResults(response.data);
          })
        } else {
          setSearchResults([])
        }
      }, [debouncedSearchItem]
  );
  const toggleList =(id)=>{
    setShowList(false);
    history.push('/shows/' + id);
  };


  return (
      <div>
        <Form onSubmit={(e)=>{e.preventDefault();}} className='search-form'>
          <FormGroup>
            <Label for="search">Search</Label>
            <Input
                type="search"
                name="search"
                id="search"
                placeholder="Enter a show's name"
                value={input.search}
                onChange={handleInputChange}
            />
          </FormGroup>
        </Form>
        <ListGroup className='search-list'>
          { showList &&
            searchResults.map((item,index)=>(
                <ListGroupItem key={index}>
                    <button
                        onClick={()=>toggleList(item.show.id)}
                        className='show-btn'
                    >
                      {item.show.name}
                    </button>
                </ListGroupItem>
            ))
          }
        </ListGroup>
        {isSearching &&<Spinner/>}
      </div>
  );
};

export default SearchPage;