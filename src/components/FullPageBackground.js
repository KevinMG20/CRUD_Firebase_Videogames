const FullPageBackground = ({ imageUrl, opacity }) => {
    const backgroundStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'left',
        zIndex: -2,
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: opacity,
        zIndex: -1,
    };

    return (
        <>
            <div style={backgroundStyle}></div>
            <div style={overlayStyle}></div>
        </>
    );
};

export default FullPageBackground;
