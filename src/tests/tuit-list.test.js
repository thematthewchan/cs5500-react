import { Tuits } from "../components/tuits/index";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllTuits } from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];

const tuitsList = MOCKED_USERS.map((username, index) => {
  return {
    _id: Math.random(),
    postedBy: { username: username },
    tuit: MOCKED_TUITS[index],
    image: "perseverance.jpg",
    youtube: null,
    avatarLogo: "nasa-logo.jpg",
    published: "Dec 25, 2021",
    imageOverlay: null,
    stats: {
      replies: 123,
      retuits: 234,
      likes: 345
    },
  };
});

test('tuit list renders static tuit array', () => {
  render(
    <HashRouter>
      <Tuits tuits={tuitsList} />
    </HashRouter>
  );
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  // TODO: implement this
})

test('tuit list renders mocked', async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: { tuits: tuitsList } })
  )

  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
    <HashRouter>
      <Tuits tuits={tuits} />
    </HashRouter>
  )

  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});
