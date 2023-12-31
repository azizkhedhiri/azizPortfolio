import React from 'react'
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Intro(props) {
    const { classes } = props;
    const { locale } = useRouter();
    const { t } = useTranslation('common');
    return (
        <section id="intro" className={`intro_container ${locale}`}>
            <div className="intro_content" data-aos="fade-right" data-aos-duration="1200">
                <span>{t('job')}</span>
                <h1>
                    <span>{t('name')}</span> 
                    {locale !== 'ar' ? <br /> : " "}
                    <span>{t('surname')}</span>
                </h1>
                <p>{t('about')}</p>
            </div>
            <div className='intro_image'>
                <div  data-aos="fade-left" data-aos-delay="500" data-aos-duration="1200"><Image className='maamoun' src="/aziz-nobg.png" alt="Maamoun" height={200} width={250} /></div>
            </div>
        </section>
    )
}
