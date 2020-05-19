import styled from 'styled-components';

export const Container = styled.div`
    background: #fff;
    padding: 0 30px;
`;

export const Content = styled.div`
    height: 65px;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    nav {
        display: flex;
        align-items: center;

        img {
            margin-right: 25px;
            padding-right: 25px;
            border-right: 2px solid #eee;
        }

        a {
            font-weight: bold;
            color: #7159c1;
        }

        aside: {
            display: flex;
            align-items: center;
        }
    }
`;

export const Profile = styled.div`
    display: flex;
    margin-left: 25px;
    padding-left: 25px;
    border-left: 2px solid #eee;

    div {
        text-align: right;
        margin-right: 10px;

        strong {
            display: flex;
            color: #333;
        }

        a {
            display: block;
            margin-top: 2px;
            font-size: 12px;
            color: #999;
        }
    }
    img {
        height: 32px;
        border-radius: 50%;
    }
`;
