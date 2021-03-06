import { useAxios } from "../useAxios/useAxios";
import { useEffect, useState } from "react";

function useTwitter() {
  const { response, error, loading, requestData } = useAxios();
  const [tweetData, setTweetData] = useState({ done: false });
  const TWITTER_SECRET = process.env.REACT_APP_TWITTER_SECRET;

  async function lookupTweet(tweetId) {
    const axiosParams = {
      method: "get",
      url: `https://api.twitter.com/2/tweets/${tweetId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TWITTER_SECRET}`,
      },
      params: {
        "tweet.fields": "attachments,conversation_id",
        expansions: "attachments.media_keys",
        "media.fields": "type,url,preview_image_url",
      },
    };
    await requestData(axiosParams);
  }

  useEffect(() => {
    if (!loading) {
      if (error !== "") {
        console.error({ error, response });
      } else {
        let media = [];
        if (response.includes) {
          media = response.includes.media.map((media) =>
            media.type === "photo"
              ? { type: media.type, url: media.url }
              : { type: media.type, url: media.preview_image_url }
          );
        }
        setTweetData({
          text: response.data.text,
          media,
          done: true,
        });
      }
    }
  }, [loading, response, error]);

  return { loading, tweetData, lookupTweet };
}

export { useTwitter };
