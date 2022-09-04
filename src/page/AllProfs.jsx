import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
import {Stack} from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom'
import Item from '../components/Item/Item';
import SelectBox from '../components/SelectBox.jsx/SelectBox';
import profItems from '../data/profItems.json';
import depItems from '../data/depItems.json';


const filterItem = (sw, dep) => {
    const filteredByDep = dep === 'any' || dep === undefined? profItems
    : profItems.filter(i => i.department === dep);

    if(sw === "" || sw === null || sw === undefined) return filteredByDep;
    
    const filter = sw.toLowerCase();
    return (
        filteredByDep.filter(i => i.name.trim().toLowerCase().includes(filter))
        //특정 문자열 포함된 문자열 찾으려면 정규표현식말고 includes 쓰면 됨.
    )
}

const AllProfs = (props) => {

    const [searchParams] = useSearchParams();
    const search_word = searchParams.get('prof');

    const [department, setDepartment] = useState();
    

    const filteredItems = useMemo(() => {
        return filterItem(search_word, department);
    }, [search_word, department])

    const handleSelect = (dep) => {
        setDepartment(dep);
    }

    useEffect(() => {
        setDepartment();
    }, [search_word])

    return (
        <>
            <h1>
                {
                    filteredItems == profItems ?
                    `All Professors.`:
                    filteredItems.length === 0 ?
                    `No professors with "${search_word}" in their name.`:
                    `${filteredItems.length} professors with "${search_word}" in their name.`
                    
                }
            </h1>
            <div>
                <SelectBox 
                name="department" 
                id="department-select" 
                items={depItems}
                handleSelect={handleSelect}
                selectedValue={department}
                />
            </div>
            <Stack gap={4}>
                {filteredItems.map(i => (<Item key={i.id} item={i} />))}
            </Stack>
        </>
    )
}

export default AllProfs;