import gql from "graphql-tag";

export const GET_TASKS_QUERY = gql`
  query getTasks {
    tasks {
      id
      title
      description
      status
      due_date
    }
  }
`;

export const GET_TASK_QUERY = gql`
  query getTaskById($id: ID!) {
    task(id: $id) {
      title
      description
      due_date
      status
    }
  }
`;
