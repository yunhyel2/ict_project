export default function ProfileImg({ src, small, ...props }) {
    return <>
        <div className={`profile-card__image ${small ? 'small' : ''}`}>
            {src && <img src={src} alt="" {...props} />}
        </div>
    </>
}
