import React from 'react';
import { Stack } from 'react-bootstrap';
import QuestionBox from '../components/QuestionBox/QuestionBox';
import questions from '../data/question.json';

const RateProf = (props) => {


    return (
        <Stack gap={4}>
            {
                questions.map(i => (
                    <QuestionBox key={i.id} question={i} />
                ))
            }
        </Stack>
    )
}

export default RateProf;