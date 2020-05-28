import styled from 'styled-components';

export const Container = styled.div`
    max-width: 900px;
    margin: 50px auto;

    display: flex;
    flex-direction: column;

    header {
        display: flex;
        align-self: center;
        align-items: center;

        button {
            border: 0;
            border-radius: 50%;
        }

        strong {
            color: #fff;
            font-size: 24px;
            margin: 0 15px;
        }
    }

    ul {
        display: grid;
        grid-template-columns: repeat(4, 2fr);
        grid-gap: 15px;
        margin-top: 30px;
    }
`;

export const Time = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    opacity: ${(props) => (props.past ? 0.5 : 1)};

    strong {
        display: block;
        color: ${(props) => (props.available ? '#33FF3C' : '#FF3352')};
        font-size: 24px;
        font-weight: normal;
    }

    span {
        display: block;
        margin-top: 3px;
        color: #666;
    }
`;
