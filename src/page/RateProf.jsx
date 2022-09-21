import React, { useState } from 'react';
import { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionBox from '../components/QuestionBox/QuestionBox';
import questions from '../data/question.json';

const TOS = {
    'value': 'tos',
    'type' : 'text',
    'question':
    `By clicking the "Submit" button, I acknowledge that I have read and agreed to the Rate My Professors Site Guidelines, 
    Terms of Use and Privacy Policy. Submitted data becomes the property of RateMyProfessors.com. IP addresses are logged.`
}

const RateProf = (props) => {

    const [course, setCourse] = useState();
    const [quality, setQuality] = useState();
    const [difficulty, setDifficulty] = useState();
    const [WTCA, setWTCA] = useState();
    const [review, setReview] = useState();
    const [allDone, setAllDone] = useState(false);

    useEffect(() => {
        
        course !== undefined &&
        quality !== undefined &&
        difficulty !== undefined &&
        WTCA !== undefined &&
        review !== undefined &&
        review !== ""?
        setAllDone(true): setAllDone(false);
    },[course, quality, difficulty, WTCA, review])




    const checkSelected = (value, selected) => {
        switch (value) {
            case 'course':
                return setCourse(selected);
            case 'quality':
                return setQuality(selected);
            case 'difficulty':
                return setDifficulty(selected);
            case 'WTCA':
                return setWTCA(selected);
            case 'review':
                return setReview(selected);
            default:
                break;
        }
    }

    const params = useParams();
    const profId = params.id;

    const navigate = useNavigate();
    const handleClick = () => {
        if(allDone) {
            console.log('button clicked');
            navigate(`/search/${profId}`);
        } else {
            console.log("not choosed all required yet");
        }
        
    }


    return (
        <Stack gap={4}>
            {
                questions.map(i => (
                    <QuestionBox key={i.id} question={i} checkSelected={checkSelected} />
                ))
            }
            <QuestionBox question={TOS} handleClick={handleClick} allDone={allDone}/>
        </Stack>
    )
}

export default RateProf;