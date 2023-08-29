import gql from "graphql-tag";

export const DELETE_TASK_MUTATION = gql`
  mutation ($id: ID!) {
    deleteTask(id: $id) {
      id
      title
      description
      status
      user {
        id
        name
      }
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String
    $description: String
    $due_date: DateTime
    $status: TaskStatus
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      due_date: $due_date
      status: $status
    ) {
      id
      title
      description
      due_date
      status
      created_at
      updated_at
    }
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask(
    $title: String!
    $description: String!
    $due_date: DateTime!
    $status: TaskStatus!
  ) {
    createTask(title: $title, description: $description, due_date: $due_date, status: $status) {
      id
      title
      description
      due_date
      status
      created_at
      updated_at
    }
  }
`;
