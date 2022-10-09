import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
import {Stack} from 'react-bootstrap';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Item from '../components/Item/Item';
import SelectBox from '../components/SelectBox.jsx/SelectBox';
import profItems from '../data/profItems.json';
import depItems from '../data/depItems.json';
import useOnError from '../hook/useOnError';


// const filterItem = (profs, dep) => {
//     const filteredByDep = dep === 'any' || dep === undefined || dep === "defaultValue"? profs
//     : profs.filter(i => i.departmentname === dep);

//     // if(sw === "" || sw === null || sw === undefined) 
//     return filteredByDep;
    
//     // const filter = sw.toLowerCase();
//     // return (
//     //     filteredByDep.filter(i => i.name.trim().toLowerCase().includes(filter))
//     //     //특정 문자열 포함된 문자열 찾으려면 정규표현식말고 includes 쓰면 됨.
//     // )
// }




const AllProfs = ({dataService}) => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const params = useParams();

    const search = searchParams.get('search');



    //const [error, setError] = useState('');
    const [error, onError] = useOnError('');

    const [departments, setDepartments] = useState([]);

    const [depId, setDepId] = useState(params.departmentId);

    const [profs, setProfs] = useState([]);

    useEffect(() => {
        setDepId(params.departmentId);
    }, [params]);

    useEffect(() => {
        dataService
        .getDepartments()
        .then((departments) => setDepartments([...departments]))
        .catch(onError);
    }, [dataService]);

    const handleSelect = (depId) => {
        navigate(`/profs/departments/${depId}?search=${search}`);
        setDepId(depId);
    }

    useEffect(() => {
        depId?
        dataService
        .getProfswithDepartment(depId, search)
        .then((profs) => setProfs([...profs]))
        .catch(onError):

        dataService
        .getProfs(search)
        .then((profs) => setProfs([...profs]))
        .catch(onError);
        
    
    }, [dataService, search, depId]);




    const filteredItems = profs;


    // const onError = (error) => {
    //     setError(error.toString());
    //     setTimeout(() => {
    //         setError('');
    //     }, 3000);
    // };

    return (
        <>
            <h1>
                {
                    (depId == 0 || !depId) && search === "" ?
                    `All Professors.`:
                    profs.length === 0 ?
                    `No professors with "${search}" in their name.`:
                    `${profs.length} professors with "${search}" in their name.`
                    
                }
            </h1>
            <div>
                <SelectBox 
                name="department" 
                id="department-select" 
                items={departments}
                handleSelect={handleSelect}
                selectedValue={depId}
                />
            </div>
            <Stack gap={4}>
                {filteredItems.map(i => (<Item key={i.id} item={i} />))}
            </Stack>
        </>
    )
}

export default AllProfs;