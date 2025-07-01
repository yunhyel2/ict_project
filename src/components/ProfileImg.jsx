export default function ProfileImg({ src, small, zoom = 1, ...props }) {
    return <>
        <div className={`profile-card__image ${small ? 'small' : ''}`} style={{ zoom }}>
            {src && <img src={src} alt="" {...props} />}
        </div>
    </>
}
