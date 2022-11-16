import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import courses from '../../data/profCourseItems.json';
import grades from '../../data/grades.json';
import SelectBox from '../SelectBox.jsx/SelectBox';
import styles from './QuestionBox.module.css';
import RateBox from '../RateBox/RateBox';
import RadioItem from '../RadioItem/RadioItem';
import ReviewBox from '../ReivewBox/ReviewBox';
import { useParams, useSearchParams } from 'react-router-dom';

const unbuttonStyle = {
    backgroundColor: '#EDEDED',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
    border: 'grey',
    color: '#A4A3A3'
}


const QuestionBox = ({question, handleClick, checkSelected, select, allDone, ratingInfo}) => {



    //TODO:데이터 가져오는데서 다 클라이언트에서 로딩 창 돌아가게 하는 거 만들기.
    const selectItems = select && question.type === "select" ? select:undefined;

    const init = ratingInfo && question.value !== "tos" &&
    ratingInfo[`${
        question.value === "course"? "courseId":
        question.value === "grade"? "gradeId": 
        question.value
    }`];
    const initData = 
    init == null && init == undefined? init: 
    init === true? "1":
    init === false? "0":
    init.toString();

    const [selected, setSelected] = useState(initData);



    useEffect(() => {
        
        // if(
        //     question.value ==='course' ||
        //     question.value === 'quality' ||
        //     question.value === 'difficulty' ||
        //     question.value === "WTCA" ||
        //     question.value === "review"
        // ) {
        //     checkSelected && checkSelected(question.value, selected);
        // }
        checkSelected && checkSelected(question.value, selected);
    }, [selected])



    const handleSelect = (selected) => {
        setSelected(selected);
    }

    


    
    return (
        <div className={styles.body}>
            <div className={styles.question}>{question.value !== 'tos' && question.question}</div>
                <div className={styles.answerBox}>
                {
                    question.type === 'select' &&
                    <div>
                        <SelectBox 
                        name={question.value} 
                        id={`${question.value}-select`} 
                        items={selectItems}
                        handleSelect={handleSelect}
                        selectedValue={selected}
                        setAll={false}
                        setNA={question.value == "grade"? false: undefined}
                        setLabel={false}
                        setWidth="100%"
                        />
                    </div>
                }
                {
                    question.type === 'rate' &&
                    <div>
                        <RateBox question={question} handleSelect={handleSelect} initialValue={selected}/>
                    </div>
                }
                {
                    question.type === 'radio' &&
                    <div>
                        <RadioItem name={question.value} handleSelect={handleSelect} initialValue={selected}/>
                    </div>
                }
                {
                    question.type === 'textarea' &&
                    <ReviewBox name={question.value} handleSelect={handleSelect} initialValue={selected}/>
                }
                {
                    question.value === 'tos' &&
                    <div className={styles.submitBox}>
                        <p>
                            {question.question}
                        </p>
                        <Button 
                            style={!allDone? unbuttonStyle: {}} 
                            className={styles.button} 
                            onClick={handleClick}>
                            Submit Rating
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default QuestionBox;