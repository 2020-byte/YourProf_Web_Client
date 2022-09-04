import React from 'react';
import { useParams } from 'react-router-dom';
import InfoBox from '../components/InfoBox/InfoBox';
import profItems from '../data/profItems.json';


const Prof = (props) => {

    const params = useParams();
    const profId = params.id;

    const prof = profItems.find(i => i.id == profId);

    return (
        <div>
            <InfoBox item={prof}/>
        </div>
        
    )
}

export default Prof;