import './styles.css';

export function TitleOfPosts({ titleName }) {
  return (
    <div className='titleOfPosts'>
      <h2 className='titleOfPosts__name'>{`${titleName} news`}</h2>
    </div>
  )
}
