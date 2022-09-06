import React, { useState } from 'react';
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


    return (
        <div className={styles.body}>
            <div className={styles.question}>{question.question}</div>
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
            </div>
        </div>
    )
}

export default QuestionBox;