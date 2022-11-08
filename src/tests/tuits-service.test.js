import {
  createTuit, deleteTuit, findTuitById, findTuitByUser, findAllTuits
} from "../services/tuits-service";

describe('can create tuit with REST API', () => {
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

  test('can insert new tuits with REST API', async () => {
    const newTuit = await createTuit(nasa);

    expect(newTuit.tuit).toEqual(nasa.tuit);
    expect(newTuit.postedBy).toEqual(nasa.postedBy);
    nasa.id = newTuit._id
  })
});

describe('can delete tuit wtih REST API', () => {
  const tesla = {
    tuit: 'tesla cars drives',
    postedBy: '636028ae3ac1346c97ddd1e0',
    id: ''
  }

  beforeAll(async () => {
    const newTuit = await createTuit(tesla)
    tesla.id = newTuit._id
    return
  })

  afterAll(async () => {
    const foundTuits = await findTuitByUser('636028ae3ac1346c97ddd1e0')

    for (const tuit of foundTuits) {
      await deleteTuit(tuit._id)
    }

    return
  })

  test('can delete tuits with REST API', async () => {
    const status = await deleteTuit(tesla.id);

    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  const gov = {
    tuit: 'gov creats law',
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

  afterAll(async () => {
    const foundTuits = await findTuitByUser('636028ae3ac1346c97ddd1e0')

    for (const tuit of foundTuits) {
      await deleteTuit(tuit._id)
    }

    return
  })

  test('can retrieve tuits with REST API by their author id', async () => {
    const newTuit = await createTuit(gov);
    gov.id = newTuit._id

    expect(newTuit.tuit).toEqual(gov.tuit);
    expect(newTuit.postedBy).toEqual(gov.postedBy);

    const existingTuit = await findTuitById(newTuit._id);

    expect(existingTuit.tuit).toEqual(gov.tuit);
    expect(existingTuit.postedBy).toEqual(gov.postedBy);
  })
});

describe('can retrieve all tuits with REST API', () => {
  const tuitMessages = [
    "this", "is", "fun"
  ]
  const gov = {
    tuit: 'gov creats law',
    postedBy: '636028ae3ac1346c97ddd1e0',
    id: ''
  }

  beforeAll(() =>
    tuitMessages.map(tuit =>
      createTuit({
        tuit,
        postedBy: '636028ae3ac1346c97ddd1e0'
      })
    )
  )

  afterAll(async () => {
    const foundTuits = await findTuitByUser('636028ae3ac1346c97ddd1e0')

    for (const tuit of foundTuits) {
      await deleteTuit(tuit._id)
    }

    return
  })

  test('can retrieve tuits with REST API by their author id', async () => {
    const allTuits = await findAllTuits();

    expect(allTuits.length).toBeGreaterThanOrEqual(tuitMessages.length)

    const tuitsWeInserted = allTuits.filter(
      tuit => tuitMessages.indexOf(tuitMessages) >= 0
    )

    tuitsWeInserted.forEach(currentTuit => {
      const tuitMessage = tuitMessages.find(tuitMessage => tuitMessage === currentTuit.tuit);
      expect(currentTuit.tuit).toEqual(tuitMessage);
    })
  });
});