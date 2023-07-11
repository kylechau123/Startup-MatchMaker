import { gql } from '@apollo/client';

export const GET_INVESTOR = gql`
query {
investor {
    _id
    investAmount
    interests
    photo
    likes {
    _id
    }
    user {
    _id
    email
    username
    }
    investments {
        startup {
            _id
            name
            logo
        }
        amount
    }
}
}
`;

export const GET_STARTUP_BY_ID = gql`
query startup($id: ID!){
startup2(id: $id) {
    _id
    name
    logo
    industry
    description
    website
    amountNeeded
    likes {
    _id
    }
    user {
    _id
    email
    username
    }
    backers {
        investor {
            _id
        }
        amount
    }
}
}`;

export const GET_INVESTOR_BY_ID = gql`
    query investor($id: ID!) {
        investor2(id: $id) {
                _id
                investAmount
                interests
                photo
                likes {
                _id
                }
                user {
                _id
                email
                username
            }
        }
    }
    `;

export const GET_STARTUP = gql`
    query {
        startup {
            _id
            name
            logo
            industry
            description
            website
            amountNeeded
            likes {
                _id
            }
            user {
                _id
                email
                username
            }
        }
    }`;

export const GET_USER_BY_ID = gql`
    query user($id: ID!){
    user(id: $id) {
        _id
        email
        username
        }
    }
    `;

export const GET_USER = gql`
    query {
        user2 {
            _id
            email
            username
            role
        }
    }`;

export const UPDATE_INVESTOR = gql`
    mutation updateInvestor($investAmount: String!, $interests: [String]!, $photo: String) {
        updateInvestor(investAmount: $investAmount, interests: $interests, photo: $photo) {
            _id
            investAmount
            interests
            photo
        }
    }
    `;

export const UPDATE_STARTUP = gql`
    mutation updateStartup($name: String!, $logo: String!, $industry: [String]!, $description: String!, $website: String!, $amountNeeded: String!) {
        updateStartup(name: $name, logo: $logo, industry: $industry, description: $description, website: $website, amountNeeded: $amountNeeded) {
            _id
            name
            logo
            industry
            description
            website
            amountNeeded
        }
    }
    `;

