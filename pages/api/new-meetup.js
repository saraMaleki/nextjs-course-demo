import { MongoClient } from 'mongodb';
// POST  /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data =req.body;

    // const { title, image, address, description } = data;
    const client= await MongoClient.connect('mongodb+srv://sara:Sm631003@cluster0.bbvj2bf.mongodb.net/meetups?retryWrites=true&w=majority');
    //const meetupCollection = client.db("meetups").collection("meetups");
    const db=client.db();
    const meetupCollection=db.collection('meetups');
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({message:'meetup inserted'});
  }
}
export default handler;
