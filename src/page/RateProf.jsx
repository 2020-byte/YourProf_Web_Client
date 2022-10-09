import React, { useState } from 'react';
import { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionBox from '../components/QuestionBox/QuestionBox';
import questions from '../data/question.json';
import useOnError from '../hook/useOnError';
import grades from '../data/grades.json';

const TOS = {
    'value': 'tos',
    'type' : 'text',
    'question':
    `By clicking the "Submit" button, I acknowledge that I have read and agreed to the Rate My Professors Site Guidelines, 
    Terms of Use and Privacy Policy. Submitted data becomes the property of RateMyProfessors.com. IP addresses are logged.`
}

const RateProf = ({dataService}) => {

    const params = useParams();
    const profId = params.profId;

    const [error, onError] = useOnError('');

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        dataService
        .getProfInfo(profId)
        .then((profInfo) => {
            setCourses([...profInfo.courses]);
        })
        .catch(onError);
    
    }, [dataService, profId]);



    const [course, setCourse] = useState();
    const [quality, setQuality] = useState();
    const [difficulty, setDifficulty] = useState();
    const [WTCA, setWTCA] = useState();
    const [TFC, setTFC] = useState();
    const [textbook, setTextbook] = useState();
    const [attendance, setAttendance] = useState();
    const [grade, setGrade] = useState();
    const [review, setReview] = useState();



    const [allDone, setAllDone] = useState(false);


    //WTCA 선택안해도 되도록 DB에 설정되어있음. 이거 설정하기.
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
            case 'TFC':
                return setTFC(selected);
            case 'textbook':
                return setTextbook(selected);
            case 'attendance':
                return setAttendance(selected);
            case 'grade':
                return setGrade(selected);
            case 'review':
                return setReview(selected);
            default:
                break;
        }
    }


    const navigate = useNavigate();
    const handleClick = () => {
        //requried를 쓰는 게 맞을까?
        if(!allDone) {
            console.log("not choosed all required yet");
            return
        } 

        console.log('button clicked');
        const ratingInfo = {
            courseId: parseInt(course), 
            quality: parseInt(quality), 
            difficulty: parseInt(difficulty),
            WTCA: parseInt(WTCA),
            TFC: parseInt(TFC),
            textbook: parseInt(textbook),
            attendance: parseInt(attendance),
            gradeId: parseInt(grade),
            review,
            profId: parseInt(profId),
        }
        console.log(ratingInfo);
        dataService
        .postRating(ratingInfo)
        .then()
        .catch(onError);
        navigate(-1);
        
    }


    return (
        <Stack gap={4}>
            {
                questions.map(i => (
                    <QuestionBox 
                    key={i.id} 
                    question={i} 
                    checkSelected={checkSelected}
                    select={i.value==="course"? courses: i.value==="grade"? grades: undefined}
                    />
                ))
            }
            <QuestionBox question={TOS} handleClick={handleClick} allDone={allDone}/>
        </Stack>
    )
}

export default RateProf;