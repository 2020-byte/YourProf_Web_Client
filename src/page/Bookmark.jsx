import React, { useEffect, useState } from 'react';
import depItems from '../data/depItems.json';
import SelectBox from '../components/SelectBox.jsx/SelectBox';
import { Stack } from 'react-bootstrap';
import Item from '../components/Item/Item';
import profItems from '../data/profItems.json';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContent';
import useOnError from '../hook/useOnError';

const Bookmark = ({dataService, accountService}) => {


    const navigate = useNavigate();
    const auth = useAuth().user;
    useEffect(() => {
        !auth && navigate('/');
    }, [auth, navigate])
    const params = useParams();


    
    


    const [error, onError] = useOnError('');
    const [department, setDepartment] = useState();
    const [bookmark, setBookmark] = useState();

    const handleSelect = (dep) => {
        navigate(`/account/bookmark/${dep}`);
        //setDepartment(dep);
        //여기서 set하면 밑에 useEFfect땜에 두번됨.
    }

    useEffect(() => {
        setDepartment(params.departmentId);
    }, [params]);

    useEffect(() => {
        dataService
        .getBookmark(department)
        .then((i) => setBookmark(i))
        .catch(onError);
    }, [dataService, department]);

    


    if(!auth) return;
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
            {
                bookmark &&
                <Stack gap={4}>
                    {bookmark.map(i => (<Item key={i.id} item={i} />))}
                </Stack>
            }
        </div>
        
        
    )
}

export default Bookmark;