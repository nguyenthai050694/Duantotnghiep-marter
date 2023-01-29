import React, { useState } from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import '../css/box.scss'

interface BoxIfoProps {
    title: string,
    content: string,
    color: 'green' | 'yellow' | 'red' | 'blue',
    percen: number
}
export default function BoxInfo(props: BoxIfoProps) {

    return (
        <div className={`box-info box-info-${props.color}`}>
            <div className='box-info-title'>
                {props.title}
            </div>
            <div className='box-info-content'>
                {props.content}
            </div>
            <div className='box-info-icon'>
                {props.percen >= 0 && <div className='icon-up'>
                    <BsArrowUp /> {props.percen}%
                </div>}
                {props.percen < 0 && <div className='icon-down'>
                    <BsArrowDown /> {props.percen}%
                </div>}
            </div>
        </div >
    )
}