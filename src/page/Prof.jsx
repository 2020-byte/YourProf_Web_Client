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
    
    const [error, setError] = useState('');
    const [onError] = useOnError('');

    const [profInfo, setProfInfo] = useState();
    
    const [courses, setCourses] = useState([]);

    const [ratings, setRatings] = useState([]);

    const [courseId, setCourseId] = useState();

    const handleSelect = (courseId) => {
        navigate(`/profs/${profId}/courses/${courseId}`);
    }


    //GET profInfo, Courses, Ratings

    //제일 처음 불러올 때 paramCourseId없고
    //profInfo불러오면 default하게 ratings 다 불러오고
    //paramCourseId있으면 이걸로 courseId set(설정)하고
    //이 courseId를 가지는 ratings만 새로 가져오는 것.

    //(intial value) paramCourseId 없을 때.
    useEffect(() => {

        setCourseId(); 
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
    
    }, [dataService, profId]);

    //paramCourseId 있을 때.
    useEffect(() => {
        setCourseId(paramCourseId);
    }, [paramCourseId]);

    //이렇게 2큐에 가는 이유가 select 카테고리 바꾸고 그 이후에 ratings불러오는 거임
    //하고 싶은면 1큐에 paramCourseId 이용해서 select 카테고리 바꾸는 동시에
    //ratings도 paramCourseId 이용해서 따로 불러오면 됨.
    useEffect(() => {
        if(!paramCourseId) return;
        dataService
        .getRatingsbyProfIdwithCourseId(profId, courseId)
        .then((ratings) => {
            setRatings([...ratings]);
        })
        .catch(onError);
    }, [dataService, courseId])



    //DELETE Rating
    const onDelete = (ratingId) => {
        // console.log(ratingId);
        // return;
        dataService
        .deleteRating(profId, ratingId)
        .then(() => setRatings(ratings.filter(rating =>  rating.id != ratingId)))
        //이거 client에서 혼자서 이전에 받아온 배열을 setRatings으로 설정한 
        //ratings에서 일단 삭제된 특정 rating을 
        //setRatings(ratings.filter(rating =>  rating.id != ratingId))을 이용해서
        //없앤 새로운 rating을 보여주는 거임.
        //특정 rating이 삭제된 배열을 db에서 불러와서 그걸 setRatings해서 보여주는 게 아니라.
        .catch((error) => setError(error.toString()));
    }
    


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
                    <RatingItem 
                    key={item.id} 
                    item={item} 
                    course={courses.find(i => i.id == item.courseId)}
                    onDelete={onDelete}
                    />
                ))}
            </Stack>
        </div>
        
    )
}

export default Prof;