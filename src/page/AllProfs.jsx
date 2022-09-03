import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
import {Stack} from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom'
import Item from '../components/Item/Item';
import SelectBox from '../components/SelectBox.jsx/SelectBox';
import profItems from '../data/profItems.json';
import depItems from '../data/depItems.json';


const filterItem = (sw) => {
    if(sw === "" || sw === null || sw === undefined) return profItems;
    
    const filter = sw.toLowerCase();
    return (
        profItems.filter(i => i.name.trim().toLowerCase().includes(filter))
        //특정 문자열 포함된 문자열 찾으려면 정규표현식말고 includes 쓰면 됨.
    )
}

const AllProfs = (props) => {

    const [searchParams] = useSearchParams();
    const search_word = searchParams.get('prof');

    const [items, setItem] = useState(profItems);
    

    const filteredItems = useMemo(() => {
        return filterItem(search_word);
    }, [search_word])

    useEffect(() => {
        setItem(filteredItems);
    }, [filteredItems])

    const handleSelect = (dep) => {
        const filteredByDep = dep === 'any'? filteredItems: filteredItems.filter(i => i.department === dep);
        setItem(filteredByDep);
    }

    
    

    return (
        <>
            <h1>
                {
                    items == profItems ?
                    `All Professors.`:
                    items.length === 0 ?
                    `No professors with "${search_word}" in their name.`:
                    `${items.length} professors with "${search_word}" in their name.`
                    
                }
            </h1>
            <div>
                <SelectBox 
                    name="department" 
                    id="department-select" 
                    items={depItems}
                    handleSelect={handleSelect}
                />
            </div>
            <Stack gap={4}>
                {items.map(i => (<Item key={i.id} item={i} />))}
            </Stack>
        </>
    )
}

export default AllProfs;