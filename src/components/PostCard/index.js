import { format } from 'timeago.js';
import { BiTime } from 'react-icons/bi';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useFavorites } from '../../hooks/useFavorites';
import './styles.css';

export function PostCard({ post }) {

    const { favorites, setFavorites } = useFavorites();

    const favs = [...favorites];
    const isFavorite = favs?.some(fav => fav.objectID === post.objectID && fav.query === post.query);

    const handleClick = () => {
        let postFav = favs?.findIndex(fav => fav.objectID === post.objectID && fav.query === post.query);
        (postFav > -1)
            ? favs.splice(postFav, 1)
            : favs.push(post);
        setFavorites(favs);
        localStorage.setItem('faves', JSON.stringify(favs));
    }

    return (
        <article className="card">
            <a href={post.story_url} target='_blank' rel='noreferrer' className='card__content'>
                <div className='card__header'>
                    <BiTime className='card__header-icon' />
                    <p className='card__header-text'>{`${format(post.created_at)} by ${post.author}`}</p>
                </div>

                <p className='card__body'>{post.story_title}</p>
            </a>
            <div className='card__fav'>
                <button className='card__fav-btn'>
                    {isFavorite
                        ? <FaHeart className='card__fav-icon' onClick={handleClick} />
                        : <FaRegHeart className='card__fav-icon' onClick={handleClick} />}
                </button>
            </div>
        </article>
    )
}