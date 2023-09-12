import React from 'react';
import {FaStar, FaStarHalfAlt} from "react-icons/fa";
import {AiOutlineStar} from "react-icons/ai";
import styled from 'styled-components';


//need 3 stars
//1. complete star
//2. half
//3. empty 
const Star = ({stars, reviews}) => {
    const ratingStar = Array.from({length:5}, (elem, index) =>{
        let numbers = index +0.5;
        // i=0, i=1, i=2, i=3, i=4
        return (
            <span key ={index} >
                {stars >= index+1 ? 
                (<FaStar className="icon"/>) 
                : stars>= numbers ? 
                ( <FaStarHalfAlt className="icon"/>)
                : <AiOutlineStar className="icon" />
            }
            </span>
        )
    })
  return (
    <Wrapper>
        <div className="icon-style">
            {ratingStar}
            <p>({reviews} Customer Reviews)</p>
        </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .icon-style {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    justify-content: flex-start;

    .icon {
      font-size: 2rem;
      color: orange;
    }

    .empty-icon {
      font-size: 2.6rem;
    }
    p {
      margin: 0;
      padding-left: 1.2rem;
    }
  }
`;

export default Star;