import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import client from '../utils/client';
import { useRouter } from 'next/router';

export default function Career(props) {
    const { classes } = props;
    const { locale } = useRouter();
    const { t } = useTranslation('common');
    const [state, setState] = useState({
        career: [],
        error: '',
        loading: true,
    })
    const { loading, error, career } = state
    const [educations, setEducations] = useState([])
    const [experiences, setExperiences] = useState([])
    const [competitions, setCompetitions] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await client.fetch(`*[_type == "career"] | order(order asc)`)
            setState({career: res, loading: false})
          } catch (error) {
            setState({error: error.message, loading: false})
          }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (career?.length > 0) {
            const educations = career.filter(item => item.type === 'education')
            const experiences = career.filter(item => item.type === 'experience')
            const competitions = career.filter(item => item.type === 'competition')
            setEducations(educations)
            setExperiences(experiences)
            setCompetitions(competitions)
        } else {
            setEducations([])
            setExperiences([])
            setCompetitions([])
        }
    }, [career])
    return (
        <section id="career" className="career_container">
            {
                loading ? <p>Loading...</p>
                : error ? <p>{error}</p>
                : (
                    <>
                        <div className='education_container' data-aos="fade-right" data-aos-duration="1000">
                            <h2>{t("education")}</h2>
                            {
                                educations?.map(education => (
                                    <div key={education._id} className="education_item">
                                        <div className="education_image">
                                            <Image src={`/images/career/${education.image_name}.png`} alt={education.title} layout="fill" objectFit='contain' />
                                        </div>
                                        <div className="education_content">
                                            <h3>{education.title[locale]}</h3>
                                            {(education.start_date || education.end_date) && <p> {education.start_date} {!education.end_date ? "" : "-"} {education.end_date} </p>}
                                            {education.description && <p>{education.description[locale]}</p>}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='experience_container' data-aos="fade-up" data-aos-duration="1000">
                            <h2>{t("experience")}</h2>
                            {
                                experiences?.map(experience => (
                                    <div key={experience._id} className="experience_item">
                                        <div className="experience_image">
                                            <Image src={`/images/career/${experience.image_name}.png`} alt={experience.title} layout="fill" objectFit='contain' />
                                        </div>
                                        <div className="experience_content">
                                            <h3>{locale && experience.title[locale]}</h3>
                                            {(experience.start_date || experience.end_date) && <p> {experience.start_date} - {experience.end_date} </p>}
                                            <p>{locale && experience.description[locale]}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='competition_container' data-aos="fade-left" data-aos-duration="1000">
                            <h2>{t("competition")}</h2>
                            {
                                competitions?.map(competition => (
                                    <div key={competition._id} className="competition_item">
                                        <div className="competition_image">
                                            <Image src={`/images/career/${competition.image_name}.png`} alt={competition.title} layout="fill" objectFit='contain' />
                                        </div>
                                        <div className="competition_content">
                                            <h3>{locale && competition.title[locale]}</h3>
                                            {(competition.start_date || competition.end_date) && <p> {competition.start_date} - {competition.end_date} </p>}
                                            <p>{locale && competition.description[locale] && competition.description[locale]}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )
            }
        </section>
    )
}
