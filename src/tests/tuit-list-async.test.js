import Tuits from "../components/tuits/";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { createTuit, findAllTuits, deleteTuit, findTuitByUser } from "../services/tuits-service";

describe("tuit list renders async", () => {
    const nasa = {
        tuit: 'nasa goes to space',
        postedBy: '636028ae3ac1346c97ddd1e0',
        id: ''
    }

    beforeAll(async () => {
        const foundTuits = await findTuitByUser('636028ae3ac1346c97ddd1e0')

        for (const tuit of foundTuits) {
            await deleteTuit(tuit._id)
        }

        return
    })

    afterAll(() => {
        return deleteTuit(nasa.id)
    })

    test('tuit list renders async', async () => {
        const newTuit = await createTuit(nasa);
        const allTuits = await findAllTuits();

        render(
            <HashRouter>
                <Tuits tuits={allTuits} />
            </HashRouter>
        );

        const linkElement = screen.getByText(/nasa goes to space/i);
        expect(linkElement).toBeInTheDocument();

        nasa.id = newTuit._id
    })
});
