/* eslint-disable react/prop-types */
const Heading = ({main,sub}) => {
    return (
        <h1 className="text-center text-5xl font-bold">{main} <span className="text-rose">{sub}</span></h1>
    );
};

export default Heading;