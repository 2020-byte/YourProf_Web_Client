import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import courses from '../../data/profCourseItems.json';
import grades from '../../data/grades.json';
import SelectBox from '../SelectBox.jsx/SelectBox';
import styles from './QuestionBox.module.css';
import { useParams } from 'react-router-dom';
import RateBox from '../RateBox/RateBox';
import RadioItem from '../RadioItem/RadioItem';
import ReviewBox from '../ReivewBox/ReviewBox';

const QuestionBox = ({question}) => {

    const params = useParams();
    const profId = params.id;

    const selectItems = 
        question.value === "course" ? courses.filter(i => i.profId == profId):
        question.value === "grade" ? grades:
        undefined;


    const [selected, setSelected] = useState();

    const handleSelect = (selected) => {
        setSelected(selected);
    }

    const allSet = true;

    const unbuttonStyle = {
        backgroundColor: '#EDEDED',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;',
        border: 'grey',
        color: '#A4A3A3'
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
                        setLabel={false}
                        setWidth="100%"
                        />
                    </div>
                }
                {
                    question.type === 'rate' &&
                    <div>
                        <RateBox />
                    </div>
                }
                {
                    question.type === 'radio' &&
                    <RadioItem name={question.value} />
                }
                {
                    question.type === 'textarea' &&
                    <ReviewBox name={question.value}/>
                }
                {
                    question.value === 'tos' &&
                    <div className={styles.submitBox}>
                        <p>
                            {question.question}
                        </p>
                        <Button style={ !allSet? unbuttonStyle: {}} className={styles.button}>Submit Rating</Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default QuestionBox;