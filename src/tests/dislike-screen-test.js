/**
 * @file My dislikes screen test
 */

import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Tuits from "../../components/tuits";
import { createUser, deleteUsersByUsername } from "../../services/users-service";
import { createTuit, deleteTuit } from "../../services/tuits-service";
import { findAllTuitsDislikedByUser, userDislikesTuit, userUnDislikesTuit } from "../../services/dislike-service";

/**
 * Test dislike tuit rendering list
 */

describe("tuit dislike rendering", () => {
    let matt;
    let user;
    let userId;
    let tuit1;
    let tuit2;
    let createdTuit1;
    let createdTuit2;
    let tuit1Id;
    let tuit2Id;
    matt = {
        username: "matt",
        password: "mc",
        email: "mc@gmail.com",
    };
    /**
     * Setup before running test
     * @param  {function} function to be called
     */

    beforeAll(() => {
        // remove any data created
        return deleteUsersByUsername(matt.username);
    });

    /**
     * Setup after running test
     * @param  {function} function to be called
     */
    afterAll(() => {
        // remove any data created
        deleteTuit(tuit1.postedBy);
        deleteTuit(tuit2.postedBy);
        userUnDislikesTuit(userId, tuit1Id);
        userUnDislikesTuit(userId, tuit2Id);
        return deleteUsersByUsername(matt.username);
    });

    /**
     * Test dislike array renderin
     * @param  {string} description of the test
     * @param  {function} async the function called to run the test
     */

    test("dislike array", async () => {
        user = await createUser(matt);
        userId = user._id;

        tuit1 = {
            tuit: "tuiter-dislike-testing-1",
            postedBy: userId,
        };

        tuit2 = {
            tuit: "tuiter-dislike-testing-2",
            postedBy: userId,
        };

        createdTuit1 = await createTuit(tuit1);
        createdTuit2 = await createTuit(tuit2);

        tuit1Id = createdTuit1._id;
        tuit2Id = createdTuit2._id;

        await userDislikesTuit(userId, tuit1Id);
        await userDislikesTuit(userId, tuit2Id);

        const dislikedTuits = await findAllTuitsDislikedByUser(userId);

        render(
            <HashRouter>
                <Tuits tuits={dislikedTuits} />
            </HashRouter>
        );

        const linkElement1 = screen.getByText(/tuiter-dislike-testing-1/i);
        expect(linkElement1).toBeInTheDocument();

        const linkElement2 = screen.getByText(/tuiter-dislike-testing-2/i);
        expect(linkElement2).toBeInTheDocument();
    });
});