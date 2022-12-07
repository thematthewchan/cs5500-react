/**
 * @file Dislike test
 */

import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { createTuit, deleteTuit } from "../../services/tuits-service";
import { findAllTuitsDislikedByUser, userTogglesTuitDislike, userUnDislikesTuit } from "../../services/dislike-service";
import { createUser, deleteUsersByUsername } from "../../services/users-service";
import TuitStats from "../../components/tuits/tuit-stats";

/**
 * Test dislike button
 */
describe("can create a dislike with REST API", () => {
    let matt;
    let createdTuit;
    let tuit;
    let tuitId;
    let userId;

    afterAll(() => {
        deleteTuit(createdTuit.postedBy);
        userUnDislikesTuit(userId, tuitId);

        return deleteUsersByUsername(matt.username);
    });

    test("dislike", async () => {

        matt = {
            username: "matt",
            password: "mc",
            email: "mc@gmail.com",
        };

        const user = await createUser(matt);
        userId = user._id;

        createdTuit = {
            tuit: "tuit",
            postedBy: userId,
            stats: {
                replies: 0,
                retuits: 0,
                likes: 0,
                dislikes: 100,
            },
        };

        tuit = await createTuit(createdTuit);
        tuitId = tuit._id;
        await userTogglesTuitDislike(userId, tuitId);
        const list = await findAllTuitsDislikedByUser(userId);

        const last = list.pop();

        render(
            <HashRouter>
                <TuitStats tuit={last} />
            </HashRouter>
        );

        const linkElement = screen.getByText(/1/i);
        expect(linkElement).toBeInTheDocument();
    });
});