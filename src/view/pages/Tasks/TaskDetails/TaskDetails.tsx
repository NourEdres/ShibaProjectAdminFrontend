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
const TaskDetails: React.FC = () => {
    const task = useSelector((state: RootState) => state.globalStates.selectedCard);

    return (
        <div className='task-container' dir='rtl'>
            <div className='task-title'>{task.name}</div>
            <div className='task-details'>
                <div className='task-desc'>{task.description}</div>
            </div>
            <div className='task-content'>
                <div className='task-free-text'>
                    {task.taskFreeTexts && task.taskFreeTexts.map((text: string, index: number) => <p key={index}>{text}</p>)}
                </div>
                <div className='task-ques'>
                    {task.questionTask && (
                        <div className='question-section'>
                            <h2>{task.questionTask.question}</h2>
                            <div>
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
                    <Swiper {...SwiperConfig("horizontal")}>
                        {task.mediaList.map((media: MediaTask, index: number) => (
                            <SwiperSlide key={media.mediaTaskID} className='swiper-slide'>
                                <img
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
    );
};

export default TaskDetails;
