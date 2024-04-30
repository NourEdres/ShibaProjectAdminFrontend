import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import './TaskDetails.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { MediaTask } from '../../../../redux/models/Interfaces';
import { SwiperConfig } from '../../../components';
import { LeftArrowIcon } from '../../../photos';
const TaskDetailsHebrew = {
    Description: "תיאור : ",
    FreeText: "טקסט חופשי :",
    Q: "שאלה : ",
    Media: "מדיה :",
    answers: "תשובות :"
};
const TaskDetails: React.FC = () => {
    const task = useSelector((state: RootState) => state.globalStates.selectedCard);

    return (
        <div className='task-container' dir='rtl' style={{ background: "#E9C46A" }}>
            <div className='add-task-header'>
                <div className='sector-name'>פיזוטרפיה</div>
                <div className='arrow-icon'><img className='arrow-icon' src={LeftArrowIcon} alt="arrow" /></div>
            </div>
            <div className='task-details'>
                <div className='task-title'>{task.name}</div>
                {task.description &&
                    < div className='section-title'>{TaskDetailsHebrew.Description}</div> &&
                    <div className='task-desc'>{task.description}</div>}
                <div className='task-content'>
                    {task.taskFreeTexts.length > 0 &&
                        <div className='task-free-text'>
                            < div className='section-title'>{TaskDetailsHebrew.FreeText}</div>
                            {task.taskFreeTexts.map((text: string, index: number) => <div className='text-free' key={index}>{text}</div>)}
                        </div>}
                    <div className='task-ques'>
                        {task.questionTask && (
                            <div className='question-section'>
                                <div className='q-head'>
                                    <div className='section-title'>{TaskDetailsHebrew.Q}</div>
                                    <div className='q-task-text'>{task.questionTask.question}</div>
                                </div>
                                < div className='section-title'>{TaskDetailsHebrew.answers}</div>
                                <div className='answers'>
                                    {task.questionTask.answers.map((answer: string, index: number) => (
                                        <div key={index} className={index === task.questionTask.correctAnswer ? 'correct-answer' : ''}>
                                            {answer}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='task-media-list'>
                        <div className='section-title'>{TaskDetailsHebrew.Media}</div>
                        <Swiper {...SwiperConfig("horizontal")}>
                            {task.mediaList.map((media: MediaTask, index: number) => (
                                <SwiperSlide key={media.mediaTaskID} className='swiper-slide'>
                                    <img className='img-media'
                                        src={
                                            media.mediaPath.replace("/Users/malakyehia/admin_system/ShibaProjectAdminFrontend", '../../..')
                                        }
                                        alt={media.fileName}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default TaskDetails;
