export default async function handler(req, res) {
    console.log(req.body);
    const data = req.body;
    const id = await createItem(data)
    res.status(200).json({ id })
  }

  function createItem(data) {
    // console.log(data.testVal);
    return {sucess: true};
  }