import { UserList } from "../components/profile/user-list";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { createUser, deleteUser, deleteUsersByUsername, findAllUsers } from "../services/users-service";

describe('user list renders async', () => {
    const alice = {
        username: "alice",
        password: "alice",
        email: "alice@gmail.com"
    };

    beforeAll(() => {
        return deleteUsersByUsername(alice.username);
    })

    afterAll(() => {
        return deleteUsersByUsername(alice.username);
    })

    test("user list renders async", async () => {
        const newUser = await createUser(alice);
        const users = await findAllUsers();
        render(
            <HashRouter>
                <UserList users={users} />
            </HashRouter>);
        const linkElement = screen.getByText(/alice/i);
        expect(linkElement).toBeInTheDocument();
    })
})