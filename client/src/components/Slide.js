import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import StartupCard from './StartupCard';
import InvestorCard from './InvestorCard';
import Loader from "../components/Loader";

const Slide = () => {
    const handleSlideChange = (e) => {
        if (clicked) return;
        const direction = e.touches.startX > e.touches.currentX ? 'left' : 'right';
        const id = e.slides[e.previousIndex].querySelector('.smcard').id;
        handleSwipe(direction, id);
    }

    const [loading, setLoading] = useState(true);

    const [startups, setStartups] = useState([]);
    const [investors, setInvestors] = useState([]);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:4000/user/cards", { withCredentials: true })
            .then((res) => {
                const { data } = res;
                if (data && data.success) {
                    if (data.role === 'startup') {
                        //randomize the cards
                        data.cards = data.cards.sort(() => Math.random() - 0.5);
                        setInvestors(data.cards);
                    }
                    else {
                        //randomize the cards
                        data.cards = data.cards.sort(() => Math.random() - 0.5);
                        setStartups(data.cards);
                    }

                    setLoading(false);
                }
            })
            .catch((err) => {
                toast.error(err.message, {
                    position: "bottom-left"
                });
            });
    }, []);

    const handleNavLeft = (swiper) => {
        setClicked(true);
        let direction = 'left';
        let id = swiper.slides[swiper.previousIndex].querySelector('.smcard').id;
        handleSwipe(direction, id);
    }

    const handleNavRight = (swiper) => {
        setClicked(true);
        let direction = 'right';
        let id = swiper.slides[swiper.previousIndex].querySelector('.smcard').id;
        handleSwipe(direction, id);
    }

    const handleSwipe = (direction, id) => {
        if (direction === 'right') {
            axios.get(`http://localhost:4000/user/like/${id}`, { withCredentials: true })
                .then((res) => {
                    const { data } = res;
                    if (data && data.success) {
                        toast.success(data.message, {
                            position: "bottom-right"
                        });
                    }
                    else {
                        toast.error(data.message, {
                            position: "bottom-left"
                        });
                    }
                    setClicked(false);
                })
                .catch((err) => {
                    toast.error(err.message, {
                        position: "bottom-left"
                    });
                });
        }
    }

    if (loading) {
        return (
            <Loader />
        );
    }

    return (
        <>
            {startups && startups.length !== 0 ?
                <>
                    <Heading as="h1" size="lg" mb={6}>
                        Startup Matchmaker: Find Your Perfect Business Match!
                    </Heading>
                    <Text fontSize="lg" mb={6}>
                        Swipe right on the startups you like and left on the ones you don't.
                    </Text>
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        spaceBetween={50}
                        slidesPerView={1}
                        onNavigationNext={handleNavRight}
                        onNavigationPrev={handleNavLeft}
                        loop={true}
                        onSlideChangeTransitionEnd={handleSlideChange}
                    >
                        {startups.map((startup) => {
                            return (
                                <SwiperSlide key={startup._id}>
                                    <StartupCard startup={startup} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper >
                </>

                :

                <></>
            }

            {investors && investors.length !== 0 ?
                <>
                    <Heading as="h1" size="lg" mb={6}>
                        Investor Matchmaker: Find Your Perfect Business Match!
                    </Heading>
                    <Text fontSize="lg" mb={6}>
                        Swipe right on the investors you like and left on the ones you don't.
                    </Text>

                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        spaceBetween={50}
                        slidesPerView={1}
                        onNavigationNext={handleNavRight}
                        onNavigationPrev={handleNavLeft}
                        loop={true}
                        onSlideChangeTransitionEnd={handleSlideChange}
                    >
                        {investors.map((investor) => {
                            return (
                                <SwiperSlide key={investor._id}>
                                    <InvestorCard investor={investor} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper >
                </>
                :
                <></>
            }

            {
                startups && startups.length === 0 && investors && investors.length === 0 ?
                    <>
                        <Heading as="h1" size="lg" mt={6}>
                            There are currently no startups or investors that match your interests, please check back later!
                        </Heading>
                    </>
                    :
                    <>
                    </>
            }
        </>

    );
}

export default Slide;