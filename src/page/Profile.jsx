import React, { useState } from 'react';
import { useEffect } from 'react';
import ProfileBox from '../components/ProfileBox/ProfileBox';
import SearchTab from '../components/SearchTab/SearchTab';
import SelectBox from '../components/SelectBox.jsx/SelectBox';
import users from '../data/users.json';
import depItems from '../data/depItems.json';
import ratingItems from '../data/ratingItems.json';
import profCourseItems from '../data/profCourseItems.json';
import RatingItem from '../components/RantingItem/RatingItem';
import { Stack } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useOnError from '../hook/useOnError';
import { useAuth } from '../context/AuthContent';

const Profile = ({accountService, dataService}) => {

    


    const navigate = useNavigate();
    //const {user} = useAuth();   //iterator {} not []
    const [error, onError] = useOnError('');
    const locationHook = useLocation();
    const params = useParams();

    

    

    const [info, setInfo] = useState(
        [
            {
                id: "1",
                numItem: 3,//userInfo.reviews.length,
                title: "My Reviews",
                value: "reviews"
            },
            {
                id: "2",
                numItem: 2,//userInfo.upVotes.length,
                title: "My Likes",
                value: "likes"
            },
            {
                id: "3",
                numItem: 2,//userInfo.downVotes.length,
                title: "My DisLikes",
                value: "dislikes"
            }
        ]
    )

    const [curItemId, setCurItemId] = useState("1");
    const handleClick = (id) => {
        setCurItemId(id);
        const curItem = info.find(i => i.id == id);
        navigate(`/account/profile/${curItem.value}`);
    }

    useEffect(() => {
        const splitUrl = locationHook?.pathname?.split('/') ?? null;
        const location =
            splitUrl?.length > 1 ? splitUrl[3] : null;
        
        console.log(location);

        const curId = location === undefined? 1: info.find(i => i.value == location).id;
        console.log(curId);
        curItemId != curId && setCurItemId(curId);

    }, [locationHook]);

    
    //TODO: filterItems만들어서 department나 course 선택할 때마다 filter된 item이 나올 수 있도록 해야함.


    //TODO: departments도 user가 가진 item에 따라 변경되고 제한되게 setDepartments도 유동적으로 설정되도록,
    // 데이터베이스를 작성하자.
    const [departments, setDepartments] = useState(depItems);
    

    const [department, setDepartment] = useState();
    useEffect(() => {
        setDepartment(params.departmentId);
    }, [params]);


    const handleSelectDep = (dep) => {
        setDepartment(dep);
        navigate(`/account/profile/${info.find(i => i.id == curItemId).value}/${dep}`);
    }


    const [userInfo, setUserInfo] = useState();
    const [reviews, setReviews] = useState();
    const [likedRatings, setLikedRatings] = useState();
    const [disLikedRatings, setDisLikedRatings] = useState();

    
    useEffect(() => {
        //TODO:카테고리 따른 거 일 땐 업데이트 안되게.
        dataService
        .getUserInfo()
        .then((userInfo) => setUserInfo(userInfo))
        .catch(onError);

        dataService
        .getUserRatings(department)
        .then((i) => setReviews(i))
        .catch(onError);
    }, [dataService, department]);
    // useEffect(() => {
    //     accountService
    //     .getUserInfo()
    //     .then((userInfo) => console.log(userInfo))
    //     .catch(onError);
    // }, [accountService]);

    useEffect(() => {
        dataService
        .getLikedRatings(department)
        .then((i) => setLikedRatings(i))
        .catch(onError);
    }, [dataService, department]);

    useEffect(() => {
        dataService
        .getDisLikedRatings(department)
        .then((i) => setDisLikedRatings(i))
        .catch(onError);
    }, [dataService, department]);













    // const [courses, setCourses] = useState(profCourseItems);

    // useEffect(() => {
    //     const valueName = info.find(i => i.id == curItemId).value;
    //     setItems();
    // }, [curItemId]);

    // useEffect(() => {
    //     setDepartments(depItems);
    //     setCourses(profCourseItems);
    // }, [items])

    // const [course, setCourse] = useState();
    // const handleSelectCourse = (course) => {
    //     setCourse(course);
    //     // 현재 과목 카테고리
    // }


    return (
        <div>
            {userInfo && <ProfileBox userInfo={userInfo}/>}
            <SearchTab info={info} handleClick={handleClick} selectedValue={curItemId} />
            <SelectBox 
            name="department" 
            id="department-select" 
            items={departments}
            handleSelect={handleSelectDep}
            selectedValue={department}
            />
            {/* <SelectBox 
            name="course" 
            id="course-select" 
            items={courses}
            handleSelect={handleSelectCourse}
            selectedValue={course}
            /> */}
            {
                info[curItemId-1].value == 'reviews' && reviews && 
                <Stack gap={4}>
                {reviews.map(item => (
                    <RatingItem key={item.id} item={item} course={profCourseItems.find(i => i.id == item.courseId)}/>
                ))}
                </Stack>
            }
            {
                info[curItemId-1].value == 'likes' && likedRatings && 
                <Stack gap={4}>
                {likedRatings.map(item => (
                    <RatingItem key={item.id} item={item} course={profCourseItems.find(i => i.id == item.courseId)}/>
                ))}
                </Stack>
            }
            {
                info[curItemId-1].value == 'dislikes' && disLikedRatings && 
                <Stack gap={4}>
                {disLikedRatings.map(item => (
                    <RatingItem key={item.id} item={item} course={profCourseItems.find(i => i.id == item.courseId)}/>
                ))}
                </Stack>
            }
        </div>
    )
}

export default Profile;