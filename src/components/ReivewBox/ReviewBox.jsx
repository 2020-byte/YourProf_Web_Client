import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

import styles from './ReviewBox.module.css';

const ReviewBox = ({name, handleSelect, initialValue}) => {

    const [textValue, setTextValue] = useState(initialValue?initialValue: "");
    const handleSetValue = (e) => {
        setTextValue(e.target.value);
        handleSelect(e.target.value);
    };

    return (
        <div className={styles.body}>
            <p>Discuss the professor's professional abilities including teaching style and ability to convey the material clearly</p>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Guidelines</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li>
                                Your rating could be removed if you use profanity or derogatory terms.
                            </li>
                            <li>
                                Don't claim that the professor shows bias or favoritism for or against students.
                            </li>
                            <li>
                                Don’t forget to proof read!
                            </li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={10} 
                placeholder="What do you want other students to know about this professor?"
                value={textValue}
                onChange={(e) => handleSetValue(e)}>

                </Form.Control>
                <div style={{marginLeft:'80%', marginTop: '1rem'}}>0 / maxwordnum</div>
            </Form.Group>
            </Form>
        </div>

    )
}

export default ReviewBox;