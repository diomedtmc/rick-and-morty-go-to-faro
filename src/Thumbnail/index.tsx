import classNames from 'classnames';
import { Character } from '@/api';
import { Inter } from 'next/font/google';
import ListItem from './ListItem';
import styles from '../styles/Thumbnail.module.scss';

const inter = Inter({ subsets: ['latin'] });

export enum ThumbnailSize {
    Full = 'Full',
    Small = 'small'
}

interface Props {
    character: Character;
    displayExtendedInfo: boolean;
    size: ThumbnailSize;
}

const Thumbnail = (props: Props) => {
    const {
        character: {
            name,
            status,
            image,
            gender,
            species,
            location
        },
        displayExtendedInfo,
        size
    } = props;
    return (
        <article className={classNames(styles.thumbnail, inter.className, styles[size])}>
            <img src={image} />
            {displayExtendedInfo && (
                <section className={styles.location}>
                    <div className={styles.background}></div>
                    <ul className={styles.foreground}>
                        <ListItem label='Name' value={location.name}/>
                        <ListItem label='Status' value={location.type}/>
                        <ListItem label='Dimension' value={location.dimension}/>
                    </ul>
                </section>
            )}
            <section>
                <ul>
                    <ListItem label='Name' value={name}/>
                    <ListItem label='Status' value={status}/>
                {displayExtendedInfo && (
                    <>
                        <ListItem label='Species' value={species}/>
                        <ListItem label='Gender' value={gender}/>
                    </> 
                )}
                </ul>
            </section>
        </article>
    )
}

export default Thumbnail;
