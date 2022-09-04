import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import InfoBox from '../components/InfoBox/InfoBox';
import SelectBox from '../components/SelectBox.jsx/SelectBox';
import profItems from '../data/profItems.json';
import ratingItems from '../data/ratingItems.json';
import profCourseItems from '../data/profCourseItems.json';
import RatingItem from '../components/RantingItem/RatingItem';

const filterItembyId = (items, Id) => {
    return items.filter(i => i.profId == Id);
}

const Prof = (props) => {

    const params = useParams();
    const profId = params.id;

    const prof = profItems.find(i => i.id == profId);


    const courses = filterItembyId(profCourseItems, profId);
    // 현재 교수의 과목들

    const [course, setCourse] = useState();
    const handleSelect = (course) => {
        setCourse(course);
        // 현재 과목 카테고리
    }

    const ratings = filterItembyId(ratingItems, profId);
    // 현재 교수의 레이팅들
    

    const [filteredRatings, setFilteredRatings] = useState(ratings);
    //초기값 안넣어주면 제일 처음 렌더할 때 렌더 안됨.

    //이건 그 다음 course가 바뀔 때마다 filteredRatings을 바꿔 주는 것.
    useEffect(() => {
        course === "any" || course === undefined? setFilteredRatings(ratings):
        setFilteredRatings(ratings.filter(i => i.courseId == courses.find(i => i.name === course).id));
        // id == 'id'
    }, [course]);


    


    

    return (
        <div>
            <InfoBox item={prof}/>
            <div>
                <div>7 Student Ratings</div>
            </div>
            <div>
                <SelectBox 
                name="course" 
                id="course-select" 
                items={courses}
                handleSelect={handleSelect}
                selectedValue={course}
                />
            </div>
            <div>
                {filteredRatings.map(i => (
                    <RatingItem key={i.id} item={i}/>
                ))}
            </div>
        </div>
        
    )
}

export default Prof;