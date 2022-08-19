import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId} from 'mongodb';
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail
      image = {props.meetupData.image }
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </Fragment>
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://sara:Sm631003@cluster0.bbvj2bf.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({},{_id:1}).toArray();
  client.close();

  return {
    fallback: false,
    paths : meetups.map((meetup)=>({
      params : {
        meetupId : meetup._id.toString(),
      },
    })),

    // paths: [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  //loading data from database
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://sara:Sm631003@cluster0.bbvj2bf.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const selectedMeetup = await meetupCollection.findOne({_id : ObjectId(meetupId)});
  client.close();

  return {
    props: {
      meetupData: {
        id : selectedMeetup._id.toString(),
        title:selectedMeetup.title,
        address:selectedMeetup.address,
        description:selectedMeetup.description,
        image:selectedMeetup.image
      }
      // meetupData: {
        // image:
        //   "https://image.shutterstock.com/image-vector/colleagues-business-meeting-company-internet-600w-1420494989.jpg",
        // id: meetupId,
        // title: "The first Meetup",
        // address: "Qc Montreal",
        // description: "this is first",
      // },
    },
  };
}
export default MeetupDetails;
