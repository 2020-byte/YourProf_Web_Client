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
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContent';

const Profile = (props) => {


    const navigate = useNavigate();


    const user = users.find(i => i.id == 1);
    const [info, setInfo] = useState(
        [
            {
                id: "1",
                numItem: user.reviews.length,
                title: "My Reviews",
                value: "reviews"
            },
            {
                id: "2",
                numItem: user.upVotes.length,
                title: "My Likes",
                value: "likes"
            },
            {
                id: "3",
                numItem: user.downVotes.length,
                title: "My DisLikes",
                value: "dislikes"
            }
        ]
    )

    const [curItemId, setCurItemId] = useState("1");
    const handleClick = (id) => {
        setCurItemId(id);
        navigate(`/account/profile/${info[id-1].value}`);
    }

    const [items, setItems] = useState(ratingItems.filter(i => user.reviews.includes(i.id)))
    
    //TODO: filterItems만들어서 department나 course 선택할 때마다 filter된 item이 나올 수 있도록 해야함.


    //TODO: departments도 user가 가진 item에 따라 변경되고 제한되게 setDepartments도 유동적으로 설정되도록,
    // 데이터베이스를 작성하자.
    const [departments, setDepartments] = useState(depItems);
    const [department, setDepartment] = useState();
    const handleSelectDep = (dep) => {
        setDepartment(dep);
    }

    const [courses, setCourses] = useState(profCourseItems.filter(i => items.map(i => i.courseId).includes(`${i.id}`)));

    useEffect(() => {
        const valueName = info.find(i => i.id == curItemId).value;
        setItems(ratingItems.filter(i => user[valueName].includes(i.id)));
    }, [curItemId]);

    useEffect(() => {
        setDepartments(depItems);
        setCourses(profCourseItems.filter(i => items.map(i => i.courseId).includes(`${i.id}`)))
    }, [items])

    const [course, setCourse] = useState();
    const handleSelectCourse = (course) => {
        setCourse(course);
        // 현재 과목 카테고리
    }


    return (
        <div>
            <ProfileBox user={user}/>
            <SearchTab info={info} handleClick={handleClick}/>
            <SelectBox 
            name="department" 
            id="department-select" 
            items={departments}
            handleSelect={handleSelectDep}
            selectedValue={department}
            />
            <SelectBox 
            name="course" 
            id="course-select" 
            items={courses}
            handleSelect={handleSelectCourse}
            selectedValue={course}
            />
            {/* <Stack gap={4}>
                {items.map(item => (
                    <RatingItem key={item.id} item={item} course={profCourseItems.find(i => i.id == item.courseId)}/>
                ))}
            </Stack> */}
        </div>
    )
}

export default Profile;