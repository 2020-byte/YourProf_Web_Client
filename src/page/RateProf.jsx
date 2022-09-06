import React from 'react';
import { Stack } from 'react-bootstrap';
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


    return (
        <Stack gap={4}>
            {
                questions.map(i => (
                    <QuestionBox key={i.id} question={i} />
                ))
            }
            <QuestionBox question={TOS} />
        </Stack>
    )
}

export default RateProf;