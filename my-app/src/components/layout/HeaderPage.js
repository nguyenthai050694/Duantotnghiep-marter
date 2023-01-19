import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';

const items = [

    {
        src: 'https://c1img.onlinefriday.vn/tmp/09_2018/b/47/9/1860523680_1537936493.png',
        altText: '',
        caption: '',
        key: 1,
    },
    {
        src: 'https://sport5.mediacdn.vn/158855217956261888/2021/3/11/converse-x-chinatown-x-nba-11-1-1615448780095340646179.jpg',
        altText: '',
        caption: '',
        key: 2,
    },
    {
        src: 'https://cdn.tgdd.vn/2022/10/banner/1200x400-1200x400-1.jpg',
        altText: '',
        caption: '',
        key: 3,
    },
    {
        src: 'https://sport5.mediacdn.vn/158855217956261888/2021/3/11/converse-x-chinatown-x-nba-11-1-1615448780095340646179.jpg',
        altText: '',
        caption: '',
        key: 4,
    },
];

function Example(args) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.key}
            >
                <img src={item.src} alt={item.altText} style={{ width: '100%', height: '100%' }} />
                <CarouselCaption
                    captionText={item.caption}
                    captionHeader={item.caption}
                />
            </CarouselItem>
        );
    });

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            {...args}
        >
            <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}

            />
            {slides}
            <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
            />
            <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
            />
        </Carousel>
    );
}

export default Example;