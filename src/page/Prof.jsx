import React, { useRef } from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import InfoBox from '../components/InfoBox/InfoBox';
import SelectBox from '../components/SelectBox.jsx/SelectBox';
import profItems from '../data/profItems.json';
import ratingItems from '../data/ratingItems.json';
import profCourseItems from '../data/profCourseItems.json';
import RatingItem from '../components/RantingItem/RatingItem';
import SearchTab from '../components/SearchTab/SearchTab';
import useOnError from '../hook/useOnError';

// const filterItembyId = (items, Id) => {
//     return items.filter(i => i.profId == Id);
// }

const Prof = ({dataService}) => {

    const navigate = useNavigate();
    const params = useParams();
    const profId = params.profId;

    const prof = profItems.find(i => i.id == profId);
    
    const [error, onError] = useOnError('');

    const [profInfo, setProfInfo] = useState();
    
    const [courses, setCourses] = useState([]);

    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        dataService
        .getProfInfo(profId)
        .then((profInfo) => {
            setProfInfo(profInfo.prof);
            setCourses([...profInfo.courses]);
            setRatings([...profInfo.ratings]);
        })
        .catch(onError);
    
    }, [dataService, profId]);



    // const courses = filterItembyId(profCourseItems, profId);
    // // 현재 교수의 과목들

    const [courseId, setCourseId] = useState();
    const handleSelect = (courseId) => {
        navigate(`/profs/${profId}/courses/${courseId}`);
        setCourseId(courseId);
        // 현재 과목 카테고리
    }

    useEffect(() => {
        dataService
        .getRatingsbyProfIdwithCourseId(profId, courseId)
        .then((ratings) => {
            setRatings([...ratings]);
        })
        .catch(onError);
    }, [dataService, courseId])


    // const ratings = filterItembyId(ratingItems, profId);
    // // 현재 교수의 레이팅들
    

    // const [filteredRatings, setFilteredRatings] = useState(ratings);
    //초기값 안넣어주면 제일 처음 렌더할 때 렌더 안됨.

    // //이건 그 다음 course가 바뀔 때마다 filteredRatings을 바꿔 주는 것.
    // useEffect(() => {
    //     course === "any" || course === undefined? setFilteredRatings(ratings):
    //     setFilteredRatings(ratings.filter(i => i.courseId == courses.find(i => i.name === course).id));
    //     // id == 'id'
    //     // 나중에 JOIN으로 데이터베이스에서 바로 갖고 올 수 있도록
    //     // 일단 prof으로 필터된 ratings을 가져오고 그걸 courses랑 JOIN하고
    //     // course name 갖는 걸 불러오는 것(원래 id로 불러와야 맞는 것 같긴 한데)
    // }, [course]);


    


    return (
        <div>
            {profInfo && <InfoBox item={profInfo} />}
            <div>
                <SearchTab 
                info={[
                    {
                        id: "1",
                        numItem: ratings.length,
                        title: "Student Ratings",
                        value: "rating"
                    }
                ]}/>
            </div>
            <div>
                <SelectBox 
                name="course" 
                id="course-select" 
                items={courses}
                handleSelect={handleSelect}
                selectedValue={courseId}
                />
            </div>
            <Stack gap={4}>
                {ratings.map(item => (
                    <RatingItem key={item.id} item={item} course={courses.find(i => i.id == item.courseId)}/>
                ))}
            </Stack>
        </div>
        
    )
}

export default Prof;