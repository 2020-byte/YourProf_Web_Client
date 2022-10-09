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
    const paramCourseId = params.courseId;
    
    const [error, onError] = useOnError('');

    const [profInfo, setProfInfo] = useState();
    
    const [courses, setCourses] = useState([]);

    const [ratings, setRatings] = useState([]);

    const [courseId, setCourseId] = useState();

    const handleSelect = (courseId) => {
        navigate(`/profs/${profId}/courses/${courseId}`);
    }

    //페이지 바뀔 때마다 paramCourseId없으면
    //profInfo불러오면 default하게 다불러오고
    //paramCourseId있으면 원래 courses제외하고 profInfo는 본래꺼 쓰고
    //course만 따로 가져오는 거. (paramCurseId로 courseId바꿔서)
    useEffect(() => {
        if(paramCourseId) {
            setCourseId(paramCourseId);
            return;
        }

        setCourseId(0); 
        //select Id랑 연관되어 있기 때문에 setCourseId 설정하고
        //course따로 불러올 때, paramCourseId없으면 따로 안불러오게 설정해서 이중으로 불러오는 거 막으면 됨.

        dataService
        .getProfInfo(profId)
        .then((profInfo) => {
            setProfInfo(profInfo.prof);
            setCourses([...profInfo.courses]);
            setRatings([...profInfo.ratings]);
        })
        .catch(onError);
    
    }, [dataService, profId, paramCourseId]);


    //paramCourseId 없으면 profInfo로 default하게 course불러 올꺼기 때문에
    //paramCourseId없는 경우는 course 따로 안불러옴.
    useEffect(() => {
        if(!paramCourseId) return;
        dataService
        .getRatingsbyProfIdwithCourseId(profId, courseId)
        .then((ratings) => {
            setRatings([...ratings]);
        })
        .catch(onError);
    }, [dataService, courseId])


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