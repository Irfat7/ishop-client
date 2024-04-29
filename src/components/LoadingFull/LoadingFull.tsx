import { Grid } from 'react-loader-spinner'

const LoadingFull = () => {
    return (
        <div className='w-screen h-screen fixed top-0 left-0 center'>
            <Grid
                visible={true}
                height="80"
                width="80"
                color="#7D0A0A"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass="grid-wrapper"
            />
        </div>
    );
};

export default LoadingFull;