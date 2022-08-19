import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const meetupList = [
//   {
//     id: "m1",
//     image:
//       "https://image.shutterstock.com/image-vector/colleagues-business-meeting-company-internet-600w-1420494989.jpg",
//     title: "The first Meetup",
//     address: "Qc Montreal",
//   },
//   {
//     id: "m2",
//     image:
//       "https://image.shutterstock.com/image-vector/colleagues-business-meeting-company-internet-600w-1420494989.jpg",
//     title: "The second Meetup",
//     address: "Qc Montreal",
//   },
// ];

function HomePage(props) {
  
  return <Fragment>
    <Head>
      <title>Meetup List</title>
      <meta name="description" content="This is meetup List"></meta>
    </Head>
    <MeetupList meetups={props.meetups}></MeetupList>
  </Fragment> ;
}

// export async function getServerSideProps(context) {
//   const req= context.req;
//   const res = context.res;

//   return {
//     props: { meetups: meetupList },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://sara:Sm631003@cluster0.bbvj2bf.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  client.close();

  return {
    //props: { meetups: meetupList },
    props: {
      meetups: meetups.map((m) => ({
        image: m.image,
        title: m.title,
        address: m.address,
        id: m._id.toString(),
      })),
    },

    revalidate: 10,
  };
}
export default HomePage;
