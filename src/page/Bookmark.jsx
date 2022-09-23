import React, { useState } from 'react';
import depItems from '../data/depItems.json';
import SelectBox from '../components/SelectBox.jsx/SelectBox';
import { Stack } from 'react-bootstrap';
import Item from '../components/Item/Item';
import profItems from '../data/profItems.json';

const Bookmark = (props) => {

    const [department, setDepartment] = useState();

    const handleSelect = (dep) => {
        setDepartment(dep);
    }

    return (
        <div>
            <h1>Bookmark</h1>
            <SelectBox 
            name="department" 
            id="department-select" 
            items={depItems}
            handleSelect={handleSelect}
            selectedValue={department}
            />
            <Stack gap={4}>
                {profItems.map(i => (<Item key={i.id} item={i} />))}
            </Stack>
        </div>
        
        
    )
}

export default Bookmark;