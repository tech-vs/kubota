const RollingLoading = () => {
    return (<>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: '0', background: 'none', display: 'block', shapeRendering: 'auto' }}
            width="32px" height="32px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#fff" strokeWidth="6" r="16" strokeDasharray="75.39822368615503 27.132741228718345">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>
        </svg>
    </>)
}


export default RollingLoading