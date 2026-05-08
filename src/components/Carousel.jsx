import { useState, useEffect, useCallback, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Message from "./Message.jsx";

const Carousel = ({
    slides=[],
    autoSlide = true,
    autoSlideInterval = 3000 },isLoading,isError) => {
        const [current, setCurrent] = useState(0);

        const intervalRef = useRef(null);
        const slidesCount = slides.length;

        const prevSlide = useCallback(
            () =>
                setCurrent((prev) => (prev === 0 ? slidesCount - 1 : prev - 1)),
            [slidesCount]
        );
        const nextSlide = useCallback(
            () =>
                setCurrent((prev) => (prev === slidesCount - 1 ? 0 : prev + 1)),
            [slidesCount]
        );

        // Auto Slide
        useEffect(() => {
            if (!autoSlide || slidesCount === 0) {
                clearInterval(intervalRef.current);
                return;
            }
            intervalRef.current = setInterval(nextSlide, autoSlideInterval);
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            };
        }, [autoSlide, autoSlideInterval, nextSlide, slidesCount]);

        // Pause auto-slide on hover
        const handleMouseEnter = useCallback(() => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }, []);

        const handleMouseLeave = useCallback(() => {
            if (autoSlide && !intervalRef.current) {
                intervalRef.current = setInterval(nextSlide, autoSlideInterval);
            }
        }, [autoSlide, autoSlideInterval, nextSlide]);

        if(slidesCount===0){

            return (
                    <div className="w-full h-[30vh] flex justify-center items-center bg-gray-500 rounded-md">
                        <Message type="info">No slides available</Message>
                    </div>
            )
        }

        if(isLoading) return <Loder type="info" />

        return (
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative w-[80vw] max-w-6xl mx-auto overflow-hidden rounded-xl shadow-lg h-[50vh]"
            >
                {/* Slides */}
                <div
                    className="flex transition-transform ease-out duration-500 h-full w-full"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {slides.map(slide => (
                        <img
                            key={slide._id}
                            src={slide.image}
                            alt={`slide-${slide.name}`}
                            className="flex flex-shrink-0 object-contain w-full pt-4"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
                >
                    <FaChevronLeft />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
                >
                    <FaChevronRight />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                current === idx ? "bg-white" : "bg-gray-400"
                            }`}
                        />
                    ))}
                </div>
            </div>
        );
    };

export default Carousel;
