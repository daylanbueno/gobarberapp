import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    margin: 70px auto;
    max-width: 700px;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        input {
            background: rgba(0, 0, 0, 0.1);
            border: 0;
            height: 44px;
            padding: 0 15px;
            border-radius: 4px;
            color: #fff;
            margin: 0 0 10px;

            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
        }

        span {
            color: #f64c75;
            align-self: flex-start;
            margin: 0 0 10px;
            font-weight: bold;
        }

        button {
            margin: 5px 0 0;
            height: 44px;
            background: #3b9eff;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.2s;
            &:hover {
                background: ${darken(0.3, '#3b9eff')};
            }
        }
    }

    div {
        button {
            width: 100%;
            margin: 10px 0 0;
            height: 44px;
            background: #f64c75;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.2s;
            &:hover {
                background: ${darken(0.3, '#f64c75')};
            }
        }
    }
`;
