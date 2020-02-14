import React from 'react';
import styled from '@emotion/styled';

const MenuButton = styled('svg')`
                position: absolute;
                top: 10px;
                right: 20px;
                cursor: pointer;
                color: rgba(255, 255, 255, 0.8);
                display: block;
            @media screen and (min-width: 768px) {
                    display: none;
            }
`

const MenuImage = (props) => ( 
    <MenuButton
        onClick= {props.toggleMenu}
        viewBox="0 0 200 200" width= {props.dimension}
        height= {props.dimension}
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="Layer1">
            <path d="M25,32.481l54.215,0l20.921,82.165l20.831,-82.165l54.033,0l0,135.038l-33.657,0l0,-102.983l-26.106,102.983l-30.474,0l-26.015,-102.983l0,102.983l-33.748,0l0,-135.038Z" />
            <rect width="200" height="200" fill="none" stroke= {props.color} strokeWidth="20" />
        </g>
    </MenuButton>
);

export default MenuImage;