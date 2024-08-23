/* eslint-disable react/prop-types */
export default function Card({id,clicked,handleClick,imgs}){
    return(
        <div id={id} className={"card " + (clicked && "clicked") } onClick={handleClick}>
            <img src={imgs[id]} alt="ss" />
        </div>
    );
}