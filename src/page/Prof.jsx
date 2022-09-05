import React from 'react';
import { Stack } from 'react-bootstrap';
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
        // 나중에 JOIN으로 데이터베이스에서 바로 갖고 올 수 있도록
        // 일단 prof으로 필터된 ratings을 가져오고 그걸 courses랑 JOIN하고
        // course name 갖는 걸 불러오는 것(원래 id로 불러와야 맞는 것 같긴 한데)
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
            <Stack gap={3}>
                {filteredRatings.map(item => (
                    <RatingItem key={item.id} item={item} course={profCourseItems.find(i => i.id == item.courseId)}/>
                ))}
            </Stack>
        </div>
        
    )
}

export default Prof;